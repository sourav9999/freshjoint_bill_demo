import React from 'react';

export default function OrdersList({ orders = [] }){
  return (
    <div className="card">
      <h3>Orders</h3>
      <table>
        <thead>
          <tr><th>ID</th><th>Type</th><th>Bar</th><th>Customer</th><th>Total</th><th>Commission</th><th>Status</th><th>Date</th></tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.order_type}</td>
              <td>{o.bar_name}</td>
              <td>{o.customer_name}</td>
              <td>{o.total}</td>
              <td>{o.commission_amount} ({o.commission_percent}%)</td>
              <td>{o.status}</td>
              <td>{o.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}