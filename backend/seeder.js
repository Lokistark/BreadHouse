const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

// Function to import data into the database
const importData = async () => {
    try {
        // Delete everything first so we don't have duplicates
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Create users - the passwords will be hashed by the User model middleware
        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        // Attach the admin user ID to each product
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error.message}`.red.inverse);
        process.exit(1);
    }
};

// Function to clear everything from the database
const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error.message}`.red.inverse);
        process.exit(1);
    }
};

// Check if we passed '-d' to destroy data
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
