import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Award } from 'lucide-react';

const TrustBar = () => {
  const items = [
    {
      icon: Truck,
      title: 'Free Delivery',
      subtitle: 'On orders over ₹499',
    },
    {
      icon: RotateCcw,
      title: '7-Day Return',
      subtitle: 'Easy returns & refunds',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payment',
      subtitle: '100% safe & secure',
    },
    {
      icon: Award,
      title: 'Genuine Products',
      subtitle: 'Quality you can trust',
    },
  ];

  return (
    <div className="bg-white dark:bg-[#111827] border-y border-gray-100 dark:border-gray-800/80 py-5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 group">
                <div className="w-11 h-11 rounded-full bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
