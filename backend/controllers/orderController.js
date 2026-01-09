const Order = require('../models/orderModel');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentResult
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            res.status(400).json({ message: 'No order items' });
            return;
        } else if (!req.user) {
            res.status(401).json({ message: 'User object missing from request' });
            return;
        } else {
            const order = new Order({
                orderItems: orderItems.map((x) => ({
                    ...x,
                    product: x.product, // Ensure product ID is passed
                })),
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice: Number(itemsPrice),
                taxPrice: Number(taxPrice),
                shippingPrice: Number(shippingPrice),
                totalPrice: Number(totalPrice),
                paymentResult,
                isPaid: true,
                paidAt: Date.now()
            });

            console.log('Attempting to save order for user:', req.user._id);
            const createdOrder = await order.save();
            console.log('Order created successfully:', createdOrder._id);
            res.status(201).json(createdOrder);
        }
    } catch (error) {
        console.error('Order Creation error details:', error);
        // If it's a validation error, log the specific fields that failed
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            console.error('Validation Errors:', messages);
            res.status(400).json({ message: `Validation failed: ${messages.join(', ')}` });
        } else {
            res.status(400).json({ message: `Order creation failed: ${error.message}` });
        }
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            'user',
            'name email'
        );

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving order' });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching your orders' });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', '_id name email')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all orders' });
    }
};

// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            // Check permissions: Admin or Owner
            if (req.user.isAdmin || order.user.toString() === req.user._id.toString()) {
                await Order.findByIdAndDelete(req.params.id);
                res.json({ message: 'Order removed' });
            } else {
                res.status(401).json({ message: 'Not authorized to delete this order' });
            }
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order' });
    }
};

module.exports = {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
    deleteOrder,
};
