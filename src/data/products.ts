export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  features: string[];
  colors: string[];
  inStock: boolean;
  sku: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviews: 128,
    category: 'Electronics',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop',
    ],
    description:
      'Experience crystal-clear sound with these premium wireless Bluetooth headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design for extended listening sessions.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Quick charge (10 min = 5 hours)',
      'Bluetooth 5.0',
      'Built-in microphone',
      'Foldable design',
    ],
    colors: ['Black', 'White', 'Blue'],
    inStock: true,
    sku: 'WH-001-BLK',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.3,
    reviews: 89,
    category: 'Electronics',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1730127329554-70ed445592aa?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop',
    ],
    description:
      'Track your workouts, heart rate, sleep, and more with a bright display and week-long battery life.',
    features: [
      'Heart rate monitoring',
      'Sleep tracking',
      'GPS built-in',
      'Water resistant',
      '7-day battery',
    ],
    colors: ['Black', 'Silver'],
    inStock: true,
    sku: 'SW-200',
  },
  {
    id: 3,
    name: 'Portable Bluetooth Speaker',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.7,
    reviews: 156,
    category: 'Electronics',
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop',
    ],
    description:
      'Compact speaker with deep bass and waterproof design. Perfect for travel and outdoor use.',
    features: [
      'IPX7 waterproof',
      '10-hour battery',
      'Hands-free calling',
      'Stereo pairing',
    ],
    colors: ['Black', 'Blue'],
    inStock: true,
    sku: 'SP-310',
  },
  {
    id: 4,
    name: 'Wireless Charging Pad',
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.2,
    reviews: 67,
    category: 'Electronics',
    image:
      'https://images.unsplash.com/photo-1737882171913-f4ced0ce73d8?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1737882171913-f4ced0ce73d8?w=600&h=600&fit=crop',
    ],
    description:
      'Fast wireless charging for compatible phones and earbuds in a slim, non-slip form factor.',
    features: ['Qi compatible', 'Fast charge', 'LED indicator'],
    colors: ['Black'],
    inStock: true,
    sku: 'WC-015',
  },
  {
    id: 5,
    name: 'Premium Cotton T-Shirt',
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.1,
    reviews: 203,
    category: 'Fashion',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581783349389-ff41f40a7415?w=600&h=600&fit=crop',
    ],
    description:
      'Soft, breathable cotton tee with a classic fit for everyday comfort.',
    features: ['100% cotton', 'Pre-shrunk', 'Classic fit'],
    colors: ['White', 'Black', 'Navy'],
    inStock: true,
    sku: 'TS-500',
  },
  {
    id: 6,
    name: 'Running Shoes',
    price: 79.99,
    originalPrice: 119.99,
    rating: 4.6,
    reviews: 89,
    category: 'Sports',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1695073621086-aa692bc32a3d?w=700&h=600&fit=crop',
    ],
    description:
      'Lightweight running shoes with responsive cushioning and breathable upper.',
    features: ['Breathable mesh', 'Cushioned midsole', 'Durable outsole'],
    colors: ['Black', 'Red'],
    inStock: true,
    sku: 'RS-901',
  },
  {
    id: 7,
    name: 'Coffee Maker',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.4,
    reviews: 156,
    category: 'Home & Garden',
    image:
      'https://images.unsplash.com/photo-1608354580875-30bd4168b351?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1608354580875-30bd4168b351?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1461988279488-1dac181a78f9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&h=600&fit=crop',
    ],
    description:
      'Brew rich coffee with programmable timer and keep-warm function.',
    features: ['Programmable', 'Auto shut-off', 'Thermal carafe'],
    colors: ['Black', 'Steel'],
    inStock: true,
    sku: 'CM-150',
  },
  {
    id: 8,
    name: 'Gaming Mouse',
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviews: 234,
    category: 'Electronics',
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=600&h=600&fit=crop',
    ],
    description:
      'Ergonomic gaming mouse with adjustable DPI and RGB lighting.',
    features: ['Adjustable DPI', 'RGB lighting', 'Programmable buttons'],
    colors: ['Black'],
    inStock: true,
    sku: 'GM-880',
  },
  {
    id: 9,
    name: 'Ergonomic Office Chair',
    price: 229.99,
    originalPrice: 279.99,
    rating: 4.4,
    reviews: 98,
    category: 'Home & Garden',
    image:
      'https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587655100676-1c72a2af20d0?w=600&h=600&fit=crop',
    ],
    description:
      'Supportive chair with lumbar support and breathable mesh back.',
    features: ['Lumbar support', 'Adjustable height', 'Tilt lock'],
    colors: ['Black', 'Gray'],
    inStock: true,
    sku: 'OC-220',
  },
  {
    id: 10,
    name: 'Hardcover Notebook',
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.2,
    reviews: 54,
    category: 'Books',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=600&fit=crop',
    ],
    description:
      'Durable notebook with thick pages, ideal for journaling and notes.',
    features: ['Hardcover', '200 pages', 'Thick paper'],
    colors: ['Black', 'Blue'],
    inStock: true,
    sku: 'NB-010',
  },
  {
    id: 11,
    name: 'Building Blocks Set',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviews: 312,
    category: 'Toys',
    image:
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=600&fit=crop',
    ],
    description:
      'Creative building set to spark imagination and fine motor skills.',
    features: ['300+ pieces', 'Non-toxic', 'Storage box included'],
    colors: ['Multi'],
    inStock: true,
    sku: 'BB-400',
  },
  {
    id: 12,
    name: 'Leather Wallet',
    price: 44.99,
    originalPrice: 59.99,
    rating: 4.3,
    reviews: 76,
    category: 'Fashion',
    image:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1620109176813-e91290f6c795?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=600&fit=crop',
    ],
    description:
      'Slim, genuine leather wallet with RFID-blocking and multiple card slots.',
    features: ['RFID blocking', 'Genuine leather', 'Slim profile'],
    colors: ['Brown', 'Black'],
    inStock: true,
    sku: 'LW-012',
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProductById(productId: number | string): Product | null {
  const numericId = typeof productId === 'string' ? parseInt(productId, 10) : productId;
  return products.find((p) => p.id === numericId) || null;
}

export function getRelatedProducts(
  category: string,
  excludeId: number,
  limit = 4,
): Product[] {
  return products.filter((p) => p.category === category && p.id !== excludeId).slice(0, limit);
}


