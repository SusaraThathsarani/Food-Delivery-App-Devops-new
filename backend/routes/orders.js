const express = require('express');
const router = express.Router();
const Order = require('../models/Order');



// Create order
router.post('/', async (req, res) => {
const { items, total, customerName, address } = req.body;
if (!items || items.length === 0) return res.status(400).json({ message: 'Cart empty' });
const order = new Order({ items, total, customerName, address });
await order.save();
res.status(201).json(order);
});


// List orders (dev/admin)
router.get('/', async (req, res) => {
const orders = await Order.find().sort({ createdAt: -1 });
res.json(orders);
});

// 🟢 Get single order (Customer)
router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

// 🟡 Update order status (Admin)
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(order);
});


module.exports = router;