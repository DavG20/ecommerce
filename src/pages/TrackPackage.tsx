import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { mockOrders } from '../data/orders';
import { ArrowLeftIcon, TruckIcon, CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type TrackingEvent = {
  id: string;
  status: string;
  location: string;
  timestamp: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
};

export default function TrackPackage() {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!trackingNumber) {
    navigate('/orders');
    return null;
  }

  // Find order by tracking number
  const order = mockOrders.find(order => order.trackingNumber === trackingNumber);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tracking Number Not Found</h1>
          <p className="text-gray-600 mb-4">The tracking number you're looking for doesn't exist.</p>
          <Link to="/orders" className="btn-primary">Back to Orders</Link>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  // Mock tracking events based on order status
  const getTrackingEvents = (): TrackingEvent[] => {
    const baseEvents: TrackingEvent[] = [
      {
        id: '1',
        status: 'Order Placed',
        location: 'Online Store',
        timestamp: order.date,
        description: 'Your order was successfully placed',
        icon: CheckCircleIcon,
        iconColor: 'text-green-500',
      },
      {
        id: '2',
        status: 'Order Confirmed',
        location: 'Warehouse',
        timestamp: new Date(new Date(order.date).getTime() + 24 * 60 * 60 * 1000).toISOString(),
        description: 'Your order was confirmed and prepared for shipment',
        icon: CheckCircleIcon,
        iconColor: 'text-green-500',
      },
    ];

    if (order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered') {
      baseEvents.push({
        id: '3',
        status: 'Processing',
        location: 'Warehouse',
        timestamp: new Date(new Date(order.date).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Your order was processed and carefully packed',
        icon: ClockIcon,
        iconColor: 'text-blue-500',
      });
    }

    if (order.status === 'Shipped' || order.status === 'Delivered') {
      baseEvents.push({
        id: '4',
        status: 'Shipped',
        location: 'Shipping Center',
        timestamp: new Date(new Date(order.date).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        description: `Your package was shipped via ${order.shippingMethod}`,
        icon: TruckIcon,
        iconColor: 'text-blue-500',
      });
    }

    if (order.status === 'Delivered') {
      baseEvents.push({
        id: '5',
        status: 'Delivered',
        location: order.shippingAddress.city,
        timestamp: order.estimatedDelivery || new Date().toISOString(),
        description: 'Your package was successfully delivered to your address',
        icon: CheckCircleIcon,
        iconColor: 'text-green-500',
      });
    }

    return baseEvents;
  };

  const trackingEvents = getTrackingEvents();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/orders" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Track Your Package</h1>
            <p className="text-gray-600 mt-2">Tracking Number: {trackingNumber}</p>
          </div>
        </div>

        {/* Package Info */}
        <div className="bg-white rounded-xl border shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Package Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Method:</span>
                  <span className="font-medium">{order.shippingMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    order.status === 'Delivered' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                    order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                    order.status === 'Processing' ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' :
                    'bg-gray-50 text-gray-700 ring-gray-600/20'
                  }`}>
                    {order.status}
                  </span>
                </div>
                {order.estimatedDelivery && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <div>{order.shippingAddress.name}</div>
                <div>{order.shippingAddress.street}</div>
                <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</div>
                <div>{order.shippingAddress.country}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Tracking History</h2>
          <div className="relative">
            {trackingEvents.map((event, index) => (
              <div key={event.id} className="relative flex items-start gap-4">
                {/* Timeline line */}
                {index < trackingEvents.length - 1 && (
                  <div className="absolute left-6 top-8 w-0.5 h-16 bg-gray-200" />
                )}
                
                {/* Icon */}
                <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center ${event.iconColor}`}>
                  <event.icon className="h-6 w-6" />
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900">{event.status}</h3>
                    <span className="text-sm text-gray-500">{event.location}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 text-center">
          <Link to="/orders" className="btn-secondary mr-4">Back to Orders</Link>
          <Link to={`/order/${order.id}`} className="btn-primary">View Order Details</Link>
        </div>
      </div>
    </div>
  );
}
