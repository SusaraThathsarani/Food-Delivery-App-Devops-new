/*const mongoose = require('mongoose');


const orderItemSchema = new mongoose.Schema({
productId: String,
name: String,
price: Number,
qty: Number
});


const orderSchema = new mongoose.Schema({
items: [orderItemSchema],
total: Number,
customerName: String,
address: String,
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', orderSchema);*/


const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  customerName: String,
  address: String,
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Delivered'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
