import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { StoreContext } from '../context/StoreContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(StoreContext);

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 group flex flex-row sm:flex-col h-auto sm:h-full border border-gray-100">
            <Link to={`/product/${product._id}`} className="block overflow-hidden w-28 h-28 sm:w-full sm:h-48 flex-shrink-0">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
            </Link>
            <div className="p-3 sm:p-4 flex flex-col flex-1 min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider block mb-0.5 sm:mb-1">
                    {product.category}
                </span>
                <Link to={`/product/${product._id}`} className="block truncate">
                    <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2 text-text group-hover:text-primary transition truncate">{product.name}</h3>
                </Link>
                <p className="hidden sm:block text-text-light text-sm mb-4 line-clamp-2 h-10">
                    {product.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-base sm:text-xl font-bold text-secondary">₹{product.price}</span>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className="bg-primary text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-full font-bold hover:bg-accent transition shadow-sm text-xs sm:text-sm"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
