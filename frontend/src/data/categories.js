/**
 * Shopora Categories Data
 * Derived directly from reference design (Home desktop category strip & Product listing filter).
 */

export const mainCategories = [
  {
    id: 'cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Gadgets, phones, audio, laptops & accessories',
    image: '/images/categories/electronics.svg',
    productCount: 48,
    featured: true,
  },
  {
    id: 'cat-fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Men, women, footwear & trending apparel',
    image: '/images/categories/fashion.svg',
    productCount: 32,
    featured: true,
  },
  {
    id: 'cat-home-living',
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Decor, furniture, kitchenware & essentials',
    image: '/images/categories/home-living.svg',
    productCount: 24,
    featured: true,
  },
  {
    id: 'cat-beauty',
    name: 'Beauty',
    slug: 'beauty',
    description: 'Skincare, makeup, fragrance & personal care',
    image: '/images/categories/beauty.svg',
    productCount: 18,
    featured: true,
  },
  {
    id: 'cat-sports',
    name: 'Sports',
    slug: 'sports',
    description: 'Fitness gear, activewear & outdoor equipment',
    image: '/images/categories/sports.svg',
    productCount: 15,
    featured: true,
  },
  {
    id: 'cat-books',
    name: 'Books',
    slug: 'books',
    description: 'Best sellers, fiction, academic & self-help',
    image: '/images/categories/books.svg',
    productCount: 12,
    featured: true,
  },
  {
    id: 'cat-toys',
    name: 'Toys',
    slug: 'toys',
    description: 'Games, educational toys, puzzles & hobbies',
    image: '/images/categories/toys.svg',
    productCount: 14,
    featured: true,
  },
  {
    id: 'cat-automotive',
    name: 'Automotive',
    slug: 'automotive',
    description: 'Car accessories, bike care & maintenance',
    image: '/images/categories/automotive.svg',
    productCount: 9,
    featured: true,
  },
];

export const listingCategories = [
  {
    id: 'subcat-smartphones',
    name: 'Smartphones',
    slug: 'smartphones',
    parentCategory: 'electronics',
    productCount: 24,
    image: '/images/categories/smartphones.svg',
  },
  {
    id: 'subcat-laptops',
    name: 'Laptops',
    slug: 'laptops',
    parentCategory: 'electronics',
    productCount: 18,
    image: '/images/categories/laptops.svg',
  },
  {
    id: 'subcat-headphones',
    name: 'Headphones',
    slug: 'headphones',
    parentCategory: 'electronics',
    productCount: 12,
    image: '/images/categories/headphones.svg',
  },
  {
    id: 'subcat-smart-watches',
    name: 'Smart Watches',
    slug: 'smart-watches',
    parentCategory: 'electronics',
    productCount: 10,
    image: '/images/categories/smart-watches.svg',
  },
  {
    id: 'subcat-tablets',
    name: 'Tablets',
    slug: 'tablets',
    parentCategory: 'electronics',
    productCount: 8,
    image: '/images/categories/tablets.svg',
  },
];

export const allCategories = [...mainCategories, ...listingCategories];

export default mainCategories;
