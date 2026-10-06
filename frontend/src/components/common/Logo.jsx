import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../../config/brand';

const Logo = ({ size = 'md', showTagline = true, light = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <Link to="/" className="flex items-center gap-2.5 group select-none">
      {/* Brand Shopping Bag SVG Icon matching reference design */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 shadow-md shadow-indigo-500/20 text-white font-bold transition-transform duration-300 group-hover:scale-105 ${iconSizes[size]}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-indigo-950 to-indigo-700 dark:from-white dark:via-gray-100 dark:to-indigo-300 bg-clip-text text-transparent leading-none ${textSizes[size]}`}>
          {BRAND.name}
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium text-gray-400 dark:text-gray-400 tracking-wider mt-0.5">
            {BRAND.tagline}
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;
