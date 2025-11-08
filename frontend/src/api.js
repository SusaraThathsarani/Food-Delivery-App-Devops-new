const BASE = 'http://localhost:4000/api';

export async function getFruits() {
  const res = await fetch(`${BASE}/products`);
  return res.json();
}

export async function placeOrder(payload) {
  const res = await fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}
