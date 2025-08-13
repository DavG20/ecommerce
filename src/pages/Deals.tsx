import { products } from '../data/products';
import { FireIcon, TagIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';
import ProductToolbar, { type FilterOption, type ViewMode } from '../components/ProductToolbar';
import { useProductQuery, type SortKey } from '../hooks/useProductQuery';

export default function Deals() {
  const {
    results,
    filterBy,
    setFilterBy,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
  } = useProductQuery(products, {
    dealsOnly: true,
    categoryFromUrl: null,
    initialFilter: 'all',
    initialSort: 'discount',
    initialView: 'grid',
    initialSearch: '',
  });

  const discounts = results.map((p) => Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100));
  const savings = results.map((p) => p.originalPrice - p.price);
  const avgDiscount = results.length > 0 ? Math.round(discounts.reduce((s, d) => s + d, 0) / results.length) : 0;
  const maxDiscount = results.length > 0 ? Math.max(...discounts) : 0;
  const maxSavings = results.length > 0 ? Math.max(...savings) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FireIcon className="h-12 w-12 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-900">Hot Deals</h1>
          </div>
          <p className="text-xl text-gray-600">Limited time offers on your favorite products</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{results.length}</div>
            <div className="text-gray-600">Active Deals</div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{maxDiscount}</div>
            <div className="text-gray-600">Max Discount %</div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">${maxSavings.toFixed(2)}</div>
            <div className="text-gray-600">Max Savings</div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{avgDiscount}</div>
            <div className="text-gray-600">Avg Discount %</div>
          </div>
        </div>

        <ProductToolbar
          filterBy={filterBy as FilterOption}
          onFilterChange={setFilterBy}
          sortBy={sortBy}
          onSortChange={(v) => setSortBy(v as SortKey)}
          viewMode={viewMode as ViewMode}
          onViewModeChange={setViewMode}
          sortOptions={[
            { label: 'Highest Discount', value: 'discount' },
            { label: 'Price: Low to High', value: 'price-low' },
            { label: 'Price: High to Low', value: 'price-high' },
            { label: 'Highest Rating', value: 'rating' },
            { label: 'Newest First', value: 'newest' },
          ]}
          showSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Deals Grid/List */}
        {results.length === 0 ? (
          <div className="text-center py-12">
            <TagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later for new offers.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                showDiscountBadge
                showLimitedBadge
                showSavings
                showViewDetailsButton
              />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Don't Miss Out!</h2>
            <p className="text-lg mb-6 opacity-90">
              Subscribe to our newsletter and be the first to know about exclusive deals and flash sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
