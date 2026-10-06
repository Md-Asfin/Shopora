import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User as UserIcon, Menu, Moon, Sun, ChevronDown, ShieldAlert, LogOut, Package, MapPin } from 'lucide-react';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { BRAND } from '../../config/brand';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cart } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const categories = [
    { name: "Today's Deals", path: '/products?deal=true', highlight: true },
    { name: 'New Arrivals', path: '/products?sort=id&sortDir=desc' },
    { name: 'Best Sellers', path: '/products?featured=true' },
    { name: 'Electronics', path: '/products?category=Electronics' },
    { name: 'Fashion', path: '/products?category=Fashion' },
    { name: 'Home & Living', path: '/products?category=Home%20%26%20Living' },
    { name: 'Beauty', path: '/products?category=Beauty' },
    { name: 'Sports', path: '/products?category=Sports' },
    { name: 'Books', path: '/products?category=Books' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" />
          </div>

          {/* Search Bar matching reference */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-6 relative items-center"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products, brands and more..."
              className="w-full h-11 pl-11 pr-4 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            <button
              type="submit"
              className="absolute left-3.5 text-gray-400 hover:text-indigo-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right Action Icons matching reference */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with count badge */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-semibold text-xs transition-all duration-200"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cart.totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold">
                {cart.totalAmount > 0
                  ? `${BRAND.currency}${Number(cart.totalAmount).toLocaleString('en-IN')}`
                  : 'Cart'}
              </span>
            </Link>

            {/* Account dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Account"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  {isAuthenticated && user ? user.fullName?.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
                </div>
                <span className="hidden lg:inline text-xs font-semibold">
                  {isAuthenticated && user ? user.fullName.split(' ')[0] : 'Account'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:inline" />
              </button>

              {/* Dropdown menu */}
              {isAccountMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1f2937] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setIsAccountMenuOpen(false)}
                >
                  {isAuthenticated && user ? (
                    <>
                      <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 truncate">
                          {user.email}
                        </p>
                      </div>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                        >
                          <ShieldAlert className="w-4 h-4" /> Admin Dashboard
                        </Link>
                      )}

                      <Link
                        to="/orders"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750"
                      >
                        <Package className="w-4 h-4 text-gray-400" /> My Orders
                      </Link>

                      <Link
                        to="/addresses"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750"
                      >
                        <MapPin className="w-4 h-4 text-gray-400" /> Address Book
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750"
                      >
                        <Heart className="w-4 h-4 text-gray-400" /> Wishlist
                      </Link>

                      <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>

                      <button
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          logout();
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-left"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="p-2 space-y-1">
                      <Link
                        to="/login"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="block w-full text-center py-2 px-3 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-sm"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="block w-full text-center py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50"
                      >
                        Create Account
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Sub-Navbar Row matching reference design */}
      <div className="hidden lg:block bg-gray-50/70 dark:bg-[#0d1322] border-t border-gray-100 dark:border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 h-11 text-xs font-medium text-gray-600 dark:text-gray-300 overflow-x-auto">
            {/* All Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 py-2"
              >
                <span>All Categories</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isCategoryMenuOpen && (
                <div
                  className="absolute left-0 mt-1 w-48 bg-white dark:bg-[#1f2937] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1.5 z-50"
                  onMouseLeave={() => setIsCategoryMenuOpen(false)}
                >
                  <Link
                    to="/products"
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 text-gray-700 dark:text-gray-200"
                  >
                    All Products
                  </Link>
                  <Link
                    to="/products?category=Electronics"
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 text-gray-700 dark:text-gray-200"
                  >
                    Electronics
                  </Link>
                  <Link
                    to="/products?category=Fashion"
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 text-gray-700 dark:text-gray-200"
                  >
                    Fashion
                  </Link>
                  <Link
                    to="/products?category=Toys"
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 text-gray-700 dark:text-gray-200"
                  >
                    Toys & Games
                  </Link>
                </div>
              )}
            </div>

            <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />

            {/* Category Nav Links */}
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={cat.path}
                className={`whitespace-nowrap hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2 ${
                  cat.highlight ? 'font-bold text-red-500 dark:text-red-400' : ''
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Navbar;
