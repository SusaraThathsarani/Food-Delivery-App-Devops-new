import React, { useEffect, useState } from 'react';
import './MyOrder.css';

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="border rounded p-4 mb-3">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Placed:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
