/**
 * Shopora Mock Data Service
 * Provides access to products, categories, orders, users, and addresses.
 * Fully decoupled from backend to support instant local UI development and testing.
 */

import { mockProducts } from '../data/products.js';
import { mainCategories, listingCategories, allCategories } from '../data/categories.js';
import { mockOrders } from '../data/orders.js';
import { mockUsers, currentUser } from '../data/users.js';
import { mockAddresses } from '../data/addresses.js';

// In-memory wishlist ids matching reference Panel 8
let wishlistIds = [
  'prod-apple-iphone-15-128gb',
  'prod-sony-wh-1000xm5',
  'prod-dell-inspiron-15',
];

/**
 * Get all products with optional filtering and sorting
 * Supports reference search/filter sidebar (Panel 2)
 */
export function getProducts(options = {}) {
  const {
    category,
    subcategory,
    brand,
    search,
    minPrice,
    maxPrice,
    minRating,
    inStockOnly,
    featuredOnly,
    dealsOnly,
    sortBy = 'featured', // 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'
  } = options;

  let results = [...mockProducts];

  if (category) {
    results = results.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (subcategory) {
    results = results.filter(
      (p) => p.subcategory.toLowerCase() === subcategory.toLowerCase()
    );
  }

  if (brand) {
    const brands = Array.isArray(brand) ? brand : [brand];
    results = results.filter((p) =>
      brands.some((b) => b.toLowerCase() === p.brand.toLowerCase())
    );
  }

  if (search && search.trim()) {
    const query = search.trim().toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.subcategory.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  if (typeof minPrice === 'number') {
    results = results.filter((p) => p.price >= minPrice);
  }

  if (typeof maxPrice === 'number') {
    results = results.filter((p) => p.price <= maxPrice);
  }

  if (typeof minRating === 'number') {
    results = results.filter((p) => p.rating >= minRating);
  }

  if (inStockOnly) {
    results = results.filter((p) => p.stock > 0);
  }

  if (featuredOnly) {
    results = results.filter((p) => p.featured);
  }

  if (dealsOnly) {
    results = results.filter((p) => p.deal);
  }

  // Sorting
  switch (sortBy) {
    case 'price-low':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'discount':
      results.sort((a, b) => b.discountPercent - a.discountPercent);
      break;
    case 'featured':
    default:
      results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }

  return results;
}

export function getProductById(id) {
  return mockProducts.find((p) => p.id === id) || null;
}

export function getProductBySlug(slug) {
  return mockProducts.find((p) => p.slug === slug) || null;
}

export function getFeaturedProducts() {
  return mockProducts.filter((p) => p.featured);
}

export function getDealProducts() {
  return mockProducts.filter((p) => p.deal);
}

export function getCategories() {
  return allCategories;
}

export function getMainCategories() {
  return mainCategories;
}

export function getListingCategories() {
  return listingCategories;
}

export function getCategoryBySlug(slug) {
  return allCategories.find((c) => c.slug === slug) || null;
}

export function getOrders() {
  return mockOrders;
}

export function getOrderById(id) {
  return mockOrders.find((o) => o.id === id || o.orderNumber === id) || null;
}

export function getUsers() {
  return mockUsers;
}

export function getCurrentUser() {
  return currentUser;
}

export function getAddresses() {
  return mockAddresses;
}

export function getWishlist() {
  return [...wishlistIds];
}

export function getWishlistProducts() {
  return mockProducts.filter((p) => wishlistIds.includes(p.id));
}

export function getLowStockProducts(threshold = 5) {
  return mockProducts.filter((p) => p.stock <= threshold || p.adminLowStockAlert <= threshold);
}

export default {
  getProducts,
  getProductById,
  getProductBySlug,
  getFeaturedProducts,
  getDealProducts,
  getCategories,
  getMainCategories,
  getListingCategories,
  getCategoryBySlug,
  getOrders,
  getOrderById,
  getUsers,
  getCurrentUser,
  getAddresses,
  getWishlist,
  getWishlistProducts,
  getLowStockProducts,
};
