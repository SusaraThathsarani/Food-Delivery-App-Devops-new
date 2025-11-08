import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <h1>🍉 Food Delivery</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart ({cartCount})</Link></li>
        <li><Link to="/myorders">My Orders</Link></li>
      <li><Link to="/admin/orders">Admin Orders</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        
      </ul>
    </nav>
  );
}
