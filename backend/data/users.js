const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@breadhouse.com',
        password: 'password123',
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
    },
];

module.exports = users;
