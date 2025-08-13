import { FunnelIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { Squares2X2Icon, ListBulletIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useId } from 'react';

export type FilterOption = 'all' | 'electronics' | 'fashion' | 'home & garden' | 'sports' | 'books' | 'toys';
export type ViewMode = 'grid' | 'list';
export type SortOptionItem = { label: string; value: string };

export type ProductToolbarProps = {
  filterBy: FilterOption;
  onFilterChange: (value: FilterOption) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortOptions: SortOptionItem[];
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
};

export default function ProductToolbar({
  filterBy,
  onFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  sortOptions,
  showSearch = false,
  searchQuery = '',
  onSearchChange,
}: ProductToolbarProps) {
  const filterId = useId();
  const sortId = useId();
  const searchId = useId();

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <label htmlFor={filterId} className="text-sm font-medium text-gray-700">Filter:</label>
          </div>
          <select
            id={filterId}
            value={filterBy}
            onChange={(e) => onFilterChange(e.target.value as FilterOption)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home & garden">Home & Garden</option>
            <option value="sports">Sports</option>
            <option value="books">Books</option>
            <option value="toys">Toys</option>
          </select>
        </div>

        {showSearch && (
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                id={searchId}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-400" />
            <label htmlFor={sortId} className="text-sm font-medium text-gray-700">Sort:</label>
          </div>
          <select
            id={sortId}
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <div className="flex border border-gray-300 rounded-md relative">
            <div className={`absolute top-0 left-0 w-1/2 h-full bg-primary-600 rounded-l-md transition-all duration-300 ease-in-out ${viewMode === 'list' ? 'translate-x-full rounded-l-none rounded-r-md' : ''}`}></div>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`relative p-2 w-1/2 transition-all duration-400 ease-in-out ${viewMode === 'grid' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
              aria-pressed={viewMode === 'grid'}
              aria-label="Grid view"
            >
              <Squares2X2Icon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`relative p-2 w-1/2 transition-all duration-400 ease-in-out ${viewMode === 'list' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
              aria-pressed={viewMode === 'list'}
              aria-label="List view"
            >
              <ListBulletIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
