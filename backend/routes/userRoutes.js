const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    promoteToAdmin,
    deleteUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Define our user routes
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.post('/promote', protect, promoteToAdmin);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Admin-only user management
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
