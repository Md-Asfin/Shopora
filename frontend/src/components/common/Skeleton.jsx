import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm animate-pulse flex flex-col justify-between">
    <div className="w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl mb-3" />
    <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
    <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded mb-2" />
    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded mb-3" />
    <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
    <div className="h-9 w-full bg-gray-200 dark:bg-gray-800 rounded-xl" />
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const OrderSkeleton = () => (
  <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm animate-pulse space-y-4">
    <div className="flex justify-between items-center">
      <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded" />
      <div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded-full" />
    </div>
    <div className="h-16 w-full bg-gray-100 dark:bg-gray-800/50 rounded-xl" />
    <div className="flex justify-between items-center pt-2">
      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
      <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg" />
    </div>
  </div>
);

export const Skeleton = ({ className = '' }) => (
  <div className={`bg-gray-200 dark:bg-gray-800 rounded animate-pulse ${className}`} />
);

export default Skeleton;
