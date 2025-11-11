import React from 'react';

export default function Dashboard({ data }){
  if (!data) return <div className="card">Loading dashboard...</div>;
  return (
    <div className="card dashboard">
      <h3>Dashboard — {data.date}</h3>
      <div className="grid">
        <div>
          <strong>Total Sales</strong>
          <div>₹ {data.totalSales}</div>
        </div>
        <div>
          <strong>Paid</strong>
          <div>₹ {data.paid}</div>
        </div>
        <div>
          <strong>Unpaid</strong>
          <div>₹ {data.unpaid}</div>
        </div>
        <div>
          <strong>Commission</strong>
          <div>₹ {data.totalCommission}</div>
        </div>
        <div>
          <strong>Expense</strong>
          <div>₹ {data.totalExpense}</div>
        </div>
        <div>
          <strong>Net Profit</strong>
          <div>₹ {data.netProfit}</div>
        </div>
      </div>
    </div>
  );
}