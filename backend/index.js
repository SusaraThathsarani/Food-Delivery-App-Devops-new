const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;

// Connect to local MongoDB
//mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27030/mydatabase')
//mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/contactDB')
mongoose.connect(process.env.MONGO_URL || 'mongodb://mongodb_c:27017/mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// Import routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Example login and register (you already have)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  // simple mock logic
  if (username === 'admin' && password === '1234') {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/register', async (req, res) => {
  res.json({ message: 'User registered successfully' });
});

app.get('/', (req, res) => res.send('Backend running!'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
