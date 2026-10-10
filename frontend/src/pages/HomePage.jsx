import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Flame,
  Truck,
  RotateCcw,
  ShieldCheck,
  BadgeCheck,
} from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { getFeaturedProducts, getDealProducts, getMainCategories } from '../services/mockDataService';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Deal countdown target: end of today (midnight IST) — gives a realistic,
 * real-time demo countdown. If a product has dealEndsAt, we use the nearest
 * dealEndsAt value across all deal products; otherwise we fall back to midnight.
 */
function getDealDeadline(dealProducts) {
  const timestamps = dealProducts
    .filter((p) => p.dealEndsAt)
    .map((p) => new Date(p.dealEndsAt).getTime())
    .filter((t) => !isNaN(t) && t > Date.now());

  if (timestamps.length > 0) {
    return Math.min(...timestamps);
  }
  // Fallback: midnight tonight (local time)
  const midnight = new Date();
  midnight.setHours(23, 59, 59, 0);
  return midnight.getTime();
}

function getTimeLeft(targetMs) {
  const diff = Math.max(0, targetMs - Date.now());
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1_000);
  return { h, m, s, expired: diff === 0 };
}

function pad(n) {
  return String(n).padStart(2, '0');
}

// ─── Trust bar items ──────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  {
    icon: '/images/home/trust-delivery.svg',
    title: 'Free Delivery',
    subtitle: 'On orders over ₹499',
  },
  {
    icon: '/images/home/trust-return.svg',
    title: '7-Day Return',
    subtitle: 'Easy returns',
  },
  {
    icon: '/images/home/trust-security.svg',
    title: 'Secure Payment',
    subtitle: '100% safe & secure',
  },
  {
    icon: '/images/home/trust-quality.svg',
    title: 'Genuine Products',
    subtitle: 'Quality you can trust',
  },
];

// ─── Hero slides – we use the single local banner image ──────────────────────
// NOTE: hero-banner.png already contains "Shop Smart. Live Better." baked in.
// For slide 1 we show only the CTA (no headline overlay to avoid duplication).
// Slide 2 uses a dark overlay with its own text.
const HERO_SLIDES = [
  {
    image: '/images/home/hero-banner.png',
    headline: null, // image already has the headline text
    sub: null,
    cta: 'Shop Now',
    href: '/products',
  },
  {
    image: '/images/home/hero-banner.png',
    headline: "Today's Best Deals",
    sub: 'Limited-time offers on top electronics and fashion.',
    cta: 'View Deals',
    href: '/products?deals=true',
  },
];

