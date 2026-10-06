import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { BRAND } from '../../config/brand';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const formatPrice = (val) => {
    if (!val) return '₹0';
    return `${BRAND.currency}${Number(val).toLocaleString('en-IN')}`;
  };

  const hasDiscount = product.discountPercent && product.discountPercent > 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Top Badges */}
      <div className="flex items-center justify-between z-10 w-full mb-2">
        {hasDiscount ? (
          <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm tracking-wide">
            {product.discountPercent}% OFF
          </span>
        ) : (
          <span className="bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold px-2 py-0.5 rounded-md">
            {product.categoryName || 'Featured'}
          </span>
        )}

        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            inWishlist
              ? 'bg-red-50 text-red-500 dark:bg-red-950/50'
              : 'bg-gray-50 text-gray-400 hover:text-red-500 dark:bg-gray-800/80 dark:hover:text-red-400'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800/50 mb-3 flex items-center justify-center p-2">
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-grow">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
          {product.brand || 'Shopora'}
        </span>

        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {product.name}
        </h3>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 my-1.5">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">
              {product.rating ? product.rating.toFixed(1) : '4.5'}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            ({product.reviewCount ? (product.reviewCount >= 1000 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount) : '120'})
          </span>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className={`w-1.5 h-1.5 rounded-full ${product.stockQuantity > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
          <span className={`text-[11px] font-medium ${product.stockQuantity > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
            {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mb-3 mt-auto">
          <span className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.stockQuantity <= 0}
          className={`w-full py-2.5 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ${
            added
              ? 'bg-emerald-600 text-white'
              : product.stockQuantity <= 0
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-indigo-500/20 active:scale-[0.98]'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" /> Added
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
