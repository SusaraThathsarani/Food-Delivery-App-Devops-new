const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
const User = require('./models/User');

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Login endpoint: if user exists validate password, otherwise register user
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

    let user = await User.findOne({ username });

    if (!user) {
      // user not found -> register
      const hashed = await bcrypt.hash(password, 10);
      user = new User({ username, password: hashed });
      await user.save();
      return res.status(201).json({ message: 'User registered and logged in', username: user.username });
    }

    // user found -> verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    return res.json({ message: 'Login successful', username: user.username });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Explicit register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ message: 'Username already taken' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();
    return res.status(201).json({ message: 'User registered', username: user.username });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.get('/', (req, res) => res.send('Backend running!'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
