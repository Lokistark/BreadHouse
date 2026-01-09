const Product = require('../models/productModel');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const products = await Product.find({ ...keyword });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong fetching products' });
    }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Invalid product ID' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    const { name, price, description, image, category, countInStock } = req.body;

    const product = new Product({
        name,
        price,
        user: req.user._id,
        image,
        category,
        countInStock,
        description,
    });

    try {
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const { name, price, description, image, category, countInStock } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name;
            product.price = price;
            product.description = description;
            product.image = image;
            product.category = category;
            product.countInStock = countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
};
