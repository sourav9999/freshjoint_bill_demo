import React from 'react';
export default function ExpensesList({ expenses = [] }){
  return (
    <div className="card">
      <h3>Expenses</h3>
      <table>
        <thead><tr><th>ID</th><th>Item</th><th>Amount</th><th>Date</th><th>Remarks</th></tr></thead>
        <tbody>
          {expenses.map(e => (
            <tr key={e.id}><td>{e.id}</td><td>{e.item}</td><td>{e.amount}</td><td>{e.date}</td><td>{e.remarks}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}