import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { Wallet, Banknote, CreditCard, ShieldCheck } from 'lucide-react';

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userInfo, clearCart } = useContext(StoreContext);

    // Get Data from Checkout
    const { orderData, finalTotal } = location.state || {};

    // Redirect if no data
    useEffect(() => {
        if (!orderData) navigate('/cart');
    }, [orderData, navigate]);

    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [upiId, setUpiId] = useState('');
    const [loading, setLoading] = useState(false);

    // Mock Wallet Balance
    const walletBalance = 5000;

    const handlePayment = async () => {
        setLoading(true);

        try {
            // Validate Payment Inputs
            if (paymentMethod === 'upi') {
                if (!upiId || !upiId.includes('@')) {
                    alert('Please enter a valid UPI ID (e.g., yourname@okicici)');
                    setLoading(false);
                    return;
                }
            }

            // Simulate Payment Processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Final Order Payload with Payment Details
            const finalOrder = {
                ...orderData,
                paymentMethod: paymentMethod, // Added top-level paymentMethod (Required by Backend)
                paymentResult: {
                    id: `PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                    status: 'COMPLETED',
                    update_time: String(new Date().toISOString()), // Cast to String as required by Model
                    email_address: orderData.shippingAddress.email,
                    method: paymentMethod
                }
            };

            // Send to Backend
            if (userInfo && userInfo.token) {
                const { data } = await axios.post('/api/orders', finalOrder, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
                console.log('Order created:', data);
                clearCart();
                navigate('/order-success');
            } else {
                throw new Error('Not logged in or missing token');
            }

        } catch (error) {
            console.error('Payment processing failed:', error);
            const errorMsg = error.response?.data?.message || error.message;
            alert(`Payment Failed: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    if (!orderData) return null;

    return (
        <div className="container mx-auto px-4 py-10 min-h-screen bg-gray-50 flex justify-center">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-primary pl-4">Secure Payment</h1>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b">
                        <span className="text-gray-500">Amount to Pay</span>
                        <span className="text-3xl font-bold text-primary">₹{finalTotal ? Number(finalTotal).toFixed(2) : '0.00'}</span>
                    </div>

                    <div className="space-y-4 mb-8">
                        {/* UPI Payment Option */}
                        <div
                            onClick={() => setPaymentMethod('upi')}
                            className={`border rounded-xl p-4 cursor-pointer transition ${paymentMethod === 'upi' ? 'border-primary bg-orange-50 ring-1 ring-primary' : 'hover:bg-gray-50'}`}
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 bg-white rounded-full shadow-sm">
                                    <Wallet className="text-blue-600" size={24} />
                                </div>
                                <span className="font-bold text-lg">UPI ID</span>
                            </div>

                            {paymentMethod === 'upi' && (
                                <div className="pl-14 animation-fade-in">
                                    <input
                                        type="text"
                                        placeholder="Enter UPI ID (e.g. 9876543210@ybl)"
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:outline-primary"
                                        autoFocus
                                    />
                                    <p className="text-xs text-gray-400 mt-2">Verify on your UPI app after clicking Pay</p>
                                </div>
                            )}
                        </div>

                        {/* Wallet Payment Option */}
                        <div
                            onClick={() => setPaymentMethod('wallet')}
                            className={`border rounded-xl p-4 cursor-pointer transition ${paymentMethod === 'wallet' ? 'border-primary bg-orange-50 ring-1 ring-primary' : 'hover:bg-gray-50'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white rounded-full shadow-sm">
                                    <CreditCard className="text-purple-600" size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-lg">Bread House Wallet</span>
                                    <span className="text-sm text-gray-500">Balance: ₹{walletBalance}</span>
                                </div>
                            </div>

                        </div>

                        {/* COD Option */}
                        <div
                            onClick={() => setPaymentMethod('cod')}
                            className={`border rounded-xl p-4 cursor-pointer transition ${paymentMethod === 'cod' ? 'border-primary bg-orange-50 ring-1 ring-primary' : 'hover:bg-gray-50'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white rounded-full shadow-sm">
                                    <Banknote className="text-green-600" size={24} />
                                </div>
                                <span className="font-bold text-lg">Cash on Delivery</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full bg-primary hover:bg-accent text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition transform active:scale-95"
                    >
                        {loading ? <div className="loader w-6 h-6 border-white"></div> : (
                            <>
                                <ShieldCheck size={20} /> Pay ₹{finalTotal ? Number(finalTotal).toFixed(2) : '0.00'}
                            </>
                        )}
                    </button>

                    <div className="text-center mt-6 text-xs text-gray-400 flex items-center justify-center gap-2">
                        <ShieldCheck size={12} /> Secure 256-bit SSL Encrypted Payment
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
