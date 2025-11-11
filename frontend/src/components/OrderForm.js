import React, { useState } from 'react';

export default function OrderForm({ onSave }){
  const [orderType, setOrderType] = useState('direct');
  const [barName, setBarName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState('');
  const [total, setTotal] = useState('');
  const [paymentMode, setPaymentMode] = useState('cash');
  const [commissionPercent, setCommissionPercent] = useState(0);
  const [status, setStatus] = useState('paid');

  async function save(){
    const payload = {
      order_type: orderType,
      bar_name: orderType === 'bar' ? barName : null,
      customer_name: customerName,
      items,
      total: parseFloat(total) || 0,
      payment_mode: paymentMode,
      commission_percent: parseFloat(commissionPercent) || 0,
      status
    };
    await onSave(payload);
    setItems(''); setTotal(''); setCustomerName(''); setBarName(''); setCommissionPercent(0);
  }

  return (
    <div className="card">
      <h3>Add Order</h3>
      <label>Type</label>
      <select value={orderType} onChange={e => setOrderType(e.target.value)}>
        <option value="direct">Direct Customer</option>
        <option value="bar">Bar Partner</option>
      </select>
      {orderType === 'bar' && (
        <>
          <label>Bar Name</label>
          <input value={barName} onChange={e => setBarName(e.target.value)} />
          <label>Commission %</label>
          <input value={commissionPercent} onChange={e => setCommissionPercent(e.target.value)} />
        </>
      )}

      <label>Customer Name</label>
      <input value={customerName} onChange={e => setCustomerName(e.target.value)} />
      <label>Items (comma)</label>
      <input value={items} onChange={e => setItems(e.target.value)} />
      <label>Total</label>
      <input value={total} onChange={e => setTotal(e.target.value)} type="number" />
      <label>Payment Mode</label>
      <select value={paymentMode} onChange={e => setPaymentMode(e.target.value)}>
        <option>cash</option>
        <option>upi</option>
        <option>card</option>
      </select>
      <label>Status</label>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="paid">Paid</option>
        <option value="unpaid">Unpaid</option>
      </select>
      <button onClick={save}>Save Order</button>
    </div>
  );
}