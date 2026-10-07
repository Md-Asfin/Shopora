import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Star, X, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import { ProductGridSkeleton } from '../components/common/Skeleton';
import api from '../services/api';
import { BRAND } from '../config/brand';

const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({ page: 0, totalPages: 1, totalElements: 0 });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter states
  const categoryParam = searchParams.get('category') || '';
  const brandParam = searchParams.get('brand') || '';
  const queryParam = searchParams.get('q') || '';
  const dealParam = searchParams.get('deal') === 'true';
  const sortParam = searchParams.get('sort') || 'id';
  const sortDirParam = searchParams.get('sortDir') || 'desc';
  const pageParam = parseInt(searchParams.get('page') || '0', 10);
  const minPriceParam = searchParams.get('minPrice') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';
  const minRatingParam = searchParams.get('minRating') || '';
  const inStockParam = searchParams.get('inStock') || '';

  const [priceRange, setPriceRange] = useState(maxPriceParam || 100000);

  const categories = [
    { name: 'Electronics', count: 24 },
    { name: 'Fashion', count: 18 },
    { name: 'Home & Living', count: 12 },
    { name: 'Beauty', count: 10 },
    { name: 'Sports', count: 8 },
    { name: 'Books', count: 15 },
    { name: 'Toys', count: 6 },
    { name: 'Automotive', count: 4 },
  ];

  const brands = [
    { name: 'Apple', count: 8 },
    { name: 'Samsung', count: 6 },
    { name: 'OnePlus', count: 4 },
    { name: 'Xiaomi', count: 3 },
    { name: 'Google', count: 3 },
    { name: 'Sony', count: 5 },
    { name: 'Dell', count: 4 },
    { name: 'Nike', count: 6 },
  ];

  const [apiError, setApiError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setApiError(null);
      const params = new URLSearchParams();
      if (queryParam) params.append('q', queryParam);
      if (categoryParam) params.append('category', categoryParam);
      if (brandParam) params.append('brand', brandParam);
      if (minPriceParam) params.append('minPrice', minPriceParam);
      if (maxPriceParam) params.append('maxPrice', maxPriceParam);
      if (minRatingParam) params.append('minRating', minRatingParam);
      if (inStockParam) params.append('inStock', inStockParam);
      params.append('page', pageParam.toString());
      params.append('size', '12');
      params.append('sortBy', sortParam);
      params.append('sortDir', sortDirParam);

      const res = await api.get(`/products?${params.toString()}`);
      if (res.data) {
        setProducts(res.data.content || []);
        setPageData({
          page: res.data.page || 0,
          totalPages: res.data.totalPages || 1,
          totalElements: res.data.totalElements || 0,
        });
      }
    } catch (err) {
      console.error('Failed to fetch product list:', err);
      setApiError('Unable to connect to the product service. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryParam, brandParam, queryParam, dealParam, sortParam, sortDirParam, pageParam, minPriceParam, maxPriceParam, minRatingParam, inStockParam]);

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.set('page', '0'); // reset page
    setSearchParams(next);
  };

  const handleClearAll = () => {
    setSearchParams({});
    setPriceRange(100000);
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    const next = new URLSearchParams(searchParams);
    if (val === 'price_asc') {
      next.set('sort', 'price');
      next.set('sortDir', 'asc');
    } else if (val === 'price_desc') {
      next.set('sort', 'price');
      next.set('sortDir', 'desc');
    } else if (val === 'rating') {
      next.set('sort', 'rating');
      next.set('sortDir', 'desc');
    } else if (val === 'newest') {
      next.set('sort', 'releaseDate');
      next.set('sortDir', 'desc');
    } else {
      next.set('sort', 'id');
      next.set('sortDir', 'desc');
    }
    setSearchParams(next);
  };

  const activeSort = () => {
    if (sortParam === 'price' && sortDirParam === 'asc') return 'price_asc';
    if (sortParam === 'price' && sortDirParam === 'desc') return 'price_desc';
    if (sortParam === 'rating') return 'rating';
    if (sortParam === 'releaseDate') return 'newest';
    return 'featured';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Left Filter Sidebar + Right Product Listing matching Screen 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-white dark:bg-[#111827] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm h-fit sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleClearAll}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                Category
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {categories.map((c) => (
                  <label key={c.name} className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 cursor-pointer hover:text-indigo-600">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={categoryParam.toLowerCase() === c.name.toLowerCase()}
                        onChange={(e) => updateFilter('category', e.target.checked ? c.name : '')}
                        className="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                      />
                      <span>{c.name}</span>
                    </div>
                    <span className="text-gray-400">({c.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                Brand
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {brands.map((b) => (
                  <label key={b.name} className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 cursor-pointer hover:text-indigo-600">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={brandParam.toLowerCase() === b.name.toLowerCase()}
                        onChange={(e) => updateFilter('brand', e.target.checked ? b.name : '')}
                        className="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                      />
                      <span>{b.name}</span>
                    </div>
                    <span className="text-gray-400">({b.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider matching Screen 2 */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  Price Range
                </h4>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                  Up to {BRAND.currency}{Number(priceRange).toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="250000"
                step="5000"
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(e.target.value);
                  updateFilter('maxPrice', e.target.value);
                }}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>{BRAND.currency}0</span>
                <span>{BRAND.currency}2,50,000</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                Rating
              </h4>
              <div className="space-y-2 text-xs">
                {[4, 3, 2, 1].map((stars) => (
                  <label key={stars} className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-indigo-600">
                    <input
                      type="radio"
                      name="ratingFilter"
                      checked={minRatingParam === stars.toString()}
                      onChange={() => updateFilter('minRating', stars.toString())}
                      className="text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: stars }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span>& above</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                Availability
              </h4>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={inStockParam === 'true'}
                    onChange={(e) => updateFilter('inStock', e.target.checked ? 'true' : '')}
                    className="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Right Section: Heading, Sort & Product Grid */}
          <main className="lg:col-span-3 space-y-6">
            {/* Header & Sort Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#111827] p-4 sm:px-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center gap-1.5 text-xs font-bold"
                >
                  <Filter className="w-4 h-4" /> Filters
                </button>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    {categoryParam || queryParam ? `${categoryParam || queryParam}` : 'All Products'}
                  </h1>
                  <p className="text-xs text-gray-400">
                    Showing {products.length} of {pageData.totalElements} products
                  </p>
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs text-gray-500 whitespace-nowrap">Sort by:</span>
                <select
                  value={activeSort()}
                  onChange={handleSortChange}
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <ProductGridSkeleton count={8} />
            ) : apiError ? (
              <div className="bg-white dark:bg-[#111827] rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800 space-y-4">
                <p className="text-sm font-medium text-red-500 dark:text-red-400">{apiError}</p>
                <button
                  onClick={fetchProducts}
                  className="py-2.5 px-6 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-700"
                >
                  Retry Loading
                </button>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-[#111827] rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800 space-y-4">
                <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 mx-auto flex items-center justify-center">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">No products found</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  We couldn't find any products matching your active filters. Try clearing some filters.
                </p>
                <button
                  onClick={handleClearAll}
                  className="py-2.5 px-6 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-700"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination matching Screen 2 */}
            {pageData.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-6">
                <button
                  onClick={() => updateFilter('page', Math.max(0, pageParam - 1).toString())}
                  disabled={pageParam === 0}
                  className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-30 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: pageData.totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => updateFilter('page', i.toString())}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                      pageParam === i
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                        : 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => updateFilter('page', Math.min(pageData.totalPages - 1, pageParam + 1).toString())}
                  disabled={pageParam === pageData.totalPages - 1}
                  className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-30 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
