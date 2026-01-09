const mongoose = require('mongoose');

// This is the blueprint for our Products (Cakes, Pizzas, etc.)
const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Reference to the admin who added the product
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
