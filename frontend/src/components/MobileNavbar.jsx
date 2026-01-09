import React, { useContext } from 'react';
import { Home, UtensilsCrossed, ShoppingCart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const MobileNavbar = () => {
    const location = useLocation();
    const { cartItems } = useContext(StoreContext);
    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] py-3 px-6 md:hidden z-50 flex justify-between items-center text-gray-400">
            <Link to="/" className={`flex flex-col items-center gap-1 transition ${isActive('/') ? 'text-primary' : 'hover:text-primary'}`}>
                <Home size={22} strokeWidth={isActive('/') ? 2.5 : 2} />
                <span className="text-[10px] font-bold">Home</span>
            </Link>
            <Link to="/products" className={`flex flex-col items-center gap-1 transition ${isActive('/products') ? 'text-primary' : 'hover:text-primary'}`}>
                <UtensilsCrossed size={22} strokeWidth={isActive('/products') ? 2.5 : 2} />
                <span className="text-[10px] font-bold">Menu</span>
            </Link>
            <Link to="/cart" className={`flex flex-col items-center gap-1 transition ${isActive('/cart') ? 'text-primary' : 'hover:text-primary'}`}>
                <div className="relative">
                    <ShoppingCart size={22} strokeWidth={isActive('/cart') ? 2.5 : 2} />
                    {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-accent text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                            {cartItems.length}
                        </span>
                    )}
                </div>
                <span className="text-[10px] font-bold">Cart</span>
            </Link>
            <Link to="/profile" className={`flex flex-col items-center gap-1 transition ${isActive('/profile') ? 'text-primary' : 'hover:text-primary'}`}>
                <User size={22} strokeWidth={isActive('/profile') ? 2.5 : 2} />
                <span className="text-[10px] font-bold">Account</span>
            </Link>
        </div>
    );
};

export default MobileNavbar;
