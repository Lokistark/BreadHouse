import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tag } from 'lucide-react';

const CheckoutPage = () => {
    const { cartItems, subtotal } = useContext(StoreContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Derived state
    const cartTotal = subtotal;

    // Form State
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        street: '', city: '', state: '', zipCode: '', country: 'India'
    });

    // Payment & Coupon State
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponApplied, setCouponApplied] = useState(false);

    // cartTotal is already defined above from context subtotal
    const shippingFee = cartTotal > 500 ? 0 : 50;
    const finalTotal = cartTotal + shippingFee - discount;

    const coupons = {
        'WELCOME50': 50,
        'BREAD20': Math.floor(0.20 * cartTotal), // 20% off
        'FREESHIP': 50
    };

    // Check for coupon passed from Cart Page
    useEffect(() => {
        if (location.state && location.state.couponCode) {
            const passedCode = location.state.couponCode;
            setCouponCode(passedCode);
            // Auto apply if valid
            if (coupons[passedCode]) {
                let disc = coupons[passedCode];
                if (passedCode === 'BREAD20') disc = Math.floor(0.20 * cartTotal);
                setDiscount(disc);
                setCouponApplied(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state, cartTotal]);

    const [couponMessage, setCouponMessage] = useState(null); // { type: 'success' | 'error', text: '' }

    const handleApplyCoupon = () => {
        if (coupons[couponCode]) {
            let disc = coupons[couponCode];
            if (couponCode === 'BREAD20') disc = Math.floor(0.20 * cartTotal);

            setDiscount(disc);
            setCouponApplied(true);
            setCouponMessage({ type: 'success', text: `Coupon Applied! You saved ₹${disc}` });

            // Clear message after 3 seconds
            setTimeout(() => setCouponMessage(null), 3000);
        } else {
            setDiscount(0);
            setCouponApplied(false);
            setCouponMessage({ type: 'error', text: 'Invalid Coupon Code' });
            // Clear message after 3 seconds
            setTimeout(() => setCouponMessage(null), 3000);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const proceedToPayment = (e) => {
        e.preventDefault();

        // Prepare data to pass to Payment Page
        const orderItems = cartItems.map(item => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item._id
        }));

        const orderData = {
            orderItems,
            shippingAddress: {
                address: formData.street,
                city: formData.city,
                postalCode: formData.zipCode,
                country: formData.country,
                email: formData.email, // Ensure email is passed for payment record
                phone: formData.phone
            },
            itemsPrice: cartTotal,
            taxPrice: 0, // Added taxPrice (Required by Backend)
            shippingPrice: shippingFee,
            totalPrice: finalTotal,
        };

        // Navigate to payment page with data
        navigate('/payment', { state: { orderData, finalTotal: Number(finalTotal) } });
    };

    return (
        <div className="container mx-auto px-4 py-10 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-primary pl-4">Checkout</h1>

            <form onSubmit={proceedToPayment} className="flex flex-col lg:flex-row gap-8" autoComplete="off">
                {/* Left Side: Delivery Details */}
                <div className="flex-1 w-full">
                    <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">1</span>
                            Delivery Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input required name='firstName' onChange={handleChange} value={formData.firstName} type="text" placeholder="First Name" className="p-3 border rounded-lg bg-gray-50 focus:outline-primary" />
                            <input required name='lastName' onChange={handleChange} value={formData.lastName} type="text" placeholder="Last Name" className="p-3 border rounded-lg bg-gray-50 focus:outline-primary" />
                            <input required name='email' onChange={handleChange} value={formData.email} type="email" placeholder="Email Address" className="p-3 border rounded-lg bg-gray-50 focus:outline-primary w-full" />
                            <input required name='phone' onChange={handleChange} value={formData.phone} type="text" placeholder="Phone Number" className="p-3 border rounded-lg bg-gray-50 focus:outline-primary w-full" />
                            <input required name='street' onChange={handleChange} value={formData.street} type="text" placeholder="Street Address" className="p-3 border rounded-lg bg-gray-50 focus:outline-primary w-full md:col-span-2" />
                            <div className="grid grid-cols-2 gap-4 md:col-span-2">
                                <input required name='city' onChange={handleChange} value={formData.city} type="text" placeholder="City" className="p-3 border rounded-lg bg-gray-50 focus:outline-primary" />
                                <input required name='state' onChange={handleChange} value={formData.state} type="text" placeholder="State" className="p-3 border rounded-lg bg-gray-50 focus:outline-primary" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 md:col-span-2">
                                <input required name='zipCode' onChange={handleChange} value={formData.zipCode} type="text" placeholder="Zip Code" className="p-3 border rounded-lg bg-gray-50 focus:outline-primary" />
                                <input required name='country' onChange={handleChange} value={formData.country} type="text" placeholder="Country" className="p-3 border rounded-lg bg-gray-50 focus:outline-primary" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Order Summary */}
                <div className="w-full lg:w-[450px]">
                    <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">

                        {/* Order Summary */}
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-3 mb-6 border-b pb-6">
                            <div className="flex justify-between text-gray-600">
                                <p>Subtotal</p>
                                <p>₹{cartTotal}</p>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <p>Shipping Fee</p>
                                <p>{shippingFee === 0 ? <span className="text-green-600">Free</span> : `₹${shippingFee}`}</p>
                            </div>
                            {couponApplied && (
                                <div className="flex justify-between text-green-600 font-medium">
                                    <p>Discount (Approved)</p>
                                    <p>- ₹{discount}</p>
                                </div>
                            )}
                            <div className="flex justify-between text-2xl font-bold text-gray-800 pt-2 border-t border-dashed">
                                <p>Total</p>
                                <p>₹{finalTotal}</p>
                            </div>
                        </div>

                        {/* Coupon Section */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <Tag size={16} /> Have a Coupon?
                            </label>
                            <div className="flex flex-row gap-2">
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    placeholder="ENTER CODE (E.G., WELCOME50)"
                                    className="flex-1 min-w-0 p-2 border rounded-lg uppercase text-[12px] md:text-sm focus:outline-primary h-11"
                                    autoComplete="on"
                                />
                                <button type="button" onClick={handleApplyCoupon} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold h-11 whitespace-nowrap">Apply</button>
                            </div>

                            {/* Available Coupons Suggestions */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className="text-xs text-gray-500 pt-1">Available:</span>
                                <button type="button" onClick={() => setCouponCode('WELCOME50')} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200 hover:bg-green-100 transition whitespace-nowrap">WELCOME50</button>
                                <button type="button" onClick={() => setCouponCode('BREAD20')} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200 hover:bg-blue-100 transition whitespace-nowrap">BREAD20</button>
                            </div>

                            {couponMessage && (
                                <p className={`text-xs mt-2 font-bold ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                    {couponMessage.text}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-opacity-90 transition flex items-center justify-center gap-2"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
