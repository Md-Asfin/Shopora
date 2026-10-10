import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';

/**
 * Formats a number as Indian Rupees: ₹69,999
 */
function formatINR(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

/**
 * Renders filled/half/empty stars.
 * Only renders to nearest 0.5.
 */
function StarRating({ rating, count }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: full }).map((_, i) => (
          <Star key={`f${i}`} size={11} className="text-yellow-400 fill-yellow-400" />
        ))}
        {half && (
          <span className="relative inline-flex">
            <Star size={11} className="text-gray-200 fill-gray-200" />
            <span className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={11} className="text-yellow-400 fill-yellow-400" />
            </span>
          </span>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`e${i}`} size={11} className="text-gray-200 fill-gray-200" />
        ))}
      </div>
      <span className="text-[10px] text-gray-500">
        {rating.toFixed(1)} ({count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count})
      </span>
    </div>
  );
}

/**
 * ProductCard – reusable compact shopping card
 *
 * Props:
 *   product  – product object from mockProducts
 *   onAddToCart  – optional callback(product)
 *   onWishlist   – optional callback(product)
 *   wishlisted   – boolean, whether the product is in wishlist
 */
export default function ProductCard({ product, onAddToCart, onWishlist, wishlisted = false }) {
  const [inWishlist, setInWishlist] = useState(wishlisted);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) return null;

  const {
    id,
    slug,
    name,
    thumbnail,
    badge,
    discountPercent,
    price,
    originalPrice,
    rating,
    reviewCount,
  } = product;

  function handleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    const next = !inWishlist;
    setInWishlist(next);
    onWishlist?.(product, next);
  }

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    setAddedToCart(true);
    onAddToCart?.(product);
    setTimeout(() => setAddedToCart(false), 1500);
  }

  return (
    <article className="group relative bg-white rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">

      {/* Image area */}
      <Link
        to={`/products/${slug}`}
        className="block relative overflow-hidden bg-gray-50"
        tabIndex={-1}
        aria-hidden="true"
      >
        {/* Discount badge */}
        {discountPercent > 0 && (
          <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {discountPercent}% OFF
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={inWishlist ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 hover:border-indigo-200 transition"
          tabIndex={0}
        >
          <Heart
            size={13}
            className={inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'}
          />
        </button>

        <div className="aspect-[4/3] flex items-center justify-center p-3">
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-contain mix-blend-multiply"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = '/images/brand/shopora-mark.svg';
            }}
          />
        </div>
      </Link>

      {/* Info area */}
      <div className="flex flex-col flex-1 p-3 gap-1.5">

        {/* Product name */}
        <Link
          to={`/products/${slug}`}
          className="text-[13px] font-semibold text-gray-800 hover:text-indigo-600 transition line-clamp-2 leading-snug"
        >
          {name}
        </Link>

        {/* Star rating */}
        <StarRating rating={rating} count={reviewCount} />

        {/* Price row */}
        <div className="flex items-baseline gap-1.5 mt-auto">
          <span className="text-base font-bold text-gray-900">{formatINR(price)}</span>
          {originalPrice > price && (
            <span className="text-[11px] text-gray-400 line-through">{formatINR(originalPrice)}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          aria-label={`Add ${name} to cart`}
          className={`mt-1 w-full flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-semibold transition-all ${
            addedToCart
              ? 'bg-green-500 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
          }`}
        >
          <ShoppingCart size={13} />
          {addedToCart ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}
