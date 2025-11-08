import React, { useMemo, useState } from 'react';
import { placeOrder } from './api';
import './Cart.css';

export default function Cart({ cart, updateQty, clearCart }) {
  const total = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.qty, 0), [cart]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  async function checkout() {
    if (!cart.length) return setMessage('Cart is empty');
    const payload = {
      items: cart.map(c => ({ productId: c._id, name: c.name, qty: c.qty, price: c.price })),
      total,
      customerName: name || 'Guest',
      address
    };
    const res = await placeOrder(payload);
    if (res._id) {
      setMessage(`Order placed! ID: ${res._id}`);
      clearCart();
      setName('');
      setAddress('');
    } else setMessage('Failed to place order.');
  }

  return (
    <div className="page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul className="cart-list">
          {cart.map(item => (
            <li key={item._id}>
              {item.name} - ${item.price.toFixed(2)} ×
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={e => updateQty(item._id, Number(e.target.value))}
              />
            </li>
          ))}
        </ul>
      )}
      <p><strong>Total:</strong> ${total.toFixed(2)}</p>

      <div className="checkout">
        <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
        <button onClick={checkout}>Checkout</button>
      </div>

      {message && <p className="msg">{message}</p>}
    </div>
  );
}
