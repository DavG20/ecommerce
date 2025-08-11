import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products as allProducts } from '../data/products';
import { StarIcon, FunnelIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/useCart';
import AddToCartIcon from '../assets/cart-plus.svg';

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const { addToCart } = useCart();
  const products = allProducts;

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Toys'];

  const handleCategoryClick = (category: string) => {
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const filteredProducts = selectedCategory ? products.filter((p) => p.category === selectedCategory) : products;

  const sortedProducts = (() => {
    const productsToSort = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return productsToSort.sort((a, b) => a.price - b.price);
      case 'price-high':
        return productsToSort.sort((a, b) => b.price - a.price);
      case 'rating':
        return productsToSort.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return productsToSort.sort((a, b) => b.id - a.id);
      case 'featured':
      default:
        return productsToSort;
    }
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">
            {selectedCategory ? `Showing products in ${selectedCategory}` : 'Discover our amazing collection of products'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <FunnelIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 text-sm border rounded-full transition-colors ${
                      selectedCategory === category || (!selectedCategory && category === 'All')
                        ? 'border-primary-500 text-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-primary-500 hover:text-primary-600'
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              <div className="flex border border-gray-300 rounded-md relative">
                <div className={`absolute top-0 left-0 w-1/2 h-full bg-primary-600 rounded-l-md transition-all duration-300 ease-in-out ${viewMode === 'list' ? 'translate-x-full rounded-l-none rounded-r-md' : ''}`}></div>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`relative p-2 w-1/2 transition-all duration-400 ease-in-out ${viewMode === 'grid' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`relative p-2 w-1/2 transition-all duration-400 ease-in-out ${viewMode === 'list' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          {sortedProducts.map((product) => (
            <div key={product.id} className={viewMode === 'grid' ? 'bg-white rounded-lg shadow-md overflow-visible hover:shadow-lg transition-shadow' : 'bg-white rounded-lg shadow-sm p-4 flex gap-4'}>
              <div className={viewMode === 'grid' ? 'aspect-square overflow-hidden rounded-lg' : ''}>
                <img src={product.image} alt={product.name} className={viewMode === 'grid' ? 'w-full h-full object-cover' : 'w-24 h-24 object-cover rounded-lg'} />
              </div>
              <div className={viewMode === 'grid' ? 'p-4' : 'flex-1'}>
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/product/${product.id}`} className="hover:text-primary-600 transition-colors">
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  </Link>
                  {viewMode === 'list' && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{product.category}</span>
                  )}
                </div>
                <div className="flex items-center mb-2">
                  <div className="flex items-center group relative">
                    {[...Array(5)].map((_, i) => {
                      const fullStars = Math.floor(product.rating);
                      const isHalf = i === fullStars && product.rating % 1 >= 0.5;
                      return (
                        <div key={i} className="relative w-4 h-4">
                          <StarIcon className="text-gray-300 absolute w-4 h-4" />
                          {i < fullStars && <StarIcon className="text-yellow-400 absolute w-4 h-4" />}
                          {isHalf && (
                            <div className="absolute overflow-hidden w-2 h-4">
                              <StarIcon className="text-yellow-400 w-4 h-4" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      Rating: {product.rating}/5
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary-600">${product.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="relative group text-sm text-primary-600 hover:text-primary-700 p-1 rounded-full" onClick={() => addToCart(product as any)}>
                      <img src={AddToCartIcon} alt="Add to Cart" className="h-6 w-6" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs sm:text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10 group-focus:opacity-0">
                        Add to Cart
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;


