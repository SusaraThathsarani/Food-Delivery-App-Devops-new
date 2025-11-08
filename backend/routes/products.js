const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


// Seed route (for dev) to add example fruits
router.post('/seed', async (req, res) => {
const seed = [
{ name: 'Apple', description: 'Fresh red apples', price: 1.2, image: '', stock: 50 },
{ name: 'Banana', description: 'Ripe bananas', price: 0.5, image: '', stock: 100 },
{ name: 'Orange', description: 'Juicy oranges', price: 0.8, image: '', stock: 80 }
];
await Product.deleteMany({});
const docs = await Product.insertMany(seed);
res.json(docs);
});


// List products
router.get('/', async (req, res) => {
const products = await Product.find();
res.json(products);
});


// Create product (admin / dev)
router.post('/', async (req, res) => {
const p = new Product(req.body);
await p.save();
res.status(201).json(p);
});


module.exports = router;