// ─── Hero Carousel ─────────────────────────────────────────────────────────────
function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const total = HERO_SLIDES.length;
  const timerRef = useRef(null);

  const goTo = useCallback((i) => {
    setIdx(((i % total) + total) % total);
  }, [total]);

  const prev = useCallback(() => goTo(idx - 1), [idx, goTo]);
  const next = useCallback(() => goTo(idx + 1), [idx, goTo]);

  // Auto-advance every 5 s
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const slide = HERO_SLIDES[idx];

  return (
    <section
      aria-label="Featured promotions carousel"
      className="relative w-full overflow-hidden rounded-2xl bg-gray-100"
      style={{ aspectRatio: '1440/400' }}
    >
      {/* Slide image */}
      <img
        key={idx}
        src={slide.image}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover object-center"
      />

      {/* Text overlay – rendered for slides that have text content.
          Slide 1 (image already has headline) gets only a CTA at bottom-left.
          Slide 2+ get a full dark-gradient overlay. */}
      {slide.headline ? (
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-14 bg-gradient-to-r from-black/55 via-black/20 to-transparent">
          <div className="max-w-md">
            <h1 className="text-white text-2xl sm:text-4xl font-extrabold leading-tight mb-2 whitespace-pre-line drop-shadow">
              {slide.headline}
            </h1>
            {slide.sub && (
              <p className="text-white/90 text-sm sm:text-base mb-5 drop-shadow leading-snug">
                {slide.sub}
              </p>
            )}
            <Link
              to={slide.href}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition active:scale-95"
            >
              {slide.cta}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      ) : null}

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition"
      >
        <ChevronLeft size={18} className="text-gray-700" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition"
      >
        <ChevronRight size={18} className="text-gray-700" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5" role="tablist" aria-label="Slides">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === idx}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === idx ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Deal Countdown ───────────────────────────────────────────────────────────
function DealCountdown({ targetMs }) {
  const [time, setTime] = useState(() => getTimeLeft(targetMs));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (time.expired) return null;

  return (
    <div className="flex items-center gap-1.5" aria-live="polite" aria-atomic="true" aria-label="Deal countdown">
      {[
        { value: pad(time.h), label: 'Hours' },
        { value: pad(time.m), label: 'Mins' },
        { value: pad(time.s), label: 'Secs' },
      ].map(({ value, label }, i) => (
        <React.Fragment key={label}>
          {i > 0 && <span className="text-red-500 font-bold text-sm">:</span>}
          <div className="flex flex-col items-center">
            <span className="bg-red-500 text-white text-sm font-bold w-9 h-9 rounded flex items-center justify-center leading-none tabular-nums">
              {value}
            </span>
            <span className="text-[9px] text-gray-500 mt-0.5">{label}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Section header helper ────────────────────────────────────────────────────
function SectionHeader({ children, viewAllHref, viewAllLabel = 'View All' }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>{children}</div>
      {viewAllHref && (
        <Link
          to={viewAllHref}
          className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
        >
          {viewAllLabel}
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate();

  // Fetch data from mock service (sync)
  const dealProducts = getDealProducts();
  const featuredProducts = getFeaturedProducts();
  const mainCategories = getMainCategories();

  // Memoize deadline so countdown is stable
  const dealDeadline = useRef(getDealDeadline(dealProducts)).current;

  return (
    <main id="main-content" className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-8">

        {/* ── A. Hero Banner ──────────────────────────────────────────────── */}
        <HeroCarousel />

        {/* ── B. Trust Bar ───────────────────────────────────────────────── */}
        <section aria-label="Shopping benefits" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TRUST_ITEMS.map(({ icon, title, subtitle }) => (
            <div
              key={title}
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-3 py-3"
            >
              <img src={icon} alt="" aria-hidden="true" className="w-9 h-9 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-gray-800 leading-snug">{title}</div>
                <div className="text-[10px] text-gray-500">{subtitle}</div>
              </div>
            </div>
          ))}
        </section>

        {/* ── C. Shop by Category ────────────────────────────────────────── */}
        <section aria-labelledby="section-categories">
          <SectionHeader viewAllHref="/products" viewAllLabel="View All →">
            <h2 id="section-categories" className="text-base font-bold text-gray-900">
              Shop by Category
            </h2>
          </SectionHeader>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {mainCategories.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="flex flex-col items-center gap-1.5 group"
                aria-label={cat.name}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:bg-indigo-100 group-hover:border-indigo-200 transition overflow-hidden p-2">
                  <img
                    src={cat.image}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <span className="text-[11px] font-medium text-gray-700 group-hover:text-indigo-600 text-center leading-tight transition">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── D + E. Today's Deals ───────────────────────────────────────── */}
        <section aria-labelledby="section-deals">
          {/* Deal header bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4">
            <div className="flex items-center gap-2">
              <Flame size={20} className="text-red-500 shrink-0" />
              <div>
                <h2 id="section-deals" className="text-base font-bold text-gray-900 leading-none">
                  Today's Deals
                </h2>
                <p className="text-[11px] text-gray-500 mt-0.5">Limited time offers. Don't miss out!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <DealCountdown targetMs={dealDeadline} />
              <Link
                to="/products?deals=true"
                className="shrink-0 flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
              >
                View All Deals
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Deal product grid */}
          {dealProducts.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No deals available right now.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {dealProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => console.log('Add to cart:', p.name)}
                  onWishlist={(p, wishlisted) => console.log('Wishlist:', p.name, wishlisted)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── F. Featured Products ───────────────────────────────────────── */}
        <section aria-labelledby="section-featured">
          <SectionHeader viewAllHref="/products?featured=true" viewAllLabel="View All Products →">
            <h2 id="section-featured" className="text-base font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-[11px] text-gray-500 mt-0.5">Handpicked selections for you</p>
          </SectionHeader>

          {featuredProducts.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No featured products.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => console.log('Add to cart:', p.name)}
                  onWishlist={(p, wishlisted) => console.log('Wishlist:', p.name, wishlisted)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── G. Footer ──────────────────────────────────────────────────── */}
        <footer className="border-t border-gray-200 pt-6 pb-4" aria-label="Site footer">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <img src="/images/brand/shopora-mark.svg" alt="Shopora" className="w-8 h-8" />
              <div>
                <div className="text-sm font-bold text-gray-900">Shopora</div>
                <div className="text-[10px] text-gray-400">Shop Smart. Live Better.</div>
              </div>
            </div>

            {/* Quick links */}
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-1">
              {[
                { label: 'Electronics', href: '/products?category=electronics' },
                { label: 'Fashion', href: '/products?category=fashion' },
                { label: "Today's Deals", href: '/products?deals=true' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Terms & Conditions', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  to={href}
                  className="text-xs text-gray-500 hover:text-indigo-600 transition"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Copyright */}
            <div className="text-[10px] text-gray-400 sm:text-right whitespace-nowrap">
              &copy; {new Date().getFullYear()} Shopora. All rights reserved.
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}
