import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// We create a Context to share data across all components
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [userInfo, setUserInfo] = useState(
        localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch products from backend
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/products');
            setProducts(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (err) {
            console.error('Fetch error:', err.message);
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    // Run this when the app starts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Save user info to localStorage when they log in
    useEffect(() => {
        if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
            localStorage.removeItem('userInfo');
        }
    }, [userInfo]);

    // Function to add item to cart
    const addToCart = async (product, qty = 1) => {
        if (!product || !product._id) return;

        // Optimistic UI Update
        const existItem = cartItems.find((x) => x._id === product._id);
        if (existItem) {
            setCartItems(
                cartItems.map((x) =>
                    x._id === existItem._id ? { ...existItem, qty: existItem.qty + qty } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, qty }]);
        }

        // Backend Sync
        if (userInfo && userInfo.token) {
            try {
                await axios.post('/api/cart/add',
                    { itemId: product._id },
                    { headers: { Authorization: `Bearer ${userInfo.token}` } }
                );
            } catch (error) {
                console.error("Failed to sync cart add:", error);
            }
        }
    };

    // Function to remove item from cart
    const removeFromCart = async (id) => {
        setCartItems(cartItems.filter((x) => x._id !== id));

        // Backend Sync
        if (userInfo && userInfo.token) {
            try {
                await axios.post('/api/cart/remove',
                    { itemId: id },
                    { headers: { Authorization: `Bearer ${userInfo.token}` } }
                );
            } catch (error) {
                console.error("Failed to sync cart remove:", error);
            }
        }
    };

    // Function to update quantity in cart
    const updateQty = async (id, newQty) => {
        setCartItems(
            cartItems.map((x) => (x._id === id ? { ...x, qty: Number(newQty) } : x))
        );

        // Backend Sync
        if (userInfo && userInfo.token) {
            try {
                await axios.post('/api/cart/update',
                    { itemId: id, qty: Number(newQty) },
                    { headers: { Authorization: `Bearer ${userInfo.token}` } }
                );
            } catch (error) {
                console.error("Failed to sync cart update:", error);
            }
        }
    };

    // Load Cart from Database when User Logs In
    const loadCartData = async (token) => {
        try {
            const { data } = await axios.get('/api/cart/get', {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Merge Backend Cart (IDs) with Frontend Products (Details) 
            // Only if we have products loaded
            if (data.success && products.length > 0) {
                const backendCart = data.cartData; // { itemId: qty }
                const mergedCart = [];

                for (const [itemId, qty] of Object.entries(backendCart)) {
                    if (qty > 0) {
                        const productDetails = products.find(p => p._id === itemId);
                        if (productDetails) {
                            mergedCart.push({ ...productDetails, qty });
                        }
                    }
                }
                // If backend has items, use them. Otherwise keep local (optional strategy)
                if (mergedCart.length > 0) {
                    setCartItems(mergedCart);
                }
            }
        } catch (error) {
            console.error("Failed to load backend cart:", error);
        }
    };

    // Load cart when user or products change
    useEffect(() => {
        if (userInfo && userInfo.token && products.length > 0) {
            loadCartData(userInfo.token);
        }
    }, [userInfo, products]); // Run when user logs in or products finish loading

    // Calculate total price of cart items
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    // Login function
    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/api/users/login', { email, password });
            setUserInfo(data);
            return data;
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Login failed');
        }
    };

    // Logout function
    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
        setCartItems([]); // Clear cart on logout
    };

    // Clear cart after order is placed
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    // These are the things we want other components to be able to use
    const value = {
        products,
        cartItems,
        userInfo,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQty,
        subtotal,
        login,
        logout,
        setUserInfo,
        clearCart
    };

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
