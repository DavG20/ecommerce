import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/useCart';
import AddToCartIcon from '../assets/cart-plus.svg';
import type { Product } from '../data/products';

export type ProductCardProps = {
  product: Product;
  viewMode?: 'grid' | 'list';
  showDiscountBadge?: boolean;
  showLimitedBadge?: boolean;
  showSavings?: boolean;
  showCategoryBadgeOnList?: boolean;
  showViewDetailsButton?: boolean;
};

function getDiscountPercentage(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

function getSavingsAmount(originalPrice: number, currentPrice: number): number {
  return Math.max(0, originalPrice - currentPrice);
}

export default function ProductCard({
  product,
  viewMode = 'grid',
  showDiscountBadge = false,
  showLimitedBadge = false,
  showSavings = false,
  showCategoryBadgeOnList = false,
  showViewDetailsButton = false,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const discountPercent = getDiscountPercentage(product.originalPrice, product.price);
  const hasDiscount = discountPercent > 0;

  return (
    <div
      className={
        viewMode === 'grid'
          ? 'bg-white rounded-lg shadow-md overflow-visible hover:shadow-lg transition-shadow'
          : 'bg-white rounded-lg shadow-sm p-4 flex gap-4'
      }
    >
      <div className={viewMode === 'grid' ? 'relative aspect-square overflow-hidden rounded-lg' : 'relative w-24 h-24 flex-shrink-0'}>
        <img
          src={product.image}
          alt={product.name}
          className={viewMode === 'grid' ? 'w-full h-full object-cover' : 'w-24 h-24 object-cover rounded-lg'}
        />
        {showDiscountBadge && hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discountPercent}%
          </div>
        )}
        {showLimitedBadge && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Limited
          </div>
        )}
      </div>

      <div className={viewMode === 'grid' ? 'p-4' : 'flex-1'}>
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="hover:text-primary-600 transition-colors">
            <h3 className="font-semibold text-gray-800">{product.name}</h3>
          </Link>
          {viewMode === 'list' && showCategoryBadgeOnList && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{product.category}</span>
          )}
        </div>

        <div className="flex items-center mb-2">
          <div className="flex items-center group relative">
            {[...Array(5)].map((_, i) => {
              const fullStars = Math.floor(product.rating);
              const isHalf = i === fullStars && product.rating % 1 >= 0.5;
              return (
                <div key={i} className="relative w-4 h-4">
                  <StarIcon className="text-gray-300 absolute w-4 h-4" />
                  {i < fullStars && <StarIcon className="text-yellow-400 absolute w-4 h-4" />}
                  {isHalf && (
                    <div className="absolute overflow-hidden w-2 h-4">
                      <StarIcon className="text-yellow-400 w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Rating: {product.rating}/5
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary-600">${product.price.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
            )}
            {showSavings && hasDiscount && (
              <div className="text-sm text-green-600 font-medium">
                Save ${getSavingsAmount(product.originalPrice, product.price).toFixed(2)}!
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {showViewDetailsButton && (
              <Link to={`/product/${product.id}`} className="btn-secondary py-2 px-3 text-sm">
                View Details
              </Link>
            )}
            <button
              className="relative group text-sm text-primary-600 hover:text-primary-700 p-1 rounded-full"
              onClick={() => addToCart(product as any)}
              aria-label="Add to cart"
            >
              <img src={AddToCartIcon} alt="Add to Cart" className="h-6 w-6" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs sm:text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10 group-focus:opacity-0">
                Add to Cart
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
