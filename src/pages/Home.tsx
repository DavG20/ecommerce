import { Link } from 'react-router-dom';
import { StarIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { products as allProducts } from '../data/products';

const Home = () => {
  const products = allProducts;

  const getCategoryCount = (categoryName: string) => {
    return products.filter((product) => product.category === categoryName).length;
  };

  const categories = [
    { name: 'Electronics', icon: '📱', count: getCategoryCount('Electronics') },
    { name: 'Fashion', icon: '👕', count: getCategoryCount('Fashion') },
    { name: 'Home & Garden', icon: '🏠', count: getCategoryCount('Home & Garden') },
    { name: 'Sports', icon: '⚽', count: getCategoryCount('Sports') },
    { name: 'Books', icon: '📚', count: getCategoryCount('Books') },
    { name: 'Toys', icon: '🧸', count: getCategoryCount('Toys') },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Products</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600">
              Shop the latest trends with unbeatable prices and fast delivery
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Shop Now
              </Link>
              <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="group text-center p-6 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="flex items-center text-primary-600 hover:text-primary-700 font-semibold">
              View All
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-primary-600">${product.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                    </div>
                    <button className="btn-primary text-sm">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


