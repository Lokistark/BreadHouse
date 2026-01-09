const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// This is the blueprint for our User data
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // No two users can have the same email
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false, // Normal users aren't admins by default
        },
        cartData: {
            type: Object,
            default: {} // Key-value pair: { product_id: quantity }
        }
    },
    {
        timestamps: true, // This automatically adds 'createdAt' and 'updatedAt' fields
    }
);

// This function runs before saving a user to hash their password
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// A helper method to compare entered password with hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
