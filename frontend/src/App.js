import React, { useEffect, useState } from 'react';
import { loginPin, fetchOrders, createOrder, fetchDashboard, createExpense, fetchExpenses, exportOrdersCsv } from './api';
import Login from './components/Login';
import OrderForm from './components/OrderForm';
import OrdersList from './components/OrdersList';
import ExpenseForm from './components/ExpenseForm';
import ExpensesList from './components/ExpensesList';
import Dashboard from './components/Dashboard';
import './styles.css';

function App(){
  const [authed, setAuthed] = useState(Boolean(localStorage.getItem('admin_pin')));
  const [orders, setOrders] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => { if (authed) loadAll(); }, [authed]);

  async function loadAll() {
    setOrders(await fetchOrders());
    setExpenses(await fetchExpenses());
    setDashboard(await fetchDashboard());
  }

  async function handleLogin(pin) {
    const ok = await loginPin(pin);
    if (ok) setAuthed(true);
    else alert('Invalid PIN');
  }

  async function addOrder(payload) {
    await createOrder(payload);
    await loadAll();
  }

  async function addExpense(payload) {
    await createExpense(payload);
    await loadAll();
  }

  async function handleExport(){
    const csv = await exportOrdersCsv();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'orders.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  if (!authed) return <Login onLogin={handleLogin}/>;

  return (
    <div className="app">
      <header>
        <h1>FreshJoint — barBill</h1>
        <div className="actions">
          <button onClick={handleExport}>Export Orders</button>
        </div>
      </header>

      <main>
        <Dashboard data={dashboard} />
        <section className="forms">
          <OrderForm onSave={addOrder} />
          <ExpenseForm onSave={addExpense} />
        </section>
        <section className="lists">
          <OrdersList orders={orders} />
          <ExpensesList expenses={expenses} />
        </section>
      </main>

      <footer>Built for FreshJoint — lightweight billing & expense tracking</footer>
    </div>
  );
}

export default App;