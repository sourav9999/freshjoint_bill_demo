import React, { useState } from 'react';
export default function ExpenseForm({ onSave }){
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [remarks, setRemarks] = useState('');
  async function save(){
    await onSave({ item, amount: parseFloat(amount), date: date || null, remarks });
    setItem(''); setAmount(''); setDate(''); setRemarks('');
  }
  return (
    <div className="card">
      <h3>Add Expense</h3>
      <input placeholder="Item" value={item} onChange={e=>setItem(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} type="number" />
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      <input placeholder="Remarks" value={remarks} onChange={e=>setRemarks(e.target.value)} />
      <button onClick={save}>Save Expense</button>
    </div>
  );
}