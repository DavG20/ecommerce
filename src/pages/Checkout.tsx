import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import { ArrowLeftIcon, CreditCardIcon, MapPinIcon, TruckIcon, CheckIcon } from '@heroicons/react/24/outline';

type CheckoutStep = 'shipping' | 'payment' | 'review';

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');

  const { cartItems, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const cartTotal = getCartTotal();
  const shippingCost = shippingMethod === 'express' ? 15.99 : 0;
  const tax = cartTotal * 0.08; // 8% tax
  const total = cartTotal + shippingCost + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('review');
  };

  const handlePlaceOrder = () => {
    // Here you would typically send the order to your backend
    // For now, we'll just clear the cart and redirect
    clearCart();
    navigate('/orders');
  };

  const renderShippingStep = () => (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPinIcon className="h-6 w-6 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
      </div>
      
      <form onSubmit={handleShippingSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              required
              value={shippingInfo.firstName}
              onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              required
              value={shippingInfo.lastName}
              onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={shippingInfo.email}
              onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              required
              value={shippingInfo.phone}
              onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            required
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              required
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              required
              value={shippingInfo.state}
              onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
            <input
              type="text"
              required
              value={shippingInfo.zipCode}
              onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" className="w-full btn-primary py-3">
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <CreditCardIcon className="h-6 w-6 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>
      </div>
      
      <form onSubmit={handlePaymentSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
          <input
            type="text"
            required
            placeholder="1234 5678 9012 3456"
            value={paymentInfo.cardNumber}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
          <input
            type="text"
            required
            value={paymentInfo.cardholderName}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
            <select
              required
              value={paymentInfo.expiryMonth}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryMonth: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">MM</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                  {String(i + 1).padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              required
              value={paymentInfo.expiryYear}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryYear: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">YYYY</option>
              {Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input
              type="text"
              required
              placeholder="123"
              maxLength={4}
              value={paymentInfo.cvv}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" className="w-full btn-primary py-3">
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  );

  const renderReviewStep = () => (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <CheckIcon className="h-6 w-6 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">Review Your Order</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Shipping Information</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-900">{shippingInfo.firstName} {shippingInfo.lastName}</p>
            <p className="text-gray-600">{shippingInfo.address}</p>
            <p className="text-gray-600">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
            <p className="text-gray-600">{shippingInfo.country}</p>
            <p className="text-gray-600">{shippingInfo.email} | {shippingInfo.phone}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-900">{paymentInfo.cardholderName}</p>
            <p className="text-gray-600">Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
            <p className="text-gray-600">Expires {paymentInfo.expiryMonth}/{paymentInfo.expiryYear}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Shipping Method</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-900">
              {shippingMethod === 'express' ? 'Express Shipping (2-3 business days)' : 'Standard Shipping (5-7 business days)'}
            </p>
          </div>
        </div>

        <div className="pt-4">
          <button onClick={handlePlaceOrder} className="w-full btn-primary py-3 text-lg">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigate('/cart')} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${currentStep === 'shipping' ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === 'shipping' ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-300'}`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Shipping</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep === 'payment' || currentStep === 'review' ? 'bg-primary-600' : 'bg-gray-300'}`} />
            <div className={`flex items-center ${currentStep === 'payment' ? 'text-primary-600' : currentStep === 'review' ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === 'payment' ? 'border-primary-600 bg-primary-600 text-white' : currentStep === 'review' ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-300'}`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep === 'review' ? 'bg-primary-600' : 'bg-gray-300'}`} />
            <div className={`flex items-center ${currentStep === 'review' ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === 'review' ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-300'}`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 'shipping' && renderShippingStep()}
            {currentStep === 'payment' && renderPaymentStep()}
            {currentStep === 'review' && renderReviewStep()}
          </div>

          {/* Sidebar - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-lg text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Method Selection */}
            {currentStep === 'shipping' && (
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-3">Shipping Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Standard Shipping</div>
                      <div className="text-sm text-gray-600">5-7 business days</div>
                      <div className="text-sm text-gray-600">Free</div>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Express Shipping</div>
                      <div className="text-sm text-gray-600">2-3 business days</div>
                      <div className="text-sm text-gray-600">$15.99</div>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
