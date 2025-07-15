// Load dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const productRoutes = require('./routes/productRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const discountRoutes = require('./routes/discountRoutes.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Register routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/discount', discountRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
