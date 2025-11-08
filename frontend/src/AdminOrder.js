import React, { useEffect, useState } from 'react';
import './AdminOrder.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    fetch('http://localhost:4000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:4000/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    loadOrders();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin - Manage Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="border rounded p-4 mb-3">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <p><strong>Status:</strong> {order.status}</p>

          <select
            value={order.status}
            onChange={(e) => updateStatus(order._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
