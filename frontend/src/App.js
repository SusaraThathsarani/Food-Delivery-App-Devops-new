/*import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/')
      .then(res => res.text())
      .then(text => setMessage(text));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Backend Data:</p>
        <p>{message}</p>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;*/



import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';
import MyOrder from './MyOrder';
import AdminOrder from './AdminOrder';
import Navbar from './Navbar';
import './styles.css';

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart(prev => {
      const exists = prev.find(p => p._id === item._id);
      if (exists)
        return prev.map(p =>
          p._id === item._id ? { ...p, qty: p.qty + 1 } : p
        );
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function updateQty(id, qty) {
    setCart(prev =>
      prev
        .map(p => (p._id === id ? { ...p, qty } : p))
        .filter(p => p.qty > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <Router>
      {/* Navbar with Cart Count */}
      <Navbar cartCount={cart.reduce((s, i) => s + i.qty, 0)} />

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart cart={cart} updateQty={updateQty} clearCart={clearCart} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myorders" element={<MyOrder />} />
        <Route path="/admin/orders" element={<AdminOrder />} />
      </Routes>
    </Router>
  );
}

