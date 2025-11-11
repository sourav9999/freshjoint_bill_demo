const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const createCsvWriter = require('csv-writer').createObjectCsvStringifier;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const ADMIN_PIN = process.env.ADMIN_PIN || '4321';

// simple auth middleware — checks x-admin-pin header
function requireAuth(req, res, next) {
  const pin = req.headers['x-admin-pin'];
  if (!pin || pin !== ADMIN_PIN) return res.status(401).json({ error: 'unauthorized' });
  next();
}

// create order
app.post('/api/orders', requireAuth, (req, res) => {
  const {
    order_type = 'direct',
    bar_name = null,
    customer_name = null,
    items = '',
    total = 0,
    payment_mode = 'cash',
    commission_percent = 0,
    status = 'paid'
  } = req.body;

  const commission_amount = parseFloat(((commission_percent/100) * total).toFixed(2));

  const stmt = db.prepare(`INSERT INTO orders (order_type, bar_name, customer_name, items, total, payment_mode, commission_percent, commission_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const info = stmt.run(order_type, bar_name, customer_name, items, total, payment_mode, commission_percent, commission_amount, status);

  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(info.lastInsertRowid);
  res.json(order);
});

// list orders with optional filters
app.get('/api/orders', requireAuth, (req, res) => {
  const { from, to, order_type, status } = req.query;
  let sql = 'SELECT * FROM orders WHERE 1=1';
  const params = [];
  if (from) { sql += ' AND date(created_at) >= date(?)'; params.push(from); }
  if (to) { sql += ' AND date(created_at) <= date(?)'; params.push(to); }
  if (order_type) { sql += ' AND order_type = ?'; params.push(order_type); }
  if (status) { sql += ' AND status = ?'; params.push(status); }
  sql += ' ORDER BY created_at DESC';
  const rows = db.prepare(sql).all(...params);
  res.json(rows);
});

// export orders CSV
app.get('/api/orders/export', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  const csv = createCsvWriter({
    header: Object.keys(rows[0] || {}).map(k => ({ id: k, title: k }))
  });
  res.setHeader('Content-disposition', 'attachment; filename=orders.csv');
  res.setHeader('Content-Type', 'text/csv');
  res.send(csv.stringifyRecords(rows));
});

// create expense
app.post('/api/expenses', requireAuth, (req, res) => {
  const { item, amount, date = null, remarks = '' } = req.body;
  const stmt = db.prepare('INSERT INTO expenses (item, amount, date, remarks) VALUES (?, ?, ?, ?)');
  const info = stmt.run(item, amount, date, remarks);
  const expense = db.prepare('SELECT * FROM expenses WHERE id = ?').get(info.lastInsertRowid);
  res.json(expense);
});

// list expenses
app.get('/api/expenses', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM expenses ORDER BY date DESC').all();
  res.json(rows);
});

// dashboard summary
app.get('/api/dashboard', requireAuth, (req, res) => {
  const today = db.prepare("SELECT date('now','localtime') as today").get().today;
  const totalSales = db.prepare("SELECT IFNULL(SUM(total),0) as total FROM orders WHERE date(created_at)=date('now','localtime')").get().total;
  const paid = db.prepare("SELECT IFNULL(SUM(total),0) as paid FROM orders WHERE status='paid' AND date(created_at)=date('now','localtime')").get().paid;
  const unpaid = db.prepare("SELECT IFNULL(SUM(total),0) as unpaid FROM orders WHERE status!='paid' AND date(created_at)=date('now','localtime')").get().unpaid;
  const totalCommission = db.prepare("SELECT IFNULL(SUM(commission_amount),0) as commission FROM orders WHERE date(created_at)=date('now','localtime')").get().commission;
  const totalExpense = db.prepare("SELECT IFNULL(SUM(amount),0) as expense FROM expenses WHERE date(date)=date('now','localtime')").get().expense;
  const netProfit = (totalSales - totalExpense - totalCommission);
  res.json({ date: today, totalSales, paid, unpaid, totalCommission, totalExpense, netProfit });
});

// basic health check
app.get('/api/ping', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Backend running on port', PORT));