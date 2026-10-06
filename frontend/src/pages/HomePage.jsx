import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Flame, ArrowRight, Smartphone, Shirt, Home, Sparkles, Activity, BookOpen, Smile, Car } from 'lucide-react';
import TrustBar from '../components/common/TrustBar';
import ProductCard from '../components/common/ProductCard';
import { CardSkeleton } from '../components/common/Skeleton';
import api from '../services/api';
import { BRAND } from '../config/brand';

const HomePage = () => {
  const [deals, setDeals] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroSlide, setHeroSlide] = useState(0);

  // Countdown timer for Today's Deals (matching Screen 1)
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 34, seconds: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dealsRes, featuredRes] = await Promise.all([
          api.get('/products/deals').catch(() => ({ data: [] })),
          api.get('/products/featured').catch(() => ({ data: [] })),
        ]);
        setDeals(dealsRes.data || []);
        setFeatured(featuredRes.data || []);
      } catch (err) {
        console.error('Failed to load home page products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = [
    { name: 'Electronics', slug: 'electronics', icon: Smartphone, color: 'from-blue-500 to-indigo-600', count: '120+ Items' },
    { name: 'Fashion', slug: 'fashion', icon: Shirt, color: 'from-pink-500 to-rose-600', count: '350+ Items' },
    { name: 'Home & Living', slug: 'home-living', icon: Home, color: 'from-amber-500 to-orange-600', count: '80+ Items' },
    { name: 'Beauty', slug: 'beauty', icon: Sparkles, color: 'from-purple-500 to-pink-600', count: '95+ Items' },
    { name: 'Sports', slug: 'sports', icon: Activity, color: 'from-emerald-500 to-teal-600', count: '60+ Items' },
    { name: 'Books', slug: 'books', icon: BookOpen, color: 'from-cyan-500 to-blue-600', count: '140+ Items' },
    { name: 'Toys', slug: 'toys', icon: Smile, color: 'from-yellow-400 to-amber-500', count: '45+ Items' },
    { name: 'Automotive', slug: 'automotive', icon: Car, color: 'from-slate-600 to-gray-800', count: '30+ Items' },
  ];

  const heroSlides = [
    {
      title: 'Shop Smart.\nLive Better.',
      subtitle: 'Top brands. Great prices.\nEverything you need, all in one place.',
      cta: 'Shop Now',
      link: '/products',
      tag: 'SUPER SALE • UP TO 40% OFF',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      gradient: 'from-[#0B0F19] via-[#1E1B4B] to-[#312E81]',
    },
    {
      title: 'Next-Gen\nSmartphones',
      subtitle: 'Experience dynamic performance with the latest flagship devices.',
      cta: 'Explore Phones',
      link: '/products?category=Electronics',
      tag: 'NEW ARRIVALS 2026',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      gradient: 'from-[#0f172a] via-[#1e293b] to-[#334155]',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] transition-colors">
      {/* 1. Hero Section matching Screen 1 & 14 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${heroSlides[heroSlide].gradient} shadow-2xl min-h-[380px] sm:min-h-[440px] flex items-center p-8 sm:p-12 lg:p-16 text-white`}>
          {/* Background overlay mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_50%)]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold tracking-wider">
                {heroSlides[heroSlide].tag}
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] whitespace-pre-line">
                {heroSlides[heroSlide].title}
              </h1>

              <p className="text-sm sm:text-base text-gray-300 max-w-lg leading-relaxed whitespace-pre-line">
                {heroSlides[heroSlide].subtitle}
              </p>

              <div className="pt-2">
                <Link
                  to={heroSlides[heroSlide].link}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  {heroSlides[heroSlide].cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Hero Product Image */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-indigo-500/10 rounded-full filter blur-2xl animate-pulse" />
                <img
                  src={heroSlides[heroSlide].image}
                  alt="Featured Showcase"
                  className="relative z-10 max-h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Carousel Arrows & Indicators */}
          <button
            onClick={() => setHeroSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setHeroSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  heroSlide === i ? 'w-8 bg-indigo-500' : 'w-2 bg-white/30'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Trust Bar matching Screen 1 */}
      <TrustBar />

      {/* 3. Shop by Category matching Screen 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Shop by Category
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Explore our wide collection of curated items</p>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            View All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex flex-col items-center text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-md mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Today's Deals with Countdown Timer matching Screen 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-red-500/10 via-amber-500/5 to-transparent dark:from-red-950/30 dark:via-amber-950/10 rounded-3xl p-6 sm:p-8 border border-red-100 dark:border-red-900/30 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-md shadow-red-500/30 animate-bounce">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  Today's Deals
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Limited time offers. Don't miss out!
                </p>
              </div>
            </div>

            {/* Countdown Badge matching reference Screen 1 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-white bg-gray-900 dark:bg-gray-800 px-3 py-2 rounded-xl shadow-inner">
                <span className="bg-red-600 px-2 py-1 rounded text-sm">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-red-500 font-bold">:</span>
                <span className="bg-red-600 px-2 py-1 rounded text-sm">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-red-500 font-bold">:</span>
                <span className="bg-red-600 px-2 py-1 rounded text-sm">{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
              <Link
                to="/products?deal=true"
                className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
              >
                View All Deals <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Deals Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            ) : deals.length > 0 ? (
              deals.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center py-8 text-sm text-gray-400">
                No active deals at this moment. Check back soon!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 5. Featured / Best Sellers Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Featured Best Sellers
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Handpicked premium products for you</p>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            Explore All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          ) : featured.length > 0 ? (
            featured.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center py-8 text-sm text-gray-400">
              No featured products available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
