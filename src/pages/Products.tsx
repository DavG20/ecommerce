import ProductCard from '../components/ProductCard';
import ProductToolbar, { type FilterOption, type ViewMode } from '../components/ProductToolbar';
import { useProductQuery, type SortKey } from '../hooks/useProductQuery';
import { useSearchParams } from 'react-router-dom';
import { products as allProducts } from '../data/products';

export default function Products() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

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
  } = useProductQuery(allProducts, {
    dealsOnly: false,
    categoryFromUrl: selectedCategory,
    initialFilter: 'all',
    initialSort: 'featured',
    initialView: 'grid',
    initialSearch: '',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">
            {selectedCategory ? `Showing products in ${selectedCategory}` : 'Discover our amazing collection of products'}
          </p>
        </div>

        <ProductToolbar
          filterBy={filterBy as FilterOption}
          onFilterChange={setFilterBy}
          sortBy={sortBy}
          onSortChange={(v) => setSortBy(v as SortKey)}
          viewMode={viewMode as ViewMode}
          onViewModeChange={setViewMode}
          sortOptions={[
            { label: 'Featured', value: 'featured' },
            { label: 'Price: Low to High', value: 'price-low' },
            { label: 'Price: High to Low', value: 'price-high' },
            { label: 'Highest Rating', value: 'rating' },
            { label: 'Newest First', value: 'newest' },
          ]}
          showSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          {results.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              showCategoryBadgeOnList
              showViewDetailsButton={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


