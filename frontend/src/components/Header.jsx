import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Sandwich, LayoutDashboard } from 'lucide-react';
import { StoreContext } from '../context/StoreContext';

const Header = () => {
    const { cartItems, userInfo, logout } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 py-3 md:py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Brand Logo - Left side */}
                    <Link to="/" className="text-xl md:text-2xl font-bold text-secondary flex items-center gap-1 md:gap-2">
                        <Sandwich size={28} className="text-primary" />
                        <span>Bread <span className="text-primary">House</span></span>
                    </Link>

                    {/* Right side interactions */}
                    <div className="flex items-center gap-4">
                        {/* Show Home/Menu only on Desktop */}
                        <div className="hidden md:flex gap-6 items-center mr-6">
                            <Link to="/" className="font-medium text-text-light hover:text-primary transition">Home</Link>
                            <Link to="/products" className="font-medium text-text-light hover:text-primary transition">Menu</Link>
                            <Link to="/cart" className="relative text-text-light hover:text-primary transition">
                                <ShoppingCart size={24} />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {/* User Account or Login - Always on top right */}
                        {userInfo ? (
                            <div className="flex items-center gap-3">
                                <Link to="/profile" className="flex items-center gap-1 font-bold text-sm md:font-medium md:text-base text-text-light hover:text-primary transition">
                                    <User size={20} />
                                    <span className="hidden sm:inline">{userInfo.name.split(' ')[0]}</span>
                                </Link>
                                <button onClick={handleLogout} className="text-text-light hover:text-primary transition">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg font-bold transition shadow-md text-sm md:text-base">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
