import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ShoppingBag } from 'lucide-react';
import ReactConfetti from 'react-confetti';

const OrderSuccessPage = () => {
    const navigate = useNavigate();
    const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

    // Use state for the random Order ID to keep it stable and pure during re-renders
    const [orderIdSnippet] = useState(() => Math.floor(100000 + Math.random() * 900000));

    useEffect(() => {
        const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gray-50 text-center px-4">
            <ReactConfetti
                width={windowDimensions.width}
                height={windowDimensions.height}
                recycle={false}
                numberOfPieces={500}
            />

            <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full transform transition-all hover:scale-105 duration-300">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner animate-bounce-slow">
                    <ShieldCheck className="text-green-600" size={56} />
                </div>

                <h1 className="text-4xl font-extrabold text-gray-800 mb-3 tracking-tight">Order Placed!</h1>
                <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                    Thank you for choosing Bread House. <br />
                    Your delicious food is being prepared and will be with you in <strong>30-45 mins</strong>.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-primary hover:bg-accent text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 group"
                    >
                        <ShoppingBag size={20} className="group-hover:rotate-12 transition" /> Continue Shopping
                    </button>

                    <button
                        onClick={() => navigate('/profile')}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-secondary py-4 rounded-xl font-bold text-lg transition"
                    >
                        View Order Status
                    </button>
                </div>
            </div>

            <p className="mt-8 text-gray-400 text-sm">Order ID: #{orderIdSnippet}</p>
        </div>
    );
};

export default OrderSuccessPage;
