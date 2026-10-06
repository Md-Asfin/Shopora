import React from 'react';
import { ShoppingBag, Star, Heart, Check, AlertCircle } from 'lucide-react';

export default function DesignSystemPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Shopora Design System (Screen 16)</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Visual tokens, typography, component states, and palette defined for the Shopora application.
        </p>
      </div>

      {/* Brand & Neutral Colors */}
      <section className="bg-white dark:bg-dark-surface p-6 rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">1. Brand & Functional Colors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="space-y-1.5">
            <div className="h-16 rounded-2xl bg-[#6366F1] shadow-sm flex items-end p-2 text-white font-mono text-[10px] font-bold">
              #6366F1
            </div>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">Primary</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-16 rounded-2xl bg-[#8B5CF6] shadow-sm flex items-end p-2 text-white font-mono text-[10px] font-bold">
              #8B5CF6
            </div>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">Secondary</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-16 rounded-2xl bg-[#10B981] shadow-sm flex items-end p-2 text-white font-mono text-[10px] font-bold">
              #10B981
            </div>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">Success</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-16 rounded-2xl bg-[#F59E0B] shadow-sm flex items-end p-2 text-white font-mono text-[10px] font-bold">
              #F59E0B
            </div>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">Warning</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-16 rounded-2xl bg-[#EF4444] shadow-sm flex items-end p-2 text-white font-mono text-[10px] font-bold">
              #EF4444
            </div>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">Error</span>
          </div>
        </div>
      </section>

      {/* Typography Hierarchy */}
      <section className="bg-white dark:bg-dark-surface p-6 rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">2. Typography Hierarchy (Inter)</h2>
        <div className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-gray-100 dark:border-dark-border pb-2">
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">H1 / Heading (32px Bold)</span>
            <span className="text-xs text-gray-400 font-mono">font-extrabold / 32px</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-gray-100 dark:border-dark-border pb-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">H2 / Subheading (24px Bold)</span>
            <span className="text-xs text-gray-400 font-mono">font-bold / 24px</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-gray-100 dark:border-dark-border pb-2">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">H3 / Section (18px Semibold)</span>
            <span className="text-xs text-gray-400 font-mono">font-semibold / 18px</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-gray-100 dark:border-dark-border pb-2">
            <span className="text-sm font-normal text-gray-700 dark:text-gray-300">Body Text (14px Regular)</span>
            <span className="text-xs text-gray-400 font-mono">font-normal / 14px</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Caption / Metadata (12px Medium)</span>
            <span className="text-xs text-gray-400 font-mono">font-semibold / 12px</span>
          </div>
        </div>
      </section>

      {/* Buttons & Badges */}
      <section className="bg-white dark:bg-dark-surface p-6 rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm space-y-6">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white">3. Buttons, Badges & Inputs</h2>
        
        <div className="space-y-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Buttons</span>
          <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl shadow-sm">
              Primary Button
            </button>
            <button className="px-5 py-2.5 bg-secondary-600 hover:bg-secondary-700 text-white text-xs font-bold rounded-xl shadow-sm">
              Secondary Button
            </button>
            <button className="px-5 py-2.5 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950 text-xs font-bold rounded-xl">
              Outline Button
            </button>
            <button className="px-5 py-2.5 bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-gray-300 hover:bg-gray-200 text-xs font-bold rounded-xl">
              Ghost / Neutral
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Badges</span>
          <div className="flex flex-wrap gap-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300">
              In Stock
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300">
              Low Stock (3 left)
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300">
              15% OFF
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
              Featured Deal
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Input Field</span>
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search products, brands and more..."
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-xs focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
