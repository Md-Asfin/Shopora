import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

// ─── Mock cart/wishlist counts (will be wired to context in later steps) ─────
const MOCK_CART_COUNT = 2;
const MOCK_WISHLIST_COUNT = 3;

// ─── Category nav items ───────────────────────────────────────────────────────
const NAV_CATEGORIES = [
  { label: 'All Categories', href: '/products' },
  { label: "Today's Deals", href: '/products?deals=true' },
  { label: 'New Arrivals', href: '/products?sort=newest' },
  { label: 'Best Sellers', href: '/products?sort=bestsellers' },
  { label: 'Electronics', href: '/products?category=electronics' },
  { label: 'Fashion', href: '/products?category=fashion' },
  { label: 'Home & Living', href: '/products?category=home-living' },
  { label: 'Beauty', href: '/products?category=beauty' },
  { label: 'Sports', href: '/products?category=sports' },
  { label: 'Books', href: '/products?category=books' },
];

// ─── Mobile drawer nav destinations ──────────────────────────────────────────
const DRAWER_NAV = [
  { label: 'Home', href: '/' },
  { label: 'All Categories', href: '/products' },
  { label: "Today's Deals", href: '/products?deals=true' },
  { label: 'New Arrivals', href: '/products?sort=newest' },
  { label: 'Electronics', href: '/products?category=electronics' },
  { label: 'Fashion', href: '/products?category=fashion' },
  { label: 'Home & Living', href: '/products?category=home-living' },
  { label: 'Beauty', href: '/products?category=beauty' },
  { label: 'Sports', href: '/products?category=sports' },
  { label: 'Books', href: '/products?category=books' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'My Cart', href: '/cart' },
  { label: 'My Account', href: '/login' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname, location.search]);

  // Escape key closes drawer
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
        hamburgerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const q = query.trim();
      if (q) navigate(`/products?q=${encodeURIComponent(q)}`);
    },
    [query, navigate]
  );

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => {
    setDrawerOpen(false);
    hamburgerRef.current?.focus();
  };

  return (
    <>
      {/* ── Top header bar ─────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14 gap-3">

            {/* Brand mark + wordmark */}
            <Link
              to="/"
              className="flex items-center gap-2 shrink-0 focus-visible:outline-2 focus-visible:outline-indigo-500 rounded"
              aria-label="Shopora – go to homepage"
            >
              <img
                src="/images/brand/shopora-mark.svg"
                alt=""
                aria-hidden="true"
                className="w-8 h-8"
              />
              <span className="hidden sm:flex flex-col leading-none">
                <span className="text-[17px] font-bold text-gray-900 tracking-tight">
                  Shopora
                </span>
                <span className="text-[9px] text-indigo-500 font-medium tracking-wide">
                  Shop Smart. Live Better.
                </span>
              </span>
            </Link>

            {/* Search – desktop */}
            <form
              onSubmit={handleSearch}
              role="search"
              className="hidden md:flex flex-1 max-w-2xl mx-auto relative"
            >
              <label htmlFor="main-search" className="sr-only">
                Search for products, brands and more
              </label>
              <input
                id="main-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="w-full h-9 pl-4 pr-10 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute right-0 top-0 h-9 w-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Right controls */}
            <div className="flex items-center gap-1 sm:gap-2 ml-auto md:ml-0 shrink-0">

              {/* Wishlist – desktop only */}
              <Link
                to="/wishlist"
                aria-label={`Wishlist (${MOCK_WISHLIST_COUNT} items)`}
                className="hidden md:flex flex-col items-center gap-0.5 px-2 py-1 rounded hover:bg-gray-50 transition text-gray-600 hover:text-indigo-600 relative"
              >
                <div className="relative">
                  <Heart size={18} />
                  {MOCK_WISHLIST_COUNT > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 text-[9px] font-bold bg-indigo-600 text-white rounded-full flex items-center justify-center leading-none">
                      {MOCK_WISHLIST_COUNT > 9 ? '9+' : MOCK_WISHLIST_COUNT}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium text-gray-500">Wishlist</span>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                aria-label={`Cart (${MOCK_CART_COUNT} items)`}
                className="flex flex-col items-center gap-0.5 px-2 py-1 rounded hover:bg-gray-50 transition text-gray-600 hover:text-indigo-600 relative"
              >
                <div className="relative">
                  <ShoppingBag size={18} />
                  {MOCK_CART_COUNT > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 text-[9px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center leading-none">
                      {MOCK_CART_COUNT > 9 ? '9+' : MOCK_CART_COUNT}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium text-gray-500 hidden sm:block">Cart</span>
              </Link>

              {/* Account – desktop only */}
              <Link
                to="/login"
                aria-label="My account"
                className="hidden md:flex flex-col items-center gap-0.5 px-2 py-1 rounded hover:bg-gray-50 transition text-gray-600 hover:text-indigo-600"
              >
                <User size={18} />
                <span className="text-[10px] font-medium text-gray-500">Account</span>
              </Link>

              {/* Hamburger – mobile only */}
              <button
                ref={hamburgerRef}
                onClick={openDrawer}
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
                className="md:hidden flex items-center justify-center w-9 h-9 rounded hover:bg-gray-100 transition text-gray-700"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Mobile search row */}
          <div className="md:hidden pb-2">
            <form onSubmit={handleSearch} role="search" className="relative">
              <label htmlFor="mobile-search" className="sr-only">
                Search for products
              </label>
              <input
                id="mobile-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-9 pl-4 pr-10 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute right-0 top-0 h-9 w-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition"
              >
                <Search size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* ── Category nav row (desktop) ─────────────────────────────────── */}
        <nav aria-label="Product categories" className="hidden md:block border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {NAV_CATEGORIES.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="shrink-0 px-3 py-2 text-xs font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition rounded whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer overlay ───────────────────────────────────────────── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          id="mobile-drawer"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div
            ref={drawerRef}
            className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col shadow-xl overflow-y-auto"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <Link
                to="/"
                onClick={closeDrawer}
                className="flex items-center gap-2"
                aria-label="Shopora – go to homepage"
              >
                <img src="/images/brand/shopora-mark.svg" alt="" aria-hidden="true" className="w-8 h-8" />
                <span>
                  <span className="text-[15px] font-bold text-gray-900 block leading-none">Shopora</span>
                  <span className="text-[9px] text-indigo-500 font-medium">Shop Smart. Live Better.</span>
                </span>
              </Link>
              <button
                onClick={closeDrawer}
                aria-label="Close navigation menu"
                className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer links */}
            <nav aria-label="Mobile navigation" className="flex-1 py-2">
              {DRAWER_NAV.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeDrawer}
                  className="flex items-center px-5 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition border-b border-gray-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Drawer footer */}
            <div className="px-5 py-4 border-t border-gray-100 text-xs text-gray-400">
              &copy; 2026 Shopora. All rights reserved.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
