import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Truck, RotateCcw, Award, Heart, ShoppingBag, Check, ChevronRight, Plus, Minus } from 'lucide-react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { BRAND } from '../config/brand';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('Pink');
  const [selectedStorage, setSelectedStorage] = useState('128GB');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/product/${id}`);
        if (res.data) {
          setProduct(res.data);
          setSelectedImage(res.data.imageUrl || 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80');
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-3xl" />
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
            <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product Not Found</h2>
        <Link to="/products" className="mt-4 inline-block px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-xs">
          Browse All Products
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const colors = [
    { name: 'Pink', bg: 'bg-pink-300' },
    { name: 'Black', bg: 'bg-gray-900' },
    { name: 'Blue', bg: 'bg-sky-400' },
    { name: 'Yellow', bg: 'bg-amber-300' },
  ];
  const storageOptions = ['128GB', '256GB', '512GB'];

  const handleAddToCart = () => {
    addToCart(product.id, quantity, selectedColor, selectedStorage);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity, selectedColor, selectedStorage);
    navigate('/checkout');
  };

  const formatPrice = (val) => `${BRAND.currency}${Number(val).toLocaleString('en-IN')}`;

  const galleryImages = [
    product.imageUrl || 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb matching Screen 3 */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/products" className="hover:text-indigo-600">{product.categoryName || 'Products'}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* 2-Column Product Layout matching Screen 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
          {/* Left Column: Image & Thumbnail Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-3xl bg-gray-50 dark:bg-gray-800/40 p-8 flex items-center justify-center border border-gray-100 dark:border-gray-800 overflow-hidden">
              {product.discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                  {product.discountPercent}% OFF
                </span>
              )}
              <button
                onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product.id)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-400 hover:text-red-500"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
              </button>

              <img
                src={selectedImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-2xl bg-gray-50 dark:bg-gray-800/60 p-2 border-2 transition-all flex items-center justify-center ${
                    selectedImage === img ? 'border-indigo-600 shadow-md' : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {product.brand || 'Shopora'}
              </span>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Write a Review */}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-200 ml-1.5">
                    {product.rating ? product.rating.toFixed(1) : '4.5'}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  ({product.reviewCount ? (product.reviewCount >= 1000 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount) : '1,200'} reviews)
                </span>
                <span className="text-xs text-gray-300">•</span>
                <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                  Write a review
                </button>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 my-4">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="bg-red-50 dark:bg-red-950/50 text-red-500 text-xs font-bold px-2 py-0.5 rounded-md">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* In Stock Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${product.stockQuantity > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                <span className={`text-xs font-bold ${product.stockQuantity > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                  {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Feature Highlights */}
              <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300 py-3 border-y border-gray-100 dark:border-gray-800">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>High quality build & authentic manufacturer guarantee</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>USB-C Fast Charging & modern connectivity</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>1 Year Official Brand Warranty included</span>
                </li>
              </ul>

              {/* Color Swatches */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">
                  Color: <span className="font-normal text-gray-500">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full ${c.bg} border-2 transition-all ${
                        selectedColor === c.name ? 'ring-2 ring-indigo-600 ring-offset-2' : 'border-transparent'
                      }`}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Storage Variant Selectors */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">
                  Storage
                </label>
                <div className="flex items-center gap-2">
                  {storageOptions.map((storage) => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={`py-1.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                        selectedStorage === storage
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Buttons matching Screen 3 */}
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-2xl p-1 bg-gray-50 dark:bg-gray-800">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-xl text-gray-500 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="p-2 rounded-xl text-gray-500 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stockQuantity <= 0}
                  className={`flex-1 py-3 px-6 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all ${
                    addedToCart
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {addedToCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  {addedToCart ? 'Added to Cart' : 'Add to Cart'}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stockQuantity <= 0}
                  className="py-3 px-6 rounded-2xl border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Trust Row Badges matching Screen 3 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-indigo-600" />
                <div>
                  <h5 className="text-[11px] font-bold text-gray-900 dark:text-white">Free Delivery</h5>
                  <p className="text-[10px] text-gray-400">On orders over ₹499</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-indigo-600" />
                <div>
                  <h5 className="text-[11px] font-bold text-gray-900 dark:text-white">7-Day Return</h5>
                  <p className="text-[10px] text-gray-400">Easy returns</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-indigo-600" />
                <div>
                  <h5 className="text-[11px] font-bold text-gray-900 dark:text-white">1 Year Warranty</h5>
                  <p className="text-[10px] text-gray-400">Official warranty</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <div>
                  <h5 className="text-[11px] font-bold text-gray-900 dark:text-white">Secure Payment</h5>
                  <p className="text-[10px] text-gray-400">100% safe payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content: Description, Specifications, Reviews matching Screen 3 */}
        <div className="mt-8 bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-8 border-b border-gray-100 dark:border-gray-800 pb-3 text-xs font-bold">
            {['description', 'specifications', 'reviews', 'qa'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 -mb-3 capitalize transition-all border-b-2 ${
                  activeTab === tab
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab === 'qa' ? 'Q&A' : tab === 'reviews' ? `Reviews (${product.reviewCount || 120})` : tab}
              </button>
            ))}
          </div>

          <div className="pt-6 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <p>
                  Engineered with premium craftsmanship to ensure superior durability, dynamic performance, and optimal user satisfaction.
                </p>
              </div>
            )}
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <span className="font-semibold text-gray-400">Brand:</span> {product.brand}
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <span className="font-semibold text-gray-400">Category:</span> {product.categoryName}
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <span className="font-semibold text-gray-400">In Stock:</span> {product.stockQuantity} units
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <span className="font-semibold text-gray-400">Release Date:</span> {new Date(product.releaseDate || Date.now()).toLocaleDateString()}
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800">
                  <div className="text-3xl font-extrabold text-indigo-600">4.8</div>
                  <div>
                    <div className="flex text-amber-400">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                    </div>
                    <p className="text-gray-400 mt-0.5">Based on {product.reviewCount || 120} verified ratings</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'qa' && (
              <p className="text-gray-400">Have questions about this item? Ask our community or contact support.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
