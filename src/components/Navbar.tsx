import { Link } from 'react-router-dom';
import { ShoppingCartIcon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/useCart';

const Navbar = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBagIcon className="h-8 w-8 text-gray-900" />
            <h1 className="text-2xl font-bold text-gray-900">Hulegeb</h1>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
              Products
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
              Categories
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
              Deals
            </Link>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="btn-primary">Sign In</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


