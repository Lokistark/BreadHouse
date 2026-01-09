import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { ChevronLeft, Plus, Minus, ShoppingCart, Star, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, addToCart } = useContext(StoreContext);
    const [qty, setQty] = useState(1);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when loading new product
        const foundProduct = products.find((p) => p._id === id);
        if (foundProduct) {
            setProduct(foundProduct);
            // Find related products
            const related = products
                .filter(p => p.category === foundProduct.category && p._id !== foundProduct._id)
                .sort(() => 0.5 - Math.random()) // Shuffle
                .slice(0, 4);
            setRelatedProducts(related);
        }
    }, [id, products]);

    if (!product) return <div className="loader"></div>;

    const handleAddToCart = () => {
        addToCart(product, qty);
        // Removed alert as per request
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb / Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-500 hover:text-primary mb-6 transition text-sm font-medium"
                >
                    <ChevronLeft size={18} /> Back to Menu
                </button>

                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-10 lg:gap-16 mb-16">
                    {/* Product Image */}
                    <div className="w-full md:w-1/2">
                        <div className="rounded-2xl overflow-hidden shadow-lg h-[300px] md:h-[450px]">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                        </div>
                    </div>

                    {/* Product Details right side */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {product.category}
                            </span>
                            <div className="flex items-center text-yellow-500 text-sm font-bold gap-1">
                                <Star size={16} fill="currentColor" /> 4.5 (200+ Reviews)
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4 leading-tight">{product.name}</h1>

                        <div className="text-3xl font-bold text-primary mb-6">₹{product.price} <span className="text-lg text-gray-400 font-normal line-through ml-2">₹{product.price + 50}</span> <span className="text-green-600 text-sm font-bold ml-2">15% OFF</span></div>

                        <p className="text-gray-600 leading-relaxed mb-8 border-b border-gray-100 pb-8">
                            {product.description}. Prepared fresh daily with premium ingredients. Perfect for any time of the day.
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex gap-4 items-center">
                                {/* Quantity Selector */}
                                <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden bg-gray-50">
                                    <button
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="px-4 py-3 hover:bg-gray-200 transition text-secondary"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="px-4 py-3 font-bold min-w-[3rem] text-center text-lg">{qty}</span>
                                    <button
                                        onClick={() => setQty(qty + 1)}
                                        className="px-4 py-3 hover:bg-gray-200 transition text-secondary"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <span className="text-sm text-green-600 font-bold flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                                    <Truck size={14} /> Free Delivery
                                </span>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-primary hover:bg-accent text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={24} /> Add to Cart - ₹{product.price * qty}
                            </button>
                        </div>

                        {/* Additional Info / Tags */}
                        <div className="mt-8 flex gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span>Pure Veg</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                <span>Best Seller</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Related Products Section (8 Items) */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-secondary mb-8">You Might Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.slice(0, 8).map((p) => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Complete Your Meal Section (Display items from a different category, e.g., Cool Drinks) */}
                <div className="mt-16 mb-16">
                    <h2 className="text-3xl font-bold text-secondary mb-2">Complete Your Meal</h2>
                    <p className="text-gray-500 mb-8">Pair your food with these refreshing drinks and sides.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products
                            .filter(p => (p.category === 'Cool Drinks' || p.category === 'Starters') && p._id !== product._id)
                            .slice(0, 8)
                            .map((p) => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetailsPage;

