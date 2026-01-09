import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { User, Package, Settings, ChevronRight, Trash2, AlertCircle, Check, X } from 'lucide-react';

const ProfilePage = () => {
    const { userInfo, logout } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Notification and Confirmation State
    const [notification, setNotification] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null
    });

    const showToast = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

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

    const deleteOrder = (id) => {
        triggerConfirm(
            'Delete Order History?',
            'Are you sure you want to remove this order from your history? This will only remove it from your view.',
            async () => {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    };
                    // Update UI instantly
                    setOrders(prev => prev.filter(order => order._id !== id));
                    await axios.delete(`/api/orders/${id}`, config);
                    showToast('Order removed from history');
                } catch (err) {
                    showToast('Failed to delete order', 'error');
                    console.error(err);
                }
            }
        );
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await axios.get('/api/orders/myorders', config);
                setOrders(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        if (userInfo) fetchOrders();
    }, [userInfo]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    if (!userInfo) return null;

    return (
        <div className="container mx-auto px-4 py-10 min-h-[80vh]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                            {userInfo.name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-1">{userInfo.name}</h3>
                        <p className="text-gray-500 text-sm mb-6">{userInfo.email}</p>
                        <button
                            onClick={logout}
                            className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-2 rounded-lg font-bold transition duration-300"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="bg-white mt-6 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                        <div className="p-4 flex items-center gap-3 bg-gray-50 font-bold text-secondary border-l-4 border-primary">
                            <Package size={20} /> My Orders
                        </div>
                        <div className="p-4 flex items-center gap-3 text-gray-500 hover:bg-gray-50 cursor-pointer transition border-b border-gray-100">
                            <User size={20} /> Profile Details
                        </div>
                        <div className="p-4 flex items-center gap-3 text-gray-500 hover:bg-gray-50 cursor-pointer transition">
                            <Settings size={20} /> Settings
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-3">
                    <h2 className="text-2xl font-bold text-secondary mb-6">Order History</h2>

                    {loading ? (
                        <div className="loader"></div>
                    ) : orders.length === 0 ? (
                        <div className="bg-white p-12 rounded-xl text-center shadow-sm border border-dashed border-gray-300">
                            <Package size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500">You haven't placed any orders yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="text-center sm:text-left">
                                        <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Order #{order._id.substring(order._id.length - 8)}</h4>
                                        <p className="font-bold text-secondary mb-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        <p className="text-sm text-gray-500">{order.orderItems.length} items • ₹{order.totalPrice}</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className={`px-4 py-1 rounded-full text-xs font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {order.isPaid ? 'Paid' : 'Payment Pending'}
                                        </span>
                                        <button
                                            onClick={() => deleteOrder(order._id)}
                                            className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
                                            title="Delete Order History"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-full transition">
                                            <ChevronRight size={20} className="text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

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
                        {notification.type === 'success' ? <Check size={18} className="text-green-600 shrink-0" /> : <AlertCircle size={18} className="text-red-600 shrink-0" />}
                        <p className="font-bold text-xs sm:text-sm tracking-wide leading-tight">{notification.message}</p>
                        <button onClick={() => setNotification(null)} className="ml-1 sm:ml-2 hover:opacity-70 shrink-0 p-1">
                            <X size={14} sm:size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
