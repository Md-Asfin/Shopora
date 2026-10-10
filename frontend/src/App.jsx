import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';

/**
 * Root application shell.
 * Only the Navbar and HomePage are implemented in Step 2.
 * Remaining routes are stubs — they will be fleshed out in later steps.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Placeholder routes – implemented in subsequent steps */}
        <Route path="/products" element={<PlaceholderPage title="Products" />} />
        <Route path="/products/:slug" element={<PlaceholderPage title="Product Detail" />} />
        <Route path="/cart" element={<PlaceholderPage title="Cart" />} />
        <Route path="/wishlist" element={<PlaceholderPage title="Wishlist" />} />
        <Route path="/login" element={<PlaceholderPage title="Sign In" />} />
        <Route path="/register" element={<PlaceholderPage title="Create Account" />} />
        <Route path="/account" element={<PlaceholderPage title="My Account" />} />
        <Route path="/orders" element={<PlaceholderPage title="My Orders" />} />
        <Route path="/checkout" element={<PlaceholderPage title="Checkout" />} />
        <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
      </Routes>
    </div>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
      <img src="/images/brand/shopora-mark.svg" alt="Shopora" className="w-16 h-16 mb-4 opacity-80" />
      <h1 className="text-xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-sm text-gray-500">This page will be implemented in an upcoming step.</p>
    </div>
  );
}
