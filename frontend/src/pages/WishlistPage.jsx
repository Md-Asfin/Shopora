import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            My Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Saved items you want to shop later</p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white dark:bg-dark-surface p-12 rounded-3xl border border-gray-100 dark:border-dark-border text-center">
          <Heart className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Your wishlist is empty</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Explore our curated catalog and save your favorites!</p>
          <Link
            to="/products"
            className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs transition-all inline-flex items-center gap-2"
          >
            Explore Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => {
            const product = item.product || item;
            return (
              <div
                key={item.id || product.id}
                className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-square rounded-xl bg-gray-50 dark:bg-dark-bg p-3 mb-3 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.imageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80'}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-dark-surface/90 text-red-500 hover:bg-red-50 flex items-center justify-center shadow-sm transition-all"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <Link to={`/products/${product.id}`} className="block">
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                      ₹{(product.price || 0).toLocaleString()}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
