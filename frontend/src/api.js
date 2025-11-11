const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

function usePinHeader() {
  const pin = localStorage.getItem('admin_pin') || '';
  return { 'x-admin-pin': pin };
}

export async function loginPin(pin) {
  const res = await fetch(`${API_BASE}/api/ping`, { headers: { 'x-admin-pin': pin } });
  if (res.ok) {
    localStorage.setItem('admin_pin', pin);
    return true;
  }
  return false;
}

export async function fetchOrders(query = '') {
  const headers = usePinHeader();
  const res = await fetch(`${API_BASE}/api/orders${query}`, { headers });
  return res.json();
}

export async function createOrder(payload) {
  const headers = { ...usePinHeader(), 'Content-Type': 'application/json' };
  const res = await fetch(`${API_BASE}/api/orders`, { method: 'POST', headers, body: JSON.stringify(payload) });
  return res.json();
}

export async function fetchDashboard() {
  const headers = usePinHeader();
  const res = await fetch(`${API_BASE}/api/dashboard`, { headers });
  return res.json();
}

export async function createExpense(payload) {
  const headers = { ...usePinHeader(), 'Content-Type': 'application/json' };
  const res = await fetch(`${API_BASE}/api/expenses`, { method: 'POST', headers, body: JSON.stringify(payload) });
  return res.json();
}

export async function fetchExpenses() {
  const headers = usePinHeader();
  const res = await fetch(`${API_BASE}/api/expenses`, { headers });
  return res.json();
}

export async function exportOrdersCsv() {
  const headers = usePinHeader();
  const res = await fetch(`${API_BASE}/api/orders/export`, { headers });
  const text = await res.text();
  return text;
}