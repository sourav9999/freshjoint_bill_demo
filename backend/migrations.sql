-- orders table
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_type TEXT NOT NULL, -- 'direct' or 'bar'
  bar_name TEXT,
  customer_name TEXT,
  items TEXT,
  total REAL NOT NULL,
  payment_mode TEXT,
  commission_percent REAL DEFAULT 0,
  commission_amount REAL DEFAULT 0,
  status TEXT DEFAULT 'paid', -- paid / unpaid
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item TEXT,
  amount REAL NOT NULL,
  date TEXT DEFAULT (date('now','localtime')),
  remarks TEXT
);