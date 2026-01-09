const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, getCart, updateCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.post('/add', protect, addToCart);
router.post('/remove', protect, removeFromCart);
router.post('/update', protect, updateCart);
router.get('/get', protect, getCart);

module.exports = router;
