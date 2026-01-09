import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { ChevronRight, Star, Clock, Heart } from 'lucide-react';
import axios from 'axios';

const HomePage = () => {
    const { products, loading, error } = useContext(StoreContext);

    // Shuffle products ONCE when the component mounts
    const shuffledProducts = useMemo(() => {
        if (!Array.isArray(products)) return [];
        // Using a simple shuffle that is somewhat stable during a single render cycle
        return [...products].sort(() => 0.5 - 0.1);
    }, [products]);

    // Group products for different sections using the shuffled list
    const cakes = shuffledProducts.filter(p => p.category === 'Cakes').slice(0, 4);
    const burgers = shuffledProducts.filter(p => p.category === 'Burgers').slice(0, 4);
    const pizzas = shuffledProducts.filter(p => p.category === 'Pizza').slice(0, 4);
    const trending = shuffledProducts.slice(0, 8);

    const categories = [
        { name: 'Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop&q=80' },
        { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=500&fit=crop&q=80' },
        { name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop&q=80' },
        { name: 'Starters', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=500&fit=crop&q=80' },
        { name: 'Breads', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop&q=80' },
        { name: 'Sandwich', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=500&fit=crop&q=80' },
        { name: 'Subs', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=500&fit=crop&q=80' },
        { name: 'Pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=500&fit=crop&q=80' },
        { name: 'Noodles', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop&q=80' },
        { name: 'Salads', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop&q=80' },
        { name: 'Sweets', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=500&fit=crop&q=80' },
        { name: 'Hot Drinks', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&h=500&fit=crop&q=80' },
        { name: 'Cool Drinks', image: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=500&h=500&fit=crop&q=80' }
    ];

    if (loading) return <div className="loader"></div>;

    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-red-50 text-red-600 p-6 rounded-2xl shadow-sm border border-red-100 max-w-md text-center">
                <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
                <p className="mb-4">{error}</p>
                <div className="text-sm text-gray-500 mb-4">
                    Backend URL: {axios.defaults.baseURL}
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition"
                >
                    Retry Connection
                </button>
            </div>
        </div>
    );

    const renderProductSection = (items, showAll = false) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((p, index) => (
                <div key={p._id} className={!showAll && index >= 2 ? 'hidden lg:block' : 'block'}>
                    <ProductCard product={p} />
                </div>
            ))}
        </div>
    );

    return (
        <div className="bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="relative h-[350px] md:h-[500px] flex items-center bg-secondary text-white overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
                        alt="Hero"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 flex flex-col items-start gap-4">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
                        Flat 50% Off
                    </span>
                    <h1 className="text-3xl md:text-7xl font-bold leading-tight">
                        Craving <br /><span className="text-primary">Something</span> Sweet?
                    </h1>
                    <p className="text-xs md:text-xl text-gray-300 max-w-lg">
                        Order the town's best pastries and get them delivered in 30 minutes.
                    </p>
                    <Link to="/products" className="bg-white text-secondary px-6 py-2 md:px-8 md:py-3 rounded-full font-bold hover:bg-primary hover:text-white transition shadow-lg mt-4">
                        Order Now
                    </Link>
                </div>
            </section>

            {/* Category Slider */}
            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="bg-white px-6 py-5 rounded-2xl shadow-xl flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth">
                    {categories.map((cat, index) => (
                        <Link
                            to={`/products?category=${cat.name}`}
                            key={index}
                            className="flex flex-col items-center min-w-[110px] gap-2 group flex-shrink-0"
                        >
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-primary transition duration-300 bg-gray-100">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                                    }}
                                />
                            </div>
                            <span className="font-bold text-sm text-secondary group-hover:text-primary whitespace-nowrap">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Trending Now */}
            <section className="container mx-auto px-4 mt-16">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-secondary flex items-center gap-2">
                        <Star className="text-primary fill-primary" /> Trending Now
                    </h2>
                    <Link to="/products" className="text-primary font-bold hover:text-accent flex items-center gap-1">
                        View All <ChevronRight size={18} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trending.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>

            {/* Sections */}
            <section className="container mx-auto px-4 mt-12 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary">Premium Cakes</h2>
                </div>
                {renderProductSection(cakes)}
            </section>

            <section className="container mx-auto px-4 mt-12 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary">Juicy Burgers</h2>
                </div>
                {renderProductSection(burgers)}
            </section>

            <section className="container mx-auto px-4 mt-12 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary">Cheesy Pizzas</h2>
                </div>
                {renderProductSection(pizzas)}
            </section>

            {/* Features */}
            <section className="bg-white py-12 border-t border-gray-100 mt-20">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                            <Clock size={32} />
                        </div>
                        <h4 className="font-bold text-lg mb-2">30 Min Delivery</h4>
                        <p className="text-gray-500 text-sm">Super fast delivery at your doorstep.</p>
                    </div>
                    <div>
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                            <Heart size={32} />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Made with Love</h4>
                        <p className="text-gray-500 text-sm">Hygenic and fresh ingredients guaranteed.</p>
                    </div>
                    <div>
                        <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600">
                            <Star size={32} />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Top Rated</h4>
                        <p className="text-gray-500 text-sm">Loved by 10,000+ happy customers.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
