import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Search, Filter, ChevronDown, Check } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const ProductListingPage = () => {
    const { products, loading } = useContext(StoreContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Handle URL query params for category
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    // Define categories in a specific display order
    const orderedCategories = [
        'Cakes',
        'Pizza',
        'Burgers',
        'Starters',
        'Breads',
        'Sandwich',
        'Subs',
        'Pasta',
        'Noodles',
        'Salads',
        'Sweets',
        'Hot Drinks',
        'Cool Drinks'
    ];

    // Filter available categories based on loaded products
    const availableCategories = ['All', ...orderedCategories.filter(cat =>
        Array.isArray(products) && products.some(p => p.category === cat)
    )];

    // Determine which categories to display
    const categoriesToDisplay = selectedCategory === 'All'
        ? orderedCategories
        : [selectedCategory];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Sticky Header for Filters */}
            <div className="sticky top-[56px] md:top-[72px] z-40 bg-white shadow-sm py-2 md:py-4 mb-4 md:mb-8">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
                    <h1 className="text-2xl font-bold text-secondary hidden md:block">Our Menu</h1>

                    <div className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full md:w-auto">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search dishes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50"
                            />
                        </div>

                        {/* Custom Category Filter Dropdown */}
                        <div className="relative w-full md:w-64">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white flex items-center justify-between hover:border-primary hover:ring-2 hover:ring-primary/20 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <Filter className="absolute left-3 text-gray-400 group-hover:text-primary transition-colors" size={18} />
                                    <span className="ml-2 font-medium text-gray-700 group-hover:text-secondary truncate">{selectedCategory}</span>
                                </div>
                                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isFilterOpen && (
                                <div className="absolute top-full right-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 font-medium">
                                        {availableCategories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => {
                                                    setSelectedCategory(cat);
                                                    setIsFilterOpen(false);
                                                }}
                                                className={`w-full text-left px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${selectedCategory === cat ? 'bg-primary/5 text-primary' : 'text-gray-600'}`}
                                            >
                                                <span>{cat}</span>
                                                {selectedCategory === cat && <Check size={16} className="text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Backprop to close dropdown when clicking outside */}
                        {isFilterOpen && (
                            <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)}></div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20">
                {loading ? (
                    <div className="loader"></div>
                ) : (
                    <div className="space-y-16">
                        {categoriesToDisplay.map(category => {
                            // Filter products for this category and search term
                            const categoryProducts = products.filter(p =>
                                p.category === category &&
                                p.name.toLowerCase().includes(searchTerm.toLowerCase())
                            );

                            if (categoryProducts.length === 0) return null;

                            return (
                                <div key={category} id={category} className="scroll-mt-36">
                                    {/* Premium Category Header */}
                                    <div className="flex items-center justify-center gap-6 mb-10">
                                        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300 flex-grow max-w-[200px]"></div>
                                        <h2 className="text-4xl font-bold text-secondary tracking-wide">{category}</h2>
                                        <div className="h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300 flex-grow max-w-[200px]"></div>
                                    </div>

                                    {/* Product Grid with Premium Spacing */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                        {categoryProducts.map((product) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Empty State */}
                        {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                            <div className="text-center py-24">
                                <h3 className="text-xl text-gray-500">No dishes found. Try searching for something else!</h3>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductListingPage;
