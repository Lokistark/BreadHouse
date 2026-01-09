import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQty, subtotal } = useContext(StoreContext);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/login?redirect=checkout');
    };

    return (
        <div className="container mx-auto px-4 py-10 min-h-[80vh]">
            <h1 className="text-3xl font-bold text-secondary mb-8 border-b pb-4">Your Shopping Bag</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-xl border border-dashed border-gray-300">
                    <ShoppingBag size={80} className="text-gray-300 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-secondary mb-2">Your cart is empty!</h2>
                    <p className="text-gray-500 mb-8">Looks like you haven't added any treats yet.</p>
                    <Link to="/products" className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-full font-bold transition shadow-md inline-block">
                        Go to Menu
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex flex-row items-center gap-3 md:gap-6 bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                                <img src={item.image} alt={item.name} className="w-16 h-16 md:w-24 md:h-24 rounded-lg object-cover flex-shrink-0" />

                                <div className="flex-1 min-w-0">
                                    <Link to={`/product/${item._id}`} className="text-sm md:text-lg font-bold text-secondary hover:text-primary transition truncate block">{item.name}</Link>
                                    <p className="text-[10px] md:text-sm text-text-light truncate">{item.category}</p>

                                    {/* Price and Qty on same row for mobile */}
                                    <div className="flex md:hidden items-center gap-2 mt-1">
                                        <div className="font-bold text-primary text-sm">₹{item.price * item.qty}</div>
                                        <span className="text-gray-300">|</span>
                                        <select
                                            value={item.qty}
                                            onChange={(e) => updateQty(item._id, e.target.value)}
                                            className="text-xs p-1 border border-gray-200 rounded bg-gray-50 focus:outline-none"
                                        >
                                            {[...Array(10).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Desktop only fields */}
                                <div className="hidden md:flex items-center gap-2">
                                    <select
                                        value={item.qty}
                                        onChange={(e) => updateQty(item._id, e.target.value)}
                                        className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary cursor-pointer"
                                    >
                                        {[...Array(10).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="hidden md:block font-bold text-lg w-24 text-center text-secondary">
                                    ₹{item.price * item.qty}
                                </div>

                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-gray-400 hover:text-red-500 transition p-2 flex-shrink-0"
                                >
                                    <Trash2 size={18} md:size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="h-fit bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold mb-6 text-secondary">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                <span>₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            {/* Coupon Input Removed from Cart Page */}
                        </div>

                        <div className="border-t border-gray-100 pt-4 mb-8">
                            <div className="flex justify-between text-xl font-bold text-secondary">
                                <span>Total</span>
                                <span>₹{subtotal}</span>
                            </div>
                        </div>

                        <button
                            className="w-full bg-primary hover:bg-accent text-white py-4 rounded-lg font-bold shadow-md transition flex items-center justify-center gap-2"
                            onClick={() => {
                                // Pass coupon code via state if entered (simplified logic)
                                const couponCode = document.getElementById('cart-coupon-input')?.value.toUpperCase();
                                navigate('/login?redirect=/checkout', { state: { couponCode } });
                            }}
                        >
                            Buy Now <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
