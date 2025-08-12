import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { mockOrders } from '../data/orders';

export default function Orders() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
          <p className="text-gray-600 text-sm">Track your recent purchases and their status</p>
        </div>

        {!isAuthenticated ? (
          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-gray-700 mb-4">Please sign in to view your orders.</p>
            <Link to="/login" className="btn-primary">Sign In</Link>
          </div>
        ) : mockOrders.length === 0 ? (
          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-gray-700 mb-4">You have no orders yet.</p>
            <Link to="/products" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border shadow-sm p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b pb-4 mb-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Order</div>
                    <div className="font-semibold text-gray-900">{order.id}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Date</div>
                    <div className="text-gray-900">{new Date(order.date).toLocaleDateString()}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Status</div>
                    <span
                      className={
                        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ' +
                        (order.status === 'Delivered'
                          ? 'bg-green-50 text-green-700 ring-green-600/20'
                          : order.status === 'Shipped'
                          ? 'bg-blue-50 text-blue-700 ring-blue-600/20'
                          : order.status === 'Processing'
                          ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                          : 'bg-gray-50 text-gray-700 ring-gray-600/20')
                      }
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="font-semibold text-gray-900">${order.total.toFixed(2)}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-600">Qty {item.quantity}</div>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex justify-end gap-2">
                  <Link to={`/order/${order.id}`} className="btn-secondary">View details</Link>
                  {order.trackingNumber && (
                    <Link to={`/track-package/${order.trackingNumber}`} className="btn-primary">
                      {order.status !== 'Delivered' ? 'Track package' : 'Delivery info'}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


