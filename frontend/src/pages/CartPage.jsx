import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND } from '../config/brand';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, loading } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      setCouponApplied(true);
    }
  };

  const formatPrice = (val) => `${BRAND.currency}${Number(val || 0).toLocaleString('en-IN')}`;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-gray-50 dark:bg-[#0B0F19] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-10 max-w-md w-full text-center border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
          <div className="w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Your Cart is Empty</h2>
          <p className="text-xs text-gray-400">
            Looks like you haven't added anything to your cart yet. Explore our deals and discover great products!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 py-3 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/20"
          >
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Clear Cart Header matching Screen 4 */}
        <div className="flex items-center justify-between pb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            My Cart <span className="text-indigo-600 font-bold text-lg">({cart.totalItems} items)</span>
          </h1>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 hover:underline"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Cart
          </button>
        </div>

        {/* 2-Column Cart Layout matching Screen 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#111827] rounded-3xl p-4 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-all"
              >
                {/* Product Image & Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-50 dark:bg-gray-800/60 p-2 flex items-center justify-center flex-shrink-0 border border-gray-100 dark:border-gray-800">
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'}
                      alt={item.productName}
                      className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal"
                    />
                  </div>
                  <div>
                    <Link
                      to={`/product/${item.productId}`}
                      className="text-sm font-bold text-gray-900 dark:text-white hover:text-indigo-600 line-clamp-1"
                    >
                      {item.productName}
                    </Link>
                    {(item.selectedColor || item.selectedStorage) && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.selectedColor && `Color: ${item.selectedColor}`}
                        {item.selectedColor && item.selectedStorage && ' • '}
                        {item.selectedStorage && `Storage: ${item.selectedStorage}`}
                      </p>
                    )}
                    <p className="text-base font-extrabold text-gray-900 dark:text-white mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>

                {/* Quantity Stepper & Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-800">
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl p-1 bg-gray-50 dark:bg-gray-800">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 rounded-lg text-gray-500 hover:bg-white dark:hover:bg-gray-700"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 rounded-lg text-gray-500 hover:bg-white dark:hover:bg-gray-700"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-sm font-bold text-gray-900 dark:text-white min-w-[80px] text-right">
                    {formatPrice(item.subtotal)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Card matching Screen 4 */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm sticky top-28 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery</span>
                  <span className="font-bold text-emerald-600">
                    {cart.deliveryFee > 0 ? formatPrice(cart.deliveryFee) : 'Free'}
                  </span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-{formatPrice(cart.discount)}</span>
                  </div>
                )}
                {couponApplied && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon (SHOPORA10)</span>
                    <span>-₹500</span>
                  </div>
                )}
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Tag className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3" />
                </div>
                <button
                  type="submit"
                  className="px-4 h-10 rounded-xl bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 text-white text-xs font-bold"
                >
                  Apply
                </button>
              </form>

              {/* Total Row */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-baseline">
                <span className="text-base font-extrabold text-gray-900 dark:text-white">Total</span>
                <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {formatPrice(couponApplied ? Math.max(0, cart.totalAmount - 500) : cart.totalAmount)}
                </span>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Authoritative server-side price protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
