import { useMemo, useState } from 'react';
import type { Product } from '../data/products';
import type { FilterOption, ViewMode } from '../components/ProductToolbar';

export type SortKey = 'featured' | 'discount' | 'price-low' | 'price-high' | 'rating' | 'newest';

export type UseProductQueryOptions = {
  dealsOnly?: boolean;
  categoryFromUrl?: string | null;
  initialFilter?: FilterOption;
  initialSort?: SortKey;
  initialView?: ViewMode;
  initialSearch?: string;
};

export function useProductQuery(
  baseProducts: Product[],
  {
    dealsOnly = false,
    categoryFromUrl = null,
    initialFilter = 'all',
    initialSort = 'featured',
    initialView = 'grid',
    initialSearch = '',
  }: UseProductQueryOptions = {},
) {
  const [filterBy, setFilterBy] = useState<FilterOption>(initialFilter);
  const [sortBy, setSortBy] = useState<SortKey>(initialSort);
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

  const results = useMemo(() => {
    let working = baseProducts;

    // URL/category pre-filter (case-insensitive)
    if (categoryFromUrl) {
      const fromUrl = categoryFromUrl.toLowerCase();
      working = working.filter((p) => p.category.toLowerCase() === fromUrl);
    }

    // Deals-only filter
    if (dealsOnly) {
      working = working.filter((p) => p.originalPrice > p.price);
    }

    // Toolbar category filter
    if (filterBy !== 'all') {
      working = working.filter((p) => p.category.toLowerCase() === filterBy);
    }

    // Search filter across name and category
    const trimmed = searchQuery.trim().toLowerCase();
    if (trimmed.length > 0) {
      working = working.filter(
        (p) => p.name.toLowerCase().includes(trimmed) || p.category.toLowerCase().includes(trimmed),
      );
    }

    // Sorting
    const arr = [...working];
    switch (sortBy) {
      case 'discount':
        arr.sort((a, b) => {
          const dA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
          const dB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
          return dB - dA;
        });
        break;
      case 'price-low':
        arr.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        arr.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        arr.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        arr.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
      default:
        break;
    }

    return arr;
  }, [baseProducts, categoryFromUrl, dealsOnly, filterBy, searchQuery, sortBy]);

  return {
    results,
    filterBy,
    setFilterBy,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
  } as const;
}
