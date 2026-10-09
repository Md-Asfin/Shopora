import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getProducts, getCategories, getOrders, getUsers, getAddresses, getDealProducts, getFeaturedProducts, getLowStockProducts } from '../src/services/mockDataService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

console.log('--- STARTING VERIFICATION ---');

const products = getProducts();
console.log('✓ Products loaded:', products.length);

let missingImages = 0;
for (const p of products) {
  for (const img of p.images) {
    const fullPath = path.resolve(publicDir, img.replace(/^\//, ''));
    if (!fs.existsSync(fullPath)) {
      console.error('✗ Missing product image:', img, 'for:', p.name);
      missingImages++;
    }
  }
  const thumbPath = path.resolve(publicDir, p.thumbnail.replace(/^\//, ''));
  if (!fs.existsSync(thumbPath)) {
    console.error('✗ Missing thumbnail:', p.thumbnail, 'for:', p.name);
    missingImages++;
  }
}

const categories = getCategories();
console.log('✓ Categories loaded:', categories.length);
for (const c of categories) {
  const fullPath = path.resolve(publicDir, c.image.replace(/^\//, ''));
  if (!fs.existsSync(fullPath)) {
    console.error('✗ Missing category image:', c.image, 'for:', c.name);
    missingImages++;
  }
}

const orders = getOrders();
console.log('✓ Orders loaded:', orders.length);

const users = getUsers();
console.log('✓ Users loaded:', users.length);

const addresses = getAddresses();
console.log('✓ Addresses loaded:', addresses.length);

const deals = getDealProducts();
console.log('✓ Deal products:', deals.length);

const featured = getFeaturedProducts();
console.log('✓ Featured products:', featured.length);

const lowStock = getLowStockProducts();
console.log('✓ Low stock products:', lowStock.length);

if (missingImages === 0) {
  console.log('✓ ALL ASSET PATHS RESOLVED SUCCESSFULLY! 0 MISSING ASSETS.');
} else {
  console.error(`✗ Total missing assets: ${missingImages}`);
  process.exit(1);
}
