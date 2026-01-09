const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        // AUTO-RECOVERY: If the master admin is missing, create it!
        if (!user && email === 'admin@breadhouse.com') {
            console.log('Master Admin missing. Recreating...');
            user = await User.create({
                name: 'Admin User',
                email: 'admin@breadhouse.com',
                password: 'password123',
                isAdmin: true
            });
        }

        // Check if user exists and password matches
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal Server Error during login' });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Register User Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Get User Profile Error:', error);
        res.status(500).json({ message: 'Internal Server Error fetching user profile' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// @desc    Promote user to admin (Emergency Sync)
// @route   POST /api/users/promote
// @access  Private
const promoteToAdmin = async (req, res) => {
    try {
        const { secretKey } = req.body;

        // We use your secret password to verify it's really you
        if (secretKey === 'loki04') {
            if (!req.user || !req.user._id) {
                return res.status(401).json({ message: 'Session expired. Please log in again.' });
            }

            const user = await User.findById(req.user._id);
            if (user) {
                user.isAdmin = true;
                const updatedUser = await user.save();
                res.json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    isAdmin: updatedUser.isAdmin,
                    token: generateToken(updatedUser._id),
                    message: 'Admin privileges granted successfully!'
                });
            } else {
                res.status(404).json({ message: 'User account not found on server' });
            }
        } else {
            res.status(401).json({ message: 'Invalid secret key' });
        }
    } catch (error) {
        console.error('Promote Error:', error);
        res.status(500).json({
            message: 'Internal error: ' + error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack
        });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            if (user.isAdmin && user._id.toString() === req.user._id.toString()) {
                res.status(400).json({ message: 'Master Admin cannot delete themselves' });
                return;
            }
            await User.findByIdAndDelete(req.params.id);
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

module.exports = {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    promoteToAdmin,
    deleteUser,
};
