export type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  sku: string;
};

export type Order = {
  id: string;
  date: string; // ISO
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  total: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  shippingMethod: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
};

export const mockOrders: Order[] = [
  {
    id: 'ORD-20250112-001',
    date: '2025-01-12',
    status: 'Delivered',
    items: [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        quantity: 1,
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
        sku: 'WH-001-BLK',
      },
    ],
    total: 89.99,
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    paymentMethod: 'Visa ending in 1234',
    shippingMethod: 'Standard Shipping',
    subtotal: 89.99,
    shippingCost: 0,
    tax: 0,
    trackingNumber: 'TRK123456799'
  },
  {
    id: 'ORD-20250120-014',
    date: '2025-01-20',
    status: 'Shipped',
    items: [
      {
        id: 2,
        name: 'Smart Fitness Watch',
        quantity: 1,
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
        sku: 'SW-200',
      },
      {
        id: 3,
        name: 'Portable Bluetooth Speaker',
        quantity: 1,
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
        sku: 'SP-310',
      },
    ],
    total: 259.98,
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    paymentMethod: 'Visa ending in 1234',
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2025-01-25',
    shippingMethod: 'Express Shipping',
    subtotal: 259.98,
    shippingCost: 15.99,
    tax: 20.80,
  },
];

export function getOrderById(orderId: string): Order | null {
  return mockOrders.find((order) => order.id === orderId) || null;
}

export function getOrdersByStatus(status: Order['status']): Order[] {
  return mockOrders.filter((order) => order.status === status);
}
