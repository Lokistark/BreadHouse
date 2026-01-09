const User = require('../models/userModel');

// @desc    Add items to user cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
    try {
        let userData = await User.findById(req.user._id);
        let cartData = await userData.cartData || {};

        const { itemId } = req.body;

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await User.findByIdAndUpdate(req.user._id, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
}

// @desc    Remove items from user cart
// @route   POST /api/cart/remove
// @access  Private
const removeFromCart = async (req, res) => {
    try {
        let userData = await User.findById(req.user._id);
        let cartData = await userData.cartData || {};

        const { itemId } = req.body;

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await User.findByIdAndUpdate(req.user._id, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
}

// @desc    Get user cart data
// @route   GET /api/cart/get
// @access  Private
const getCart = async (req, res) => {
    try {
        let userData = await User.findById(req.user._id);
        let cartData = await userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching cart" });
    }
}

// @desc    Update cart quantity (Direct set)
// @route   POST /api/cart/update
// @access  Private
const updateCart = async (req, res) => {
    try {
        const { itemId, qty } = req.body;
        let userData = await User.findById(req.user._id);
        let cartData = await userData.cartData || {};

        if (qty <= 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = qty;
        }

        await User.findByIdAndUpdate(req.user._id, { cartData });
        res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating cart" });
    }
}

module.exports = { addToCart, removeFromCart, getCart, updateCart };
