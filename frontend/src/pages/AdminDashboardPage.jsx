import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { Package, Users, ShoppingBag, Trash2, Edit, Plus, X, LogOut, BarChart3, DollarSign, TrendingUp, Eye, Search, Filter, ChevronDown, Check, RefreshCw, AlertCircle } from 'lucide-react';

const AdminDashboardPage = () => {
    // Authentication State
    const { userInfo } = useContext(StoreContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');

    // Dashboard State
    const [activeTab, setActiveTab] = useState('dashboard');
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Product Form State
    const [showProductForm, setShowProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '', price: '', image: '', category: '', description: '', countInStock: ''
    });

    // Stats
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalProducts: 0,
        totalUsers: 0
    });

    // Toast Notification State
    const [notification, setNotification] = useState(null);

    const showToast = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    // Custom Confirmation Dialog State
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null
    });

    const triggerConfirm = (title, message, onConfirm) => {
        setConfirmDialog({
            isOpen: true,
            title,
            message,
            onConfirm: async () => {
                await onConfirm();
                setConfirmDialog(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    // Helper to get headers
    const getAuthConfig = React.useCallback(() => {
        const adminToken = sessionStorage.getItem('adminToken');
        const token = adminToken || userInfo?.token;
        return token ? { headers: { Authorization: `Bearer ${token}` } } : null;
    }, [userInfo]);


    // Fetch all data
    const fetchAllData = React.useCallback(async () => {
        // Double check token before fetching
        let token = sessionStorage.getItem('adminToken');

        const authConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : getAuthConfig();
        setLoading(true);

        // 1. Fetch Products (Public)
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data);
            setStats(prev => ({ ...prev, totalProducts: data.length }));
        } catch (error) {
            console.error('Products Error:', error);
        }

        // 2. Fetch Orders & Revenue (Admin)
        if (authConfig) {
            try {
                const { data } = await axios.get('/api/orders', authConfig);
                setOrders(Array.isArray(data) ? data : []);
                const totalRevenue = data.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
                setStats(prev => ({
                    ...prev,
                    totalOrders: data.length,
                    totalRevenue: totalRevenue
                }));
            } catch (error) {
                if (error.response?.status === 401) {
                    setLoginError('Data Locked: Please log out of the whole site and log in with an Admin account.');
                }
            }

            // 3. Fetch Users (Admin)
            try {
                const { data } = await axios.get('/api/users', authConfig);
                setUsers(Array.isArray(data) ? data : []);
                setStats(prev => ({ ...prev, totalUsers: data.length }));
            } catch (error) {
                console.error('Users Error:', error);
            }
        }

        setLoading(false);
    }, [getAuthConfig, userInfo]);

    // PERFORM BACKEND SYNC (The master key)
    const performAdminSync = async () => {
        try {
            // We verify permissions with the master admin account
            const { data } = await axios.post('/api/users/login', {
                email: 'admin@breadhouse.com',
                password: 'password123'
            });

            if (data && data.token) {
                sessionStorage.setItem('adminToken', data.token);
                return data.token;
            }
        } catch {
            return null;
        }
    };

    // Check if already logged in (Strict Session Only)
    useEffect(() => {
        const adminAuth = sessionStorage.getItem('adminAuth');
        if (adminAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchAllData();
        }
    }, [isAuthenticated, activeTab]);

    // Login Handler (Loki Entry)
    const handleLogin = async (e) => {
        e.preventDefault();
        if (loginForm.username === 'loki' && loginForm.password === 'loki04') {
            setLoading(true);
            setLoginError('');

            // Try to sync with backend during login
            const syncToken = await performAdminSync();

            if (!syncToken) {
                // If sync fails (e.g. password changed), we warn but allow entry to the UI
                setLoginError('Note: Admin Data Sync failed. Contact developer to reset Admin Password.');
            }

            sessionStorage.setItem('adminAuth', 'true');
            setIsAuthenticated(true);
            setLoading(false);
        } else {
            setLoginError('Invalid dashboard credentials');
        }
    };

    // Logout Handler
    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminAuth');
        sessionStorage.removeItem('adminToken');
        setLoginForm({ username: '', password: '' });
    };



    // Delete handlers (Instant UI Update)
    const deleteProduct = (id) => {
        triggerConfirm(
            'Delete Product?',
            'Are you sure you want to remove this product from inventory?',
            async () => {
                const authConfig = getAuthConfig();
                try {
                    // Update UI instantly
                    setProducts(prev => prev.filter(p => p._id !== id));
                    await axios.delete(`/api/products/${id}`, authConfig);
                    showToast('Product deleted successfully!', 'success');
                    fetchAllData();
                } catch (error) {
                    showToast('Failed to delete: ' + (error.response?.data?.message || error.message), 'error');
                    fetchAllData();
                }
            }
        );
    };

    const deleteOrder = (id) => {
        triggerConfirm(
            'Delete Order?',
            'Are you sure you want to permanently delete this order?',
            async () => {
                const authConfig = getAuthConfig();
                try {
                    // Update UI instantly
                    setOrders(prev => prev.filter(o => o._id !== id));
                    await axios.delete(`/api/orders/${id}`, authConfig);
                    showToast('Order deleted successfully!', 'success');
                    fetchAllData();
                } catch (error) {
                    showToast('Failed to delete order: ' + (error.response?.data?.message || error.message), 'error');
                    fetchAllData();
                }
            }
        );
    };

    const deleteUser = (id) => {
        triggerConfirm(
            'Delete User?',
            'Are you sure you want to remove this user? This cannot be undone.',
            async () => {
                const authConfig = getAuthConfig();
                try {
                    // Update UI instantly
                    setUsers(prev => prev.filter(u => u._id !== id));
                    await axios.delete(`/api/users/${id}`, authConfig);
                    showToast('User deleted successfully!', 'success');
                    fetchAllData();
                } catch (error) {
                    showToast('Failed to delete user: ' + (error.response?.data?.message || error.message), 'error');
                    fetchAllData();
                }
            }
        );
    };

    // Product form handlers
    const openProductForm = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setProductForm({
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                description: product.description,
                countInStock: product.countInStock
            });
        } else {
            setEditingProduct(null);
            setProductForm({
                name: '', price: '', image: '', category: '', description: '', countInStock: ''
            });
        }
        setShowProductForm(true);
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const authConfig = getAuthConfig();
        try {
            if (editingProduct) {
                await axios.put(`/api/products/${editingProduct._id}`, productForm, authConfig);
                showToast('Product updated successfully!', 'success');
            } else {
                await axios.post('/api/products', productForm, authConfig);
                showToast('Product created successfully!', 'success');
            }
            setShowProductForm(false);
            fetchAllData();
        } catch (error) {
            showToast('Failed to save product: ' + (error.response?.data?.message || error.message), 'error');
        }
    };

    // Filter products by search and category
    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = [
        'All', 'Cakes', 'Pizza', 'Burgers', 'Starters', 'Breads', 'Sandwich',
        'Subs', 'Pasta', 'Noodles', 'Salads', 'Sweets', 'Hot Drinks', 'Cool Drinks'
    ];

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-primary flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-secondary mb-2">Admin Login</h1>
                        <p className="text-gray-500">Bread House Management Portal</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-secondary mb-2">Username</label>
                            <input
                                type="text"
                                value={loginForm.username}
                                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-secondary mb-2">Password</label>
                            <input
                                type="password"
                                value={loginForm.password}
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        {loginError && (
                            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
                                {loginError}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition shadow-lg disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Login to Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Dashboard Screen
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-secondary">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchAllData}
                            className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
                        >
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                            <span className="hidden md:inline">Refresh Data</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition"
                        >
                            <LogOut size={18} />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Product Form Trigger (only on products tab) */}
                {activeTab === 'products' && (
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-extrabold text-secondary">Products Inventory</h2>
                        <button
                            onClick={() => openProductForm()}
                            className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary transition-all flex items-center gap-2 shadow-lg hover:translate-y-[-2px]"
                        >
                            <Plus size={24} /> Add New Product
                        </button>
                    </div>
                )}

                {/* Stats Cards */}
                {
                    activeTab === 'dashboard' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <ShoppingBag size={32} className="opacity-80" />
                                    <TrendingUp size={24} />
                                </div>
                                <h3 className="text-3xl font-bold mb-1">{stats.totalOrders}</h3>
                                <p className="opacity-90 text-sm">Total Orders</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <DollarSign size={32} className="opacity-80" />
                                    <BarChart3 size={24} />
                                </div>
                                <h3 className="text-3xl font-bold mb-1">₹{stats.totalRevenue.toLocaleString()}</h3>
                                <p className="opacity-90 text-sm">Total Revenue</p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <Package size={32} className="opacity-80" />
                                    <BarChart3 size={24} />
                                </div>
                                <h3 className="text-3xl font-bold mb-1">{stats.totalProducts}</h3>
                                <p className="opacity-90 text-sm">Total Products</p>
                            </div>
                            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <Users size={32} className="opacity-80" />
                                    <TrendingUp size={24} />
                                </div>
                                <h3 className="text-3xl font-bold mb-1">{stats.totalUsers}</h3>
                                <p className="opacity-90 text-sm">Total Users</p>
                            </div>
                        </div>
                    )
                }

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 md:gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold transition ${activeTab === 'dashboard' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                        onClick={() => { setActiveTab('dashboard'); fetchAllData(); }}
                    >
                        <BarChart3 size={20} />
                        <span className="hidden sm:inline">Dashboard</span>
                    </button>
                    <button
                        className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold transition ${activeTab === 'orders' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                        onClick={() => { setActiveTab('orders'); fetchAllData(); }}
                    >
                        <ShoppingBag size={20} />
                        <span className="hidden sm:inline">Orders</span>
                    </button>
                    <button
                        className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold transition ${activeTab === 'products' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                        onClick={() => { setActiveTab('products'); fetchAllData(); }}
                    >
                        <Package size={20} />
                        <span className="hidden sm:inline">Products</span>
                    </button>
                    <button
                        className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold transition ${activeTab === 'users' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                        onClick={() => { setActiveTab('users'); fetchAllData(); }}
                    >
                        <Users size={20} />
                        <span className="hidden sm:inline">Users</span>
                    </button>
                </div>

                {
                    loading ? (
                        <div className="loader"></div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                            {/* DASHBOARD TAB */}
                            {activeTab === 'dashboard' && (
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-secondary mb-6">Recent Orders</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    <th className="p-4 font-bold text-secondary">Order ID</th>
                                                    <th className="p-4 font-bold text-secondary">Customer</th>
                                                    <th className="p-4 font-bold text-secondary">Date</th>
                                                    <th className="p-4 font-bold text-secondary">Total</th>
                                                    <th className="p-4 font-bold text-secondary">Status</th>
                                                    <th className="p-4 font-bold text-secondary">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders.slice(0, 5).map(order => (
                                                    <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                                        <td className="p-4 text-sm text-gray-500 font-mono">...{order._id.substring(order._id.length - 6)}</td>
                                                        <td className="p-4 font-medium">{order.user?.name || 'N/A'}</td>
                                                        <td className="p-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                        <td className="p-4 font-bold text-primary">₹{order.totalPrice}</td>
                                                        <td className="p-4">
                                                            {order.isPaid ? (
                                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Paid</span>
                                                            ) : (
                                                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">Pending</span>
                                                            )}
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="flex gap-2">
                                                                <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition" title="View Details">
                                                                    <Eye size={18} />
                                                                </button>
                                                                <button onClick={() => deleteOrder(order._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete Order">
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* ORDERS TAB */}
                            {activeTab === 'orders' && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="p-4 font-bold text-secondary">Order ID</th>
                                                <th className="p-4 font-bold text-secondary">Customer</th>
                                                <th className="p-4 font-bold text-secondary">Date</th>
                                                <th className="p-4 font-bold text-secondary">Total</th>
                                                <th className="p-4 font-bold text-secondary">Payment</th>
                                                <th className="p-4 font-bold text-secondary">Delivery</th>
                                                <th className="p-4 font-bold text-secondary">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                                    <td className="p-4 text-sm text-gray-500 font-mono">...{order._id.substring(order._id.length - 6)}</td>
                                                    <td className="p-4">
                                                        <div className="font-medium">{order.user?.name || 'N/A'}</div>
                                                        <div className="text-sm text-gray-500">{order.user?.email || 'N/A'}</div>
                                                    </td>
                                                    <td className="p-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                    <td className="p-4 font-bold text-primary">₹{order.totalPrice}</td>
                                                    <td className="p-4">
                                                        {order.isPaid ? (
                                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Paid</span>
                                                        ) : (
                                                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Unpaid</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4">
                                                        {order.isDelivered ? (
                                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Delivered</span>
                                                        ) : (
                                                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">Pending</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex gap-2">
                                                            <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition">
                                                                <Eye size={18} />
                                                            </button>
                                                            <button onClick={() => deleteOrder(order._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* PRODUCTS TAB */}
                            {activeTab === 'products' && (
                                <div className="p-4 md:p-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-grow max-w-4xl">
                                            <div className="relative flex-grow">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    type="text"
                                                    placeholder="Search products..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50"
                                                />
                                            </div>

                                            {/* Premium Category Filter Dropdown */}
                                            <div className="relative w-full md:w-64">
                                                <button
                                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white flex items-center justify-between hover:border-primary hover:ring-2 hover:ring-primary/20 transition-all duration-300 group"
                                                >
                                                    <div className="flex items-center gap-2 overflow-hidden">
                                                        <Filter className="absolute left-3 text-gray-400 group-hover:text-primary transition-colors" size={18} />
                                                        <span className="ml-2 font-medium text-gray-700 group-hover:text-secondary truncate">{selectedCategory}</span>
                                                    </div>
                                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                                                </button>

                                                {/* Dropdown Menu */}
                                                {isFilterOpen && (
                                                    <div className="absolute top-full right-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                                        <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 font-medium">
                                                            {categories.map((cat) => (
                                                                <button
                                                                    key={cat}
                                                                    onClick={() => {
                                                                        setSelectedCategory(cat);
                                                                        setIsFilterOpen(false);
                                                                    }}
                                                                    className={`w-full text-left px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${selectedCategory === cat ? 'bg-primary/5 text-primary' : 'text-gray-600'}`}
                                                                >
                                                                    <span>{cat}</span>
                                                                    {selectedCategory === cat && <Check size={16} className="text-primary" />}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Backprop to close dropdown when clicking outside */}
                                            {isFilterOpen && (
                                                <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)}></div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => openProductForm()}
                                            className="bg-primary text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-secondary transition shadow-md w-full md:w-auto justify-center"
                                        >
                                            <Plus size={18} />
                                            Add Product
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {filteredProducts.map(product => (
                                            <div key={product._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition group">
                                                <div className="relative h-48 bg-gray-100 overflow-hidden">
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                                                    <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                                                        ₹{product.price}
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <h4 className="font-bold text-secondary mb-2 truncate">{product.name}</h4>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                                                            {product.category}
                                                        </span>
                                                        <span className={`${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'} font-medium text-sm`}>
                                                            Stock: {product.countInStock}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2 mt-4">
                                                        <button
                                                            onClick={() => openProductForm(product)}
                                                            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-1 text-sm font-bold"
                                                        >
                                                            <Edit size={16} />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => deleteProduct(product._id)}
                                                            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-1 text-sm font-bold"
                                                        >
                                                            <Trash2 size={16} />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* USERS TAB */}
                            {activeTab === 'users' && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="p-4 font-bold text-secondary">User ID</th>
                                                <th className="p-4 font-bold text-secondary">Name</th>
                                                <th className="p-4 font-bold text-secondary">Email</th>
                                                <th className="p-4 font-bold text-secondary">Role</th>
                                                <th className="p-4 font-bold text-secondary">Joined</th>
                                                <th className="p-4 font-bold text-secondary">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(user => (
                                                <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                                    <td className="p-4 text-sm text-gray-500 font-mono">...{user._id.substring(user._id.length - 6)}</td>
                                                    <td className="p-4 font-medium">{user.name}</td>
                                                    <td className="p-4 text-gray-500">{user.email}</td>
                                                    <td className="p-4">
                                                        {user.isAdmin ? (
                                                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">Admin</span>
                                                        ) : (
                                                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">User</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                                    <td className="p-4">
                                                        <div className="flex gap-2">
                                                            <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition" title="View Details">
                                                                <Eye size={18} />
                                                            </button>
                                                            <button onClick={() => deleteUser(user._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete User">
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )
                }
            </div >

            {/* Product Form Modal */}
            {
                showProductForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
                            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-secondary">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <button onClick={() => setShowProductForm(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleProductSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-secondary mb-2">Product Name</label>
                                        <input
                                            type="text"
                                            value={productForm.name}
                                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-secondary mb-2">Price (₹)</label>
                                        <input
                                            type="number"
                                            value={productForm.price}
                                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-secondary mb-2">Category</label>
                                        <select
                                            value={productForm.category}
                                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Cakes">Cakes</option>
                                            <option value="Pizza">Pizza</option>
                                            <option value="Burgers">Burgers</option>
                                            <option value="Starters">Starters</option>
                                            <option value="Breads">Breads</option>
                                            <option value="Sandwich">Sandwich</option>
                                            <option value="Subs">Subs</option>
                                            <option value="Pasta">Pasta</option>
                                            <option value="Noodles">Noodles</option>
                                            <option value="Salads">Salads</option>
                                            <option value="Sweets">Sweets</option>
                                            <option value="Hot Drinks">Hot Drinks</option>
                                            <option value="Cool Drinks">Cool Drinks</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-secondary mb-2">Stock Count</label>
                                        <input
                                            type="number"
                                            value={productForm.countInStock}
                                            onChange={(e) => setProductForm({ ...productForm, countInStock: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-secondary mb-2">Image URL</label>
                                    <input
                                        type="url"
                                        value={productForm.image}
                                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="https://example.com/image.jpg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-secondary mb-2">Description</label>
                                    <textarea
                                        value={productForm.description}
                                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowProductForm(false)}
                                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition"
                                    >
                                        {editingProduct ? 'Update Product' : 'Create Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* Premium Confirmation Dialog - Mobile Responsive */}
            {confirmDialog.isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-center justify-center p-3 sm:p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[90vw] sm:max-w-sm overflow-hidden animate-slide-up">
                        <div className="p-5 sm:p-6 text-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <Trash2 size={28} className="sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-secondary mb-2 px-2">{confirmDialog.title}</h3>
                            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed px-2">{confirmDialog.message}</p>
                        </div>
                        <div className="flex border-t border-gray-100">
                            <button
                                onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                                className="flex-1 px-4 sm:px-6 py-3.5 sm:py-4 font-bold text-sm sm:text-base text-gray-500 hover:bg-gray-50 active:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDialog.onConfirm}
                                className="flex-1 px-4 sm:px-6 py-3.5 sm:py-4 font-bold text-sm sm:text-base text-red-600 hover:bg-red-50 active:bg-red-100 transition border-l border-gray-100"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Premium Toast Notification - Mobile Responsive & Centered */}
            {notification && (
                <div className="fixed bottom-8 inset-x-0 z-[100] flex justify-center px-4">
                    <div className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl border backdrop-blur-md animate-bounce-short max-w-full ${notification.type === 'success'
                        ? 'bg-green-50/90 border-green-200 text-green-800'
                        : 'bg-red-50/90 border-red-200 text-red-800'
                        }`}>
                        <div className="flex-shrink-0">
                            {notification.type === 'success' ? <Check size={18} className="text-green-600" /> : <AlertCircle size={18} className="text-red-600" />}
                        </div>
                        <p className="font-bold text-xs sm:text-sm tracking-wide leading-tight">{notification.message}</p>
                        <button onClick={() => setNotification(null)} className="ml-auto flex-shrink-0 hover:opacity-70 p-1">
                            <X size={14} sm:size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboardPage;
