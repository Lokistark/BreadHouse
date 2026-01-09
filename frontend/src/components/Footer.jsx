import React from 'react';
import { Link } from 'react-router-dom';
import { Sandwich, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white pt-10 pb-24 md:pt-16 md:pb-8 mt-10 md:mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
                    {/* Brand Info */}
                    <div>
                        <div className="flex items-center gap-2 text-2xl font-bold mb-4">
                            <Sandwich size={24} className="text-primary" />
                            Bread House
                        </div>
                        <p className="opacity-80 text-sm leading-relaxed">
                            Taste the freshness in every bite. Your neighborhood bakery and diner serving happiness since 2010.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-3 md:mb-4 border-b border-white/20 pb-2 inline-block">Quick Links</h4>
                        <ul className="space-y-2 opacity-80">
                            <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
                            <li><Link to="/products" className="hover:text-primary transition">Our Menu</Link></li>
                            <li><Link to="/cart" className="hover:text-primary transition">Cart</Link></li>
                            <li><Link to="/admin" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">Admin</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-3 md:mb-4 border-b border-white/20 pb-2 inline-block">Contact Us</h4>
                        <p className="opacity-80 text-sm leading-relaxed mb-1">143, Tiruppur, Tamilnadu.</p>
                        <p className="opacity-80 text-sm leading-relaxed mb-1">Email: logeshdev5@gmail.com</p>
                        <p className="opacity-80 text-sm leading-relaxed">Phone: 6385780294</p>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-lg font-bold mb-3 md:mb-4 border-b border-white/20 pb-2 inline-block">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-primary transition transform hover:scale-110"><Facebook size={22} /></a>
                            <a href="#" className="hover:text-primary transition transform hover:scale-110"><Instagram size={22} /></a>
                            <a href="#" className="hover:text-primary transition transform hover:scale-110"><Twitter size={22} /></a>
                        </div>
                    </div>
                </div>

                <div className="text-center pt-8 border-t border-white/10 text-sm opacity-60">
                    <p>&copy; {new Date().getFullYear()} Bread House. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
