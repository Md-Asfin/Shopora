import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Home, Grid, Tag, ShoppingBag, Heart, MapPin, User, Moon, Sun, LogOut, ShieldAlert } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useWishlist } from '../../context/WishlistContext';

const MobileMenu = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Categories', path: '/products', icon: Grid },
    { name: "Today's Deals", path: '/products?deal=true', icon: Tag },
    { name: 'My Orders', path: '/orders', icon: ShoppingBag, auth: true },
    { name: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlistCount, auth: true },
    { name: 'Addresses', path: '/addresses', icon: MapPin, auth: true },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel matching Screen 9 */}
      <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white dark:bg-[#111827] shadow-2xl flex flex-col justify-between z-50 p-6 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-gray-100 dark:border-gray-800">
            <Logo size="sm" />
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User profile preview if logged in */}
          {isAuthenticated && user && (
            <div className="flex items-center gap-3 py-4 my-2 border-b border-gray-100 dark:border-gray-800">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {user.fullName}
                </h4>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="mt-4 space-y-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={onClose}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge > 0 && (
                    <span className="bg-indigo-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                to="/admin"
                onClick={onClose}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Bottom actions matching Screen 9 */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3">
          {/* Dark Mode Toggle Switch */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/60">
            <div className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>Dark Theme</span>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Auth Button */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={onClose}
                className="w-full text-center py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="w-full text-center py-2 px-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
