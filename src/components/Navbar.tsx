import { Link, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { ShoppingCartIcon, MagnifyingGlassIcon, ShoppingBagIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

const Navbar = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
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
            <Link to="/deals" className="text-gray-700 hover:text-primary-600 transition-colors">
              Deals
            </Link>
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
            {isAuthenticated ? (
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hover:bg-gray-100">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary-600 to-primary-400 text-white flex items-center justify-center font-semibold uppercase">
                    {(user?.name || user?.email || '?').charAt(0)}
                  </div>
                  <span className="hidden lg:block max-w-[96px] truncate text-xs text-gray-700">{user?.name || (user?.email?.split('@')[0] ?? '')}</span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                </MenuButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-lg border border-gray-200 bg-white shadow-lg focus:outline-none">
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">{user?.name || 'Account'}</p>
                      <p className="mt-0.5 text-xs text-gray-600 truncate">{user?.email}</p>
                    </div>
                    <div className="my-1 h-px bg-gray-100" />
                    <div className="py-1">
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => navigate('/profile')}
                            className={`w-full px-4 py-2 text-left text-sm ${active ? 'bg-gray-50' : ''}`}
                          >
                            Profile
                          </button>
                        )}
                      </MenuItem>
                    </div>
                    <div className="my-1 h-px bg-gray-100" />
                    <div className="py-1">
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              logout();
                              navigate('/');
                            }}
                            className={`w-full px-4 py-2 text-left text-sm text-red-600 ${active ? 'bg-red-50' : ''}`}
                          >
                            Logout
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>
            ) : (
              <Link to="/login" className="btn-primary">Sign In</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


