import { Link } from 'react-router-dom';
import { TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/useCart';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const updateItemQuantity = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const removeItem = (id: number) => {
    removeFromCart(id);
  };

  const subtotal = getCartTotal();
  const originalTotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const savings = originalTotal - subtotal;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link to="/" className="flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-primary-600">${item.price}</span>
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">-</button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">+</button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-700 p-2">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>- ${savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : 'font-semibold'}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex gap-2">
                  <input type="text" placeholder="Promo code" className="flex-1 input-field" />
                  <button className="btn-secondary whitespace-nowrap">Apply</button>
                </div>
              </div>
              <button className="w-full btn-primary text-lg py-3 mb-4">Proceed to Checkout</button>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">We accept</p>
                <div className="flex justify-center gap-2">
                  <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">VISA</div>
                  <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">MC</div>
                  <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">AMEX</div>
                  <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">PP</div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">🔒 Secure checkout powered by SSL encryption</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">30-day return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recently Viewed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 4, name: 'Wireless Charging Pad', price: 34.99, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop' },
              { id: 5, name: 'Premium Cotton T-Shirt', price: 24.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop' },
              { id: 6, name: 'Running Shoes', price: 79.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop' },
              { id: 7, name: 'Coffee Maker', price: 149.99, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop' },
            ].map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <span className="text-lg font-bold text-primary-600">${product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


