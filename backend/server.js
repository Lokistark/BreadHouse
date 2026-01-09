const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to handle JSON data in requests
app.use(express.json());
// Middleware to allow cross-origin requests (so frontend can talk to backend)
app.use(cors());

// Custom routes for our API
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// A simple route to check if server is running
app.get('/', (req, res) => {
    res.send('Bread House API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
    });
}

module.exports = app;
