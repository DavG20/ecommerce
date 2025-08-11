import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarIcon, HeartIcon, ShareIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/useCart';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = id ? getProductById(id) : null;
  const relatedProducts = product ? getRelatedProducts(product.category, product.id, 4) : [];

  const reviews = [
    { id: 1, user: 'John D.', rating: 5, date: '2024-01-15', comment: 'Excellent sound quality and very comfortable for long listening sessions. Battery life is impressive!' },
    { id: 2, user: 'Sarah M.', rating: 4, date: '2024-01-10', comment: 'Great headphones, but the noise cancellation could be better. Overall very satisfied with the purchase.' },
    { id: 3, user: 'Mike R.', rating: 5, date: '2024-01-08', comment: 'Perfect for my daily commute. The foldable design makes it easy to carry around.' },
  ];

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-600 mb-6">The product you are looking for does not exist or may have been removed.</p>
          <Link to="/products" className="btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/products" className="hover:text-primary-600">Products</Link></li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-4">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button key={index} onClick={() => setSelectedImage(index)} className={`border-2 rounded-lg overflow-hidden ${selectedImage === index ? 'border-primary-500' : 'border-gray-200'}`}>
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                </div>
                <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary-600">${product.price}</span>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">{discount}% OFF</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Color:</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button key={color} className="px-4 py-2 border border-gray-300 rounded-md hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Quantity:</h3>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">-</button>
                <span className="w-16 text-center font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">+</button>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <button onClick={() => addToCart(product as any)} className="flex-1 btn-primary text-lg py-3">Add to Cart</button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <HeartIcon className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ShareIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <TruckIcon className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-gray-900">Free Shipping</span>
              </div>
              <p className="text-sm text-gray-600">Free standard shipping on orders over $50</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheckIcon className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-gray-900">30-Day Return</span>
              </div>
              <p className="text-sm text-gray-600">30-day money-back guarantee</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{relatedProduct.name}</h3>
                  <span className="text-lg font-bold text-primary-600">${relatedProduct.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


