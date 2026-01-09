const jwt = require('jsonwebtoken');

// A function to create a unique token for the user
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token lasts for 30 days
    });
};

module.exports = generateToken;
