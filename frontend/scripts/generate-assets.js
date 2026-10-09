import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

const categoriesDir = path.join(publicDir, 'images/categories');
const productsDir = path.join(publicDir, 'images/products');
const homeDir = path.join(publicDir, 'images/home');
const usersDir = path.join(publicDir, 'images/users');

[categoriesDir, productsDir, homeDir, usersDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function renderSvgToPng(svgString, outputPath, width = 800, height = 800) {
  await sharp(Buffer.from(svgString))
    .resize(width, height)
    .png()
    .toFile(outputPath);
}

// ==========================================
// 1. CATEGORY ICONS (SVG)
// ==========================================

const categoryIcons = {
  'electronics.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2"/>
      <rect x="30" y="24" width="40" height="52" rx="6" fill="#2563EB"/>
      <rect x="34" y="30" width="32" height="38" rx="2" fill="#DBEAFE"/>
      <circle cx="50" cy="71" r="2.5" fill="#FFFFFF"/>
    </svg>
  `,
  'fashion.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="#FDF2F8" stroke="#EC4899" stroke-width="2"/>
      <path d="M35 30 L43 38 C47 40 53 40 57 38 L65 30 L74 38 L68 46 L68 74 L32 74 L32 46 L26 38 Z" fill="#DB2777"/>
      <path d="M43 38 C47 42 53 42 57 38" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  'home-living.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2"/>
      <path d="M50 24 L24 45 L30 45 L30 74 L70 74 L70 45 L76 45 Z" fill="#D97706"/>
      <rect x="42" y="52" width="16" height="22" rx="2" fill="#FEF3C7"/>
    </svg>
  `,
  'beauty.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="#FFF1F2" stroke="#F43F5E" stroke-width="2"/>
      <rect x="40" y="46" width="20" height="28" rx="3" fill="#E11D48"/>
      <path d="M44 46 L44 34 L56 26 L56 46 Z" fill="#FB7185"/>
      <rect x="42" y="42" width="16" height="4" fill="#FDA4AF"/>
    </svg>
  `,
  'sports.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#10B981" stroke-width="2"/>
      <circle cx="50" cy="50" r="24" fill="#059669"/>
      <path d="M35 37 C42 45 42 55 35 63 M65 37 C58 45 58 55 65 63 M30 50 L70 50" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,
  'books.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="#EEF2FF" stroke="#6366F1" stroke-width="2"/>
      <path d="M50 36 C42 32 32 34 26 36 L26 70 C32 68 42 66 50 70 C58 66 68 68 74 70 L74 36 C68 34 58 32 50 36 Z" fill="#4F46E5"/>
      <line x1="50" y1="36" x2="50" y2="70" stroke="#FFFFFF" stroke-width="2"/>
    </svg>
  `,
  'toys.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#FBBF24" stroke-width="2"/>
      <circle cx="50" cy="46" r="16" fill="#F59E0B"/>
      <circle cx="36" cy="34" r="7" fill="#F59E0B"/>
      <circle cx="64" cy="34" r="7" fill="#F59E0B"/>
      <circle cx="45" cy="43" r="2" fill="#FFFFFF"/>
      <circle cx="55" cy="43" r="2" fill="#FFFFFF"/>
      <ellipse cx="50" cy="50" rx="4" ry="2.5" fill="#78350F"/>
      <path d="M36 62 C36 58 44 56 50 56 C56 56 64 58 64 62 L64 74 L36 74 Z" fill="#D97706"/>
    </svg>
  `,
  'automotive.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="#F1F5F9" stroke="#64748B" stroke-width="2"/>
      <path d="M28 54 L36 40 L64 40 L72 54 L76 56 L76 66 L72 66 M24 66 L24 56 L28 54" fill="#334155" stroke="#334155" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="36" cy="66" r="6" fill="#0F172A"/>
      <circle cx="64" cy="66" r="6" fill="#0F172A"/>
      <circle cx="36" cy="66" r="2" fill="#FFFFFF"/>
      <circle cx="64" cy="66" r="2" fill="#FFFFFF"/>
      <polygon points="38,42 62,42 66,52 34,52" fill="#94A3B8"/>
    </svg>
  `,
  'smartphones.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <rect x="32" y="20" width="36" height="60" rx="8" fill="#1E293B"/>
      <rect x="36" y="26" width="28" height="46" rx="3" fill="#38BDF8"/>
      <circle cx="50" cy="75" r="2" fill="#94A3B8"/>
      <rect x="46" y="22" width="8" height="2" rx="1" fill="#64748B"/>
    </svg>
  `,
  'laptops.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <rect x="26" y="28" width="48" height="34" rx="4" fill="#1E293B"/>
      <rect x="30" y="32" width="40" height="26" rx="2" fill="#60A5FA"/>
      <path d="M18 64 L82 64 L78 70 L22 70 Z" fill="#475569"/>
      <rect x="42" y="65" width="16" height="2" rx="1" fill="#94A3B8"/>
    </svg>
  `,
  'headphones.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <path d="M26 50 C26 34 36 24 50 24 C64 24 74 34 74 50" stroke="#1E293B" stroke-width="6" stroke-linecap="round"/>
      <rect x="20" y="46" width="12" height="24" rx="6" fill="#2563EB"/>
      <rect x="68" y="46" width="12" height="24" rx="6" fill="#2563EB"/>
    </svg>
  `,
  'smart-watches.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <rect x="40" y="14" width="20" height="72" rx="6" fill="#64748B"/>
      <rect x="32" y="32" width="36" height="36" rx="10" fill="#0F172A" stroke="#334155" stroke-width="2"/>
      <circle cx="50" cy="50" r="14" fill="#3B82F6" opacity="0.2"/>
      <circle cx="50" cy="50" r="3" fill="#60A5FA"/>
      <line x1="50" y1="50" x2="50" y2="42" stroke="#60A5FA" stroke-width="2" stroke-linecap="round"/>
      <line x1="50" y1="50" x2="56" y2="50" stroke="#60A5FA" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  'tablets.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <rect x="24" y="20" width="52" height="60" rx="6" fill="#1E293B"/>
      <rect x="28" y="24" width="44" height="52" rx="3" fill="#A78BFA"/>
      <circle cx="50" cy="77" r="1.5" fill="#E2E8F0"/>
    </svg>
  `,
};

Object.entries(categoryIcons).forEach(([filename, svg]) => {
  fs.writeFileSync(path.join(categoriesDir, filename), svg.trim());
});
console.log('Category SVGs created.');

// ==========================================
// 2. TRUST / HOME ICONS (SVG)
// ==========================================

const trustIcons = {
  'trust-delivery.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#EFF6FF"/>
      <path d="M10 16H24V26H10V16Z" stroke="#2563EB" stroke-width="2" stroke-linejoin="round"/>
      <path d="M24 19H29L32 22V26H24V19Z" stroke="#2563EB" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="15" cy="27" r="2.5" stroke="#2563EB" stroke-width="2" fill="#FFFFFF"/>
      <circle cx="28" cy="27" r="2.5" stroke="#2563EB" stroke-width="2" fill="#FFFFFF"/>
    </svg>
  `,
  'trust-return.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#EFF6FF"/>
      <path d="M26 18A8 8 0 1 0 28 22" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/>
      <path d="M26 14V18H30" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="20" y="24" font-size="7" font-weight="bold" fill="#2563EB" text-anchor="middle" font-family="sans-serif">7D</text>
    </svg>
  `,
  'trust-security.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#EFF6FF"/>
      <path d="M20 11L28 14V20C28 25 24 28 20 29C16 28 12 25 12 20V14L20 11Z" stroke="#2563EB" stroke-width="2" stroke-linejoin="round"/>
      <path d="M17 20L19 22L23 18" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  'trust-quality.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#EFF6FF"/>
      <circle cx="20" cy="19" r="7" stroke="#2563EB" stroke-width="2"/>
      <path d="M17 26L20 24L23 26V30L20 28L17 30V26Z" fill="#2563EB"/>
      <path d="M18 19L19.5 20.5L22.5 17.5" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `,
};

Object.entries(trustIcons).forEach(([filename, svg]) => {
  fs.writeFileSync(path.join(homeDir, filename), svg.trim());
});
console.log('Trust badge SVGs created.');

// ==========================================
// 3. HOME HERO BANNER (PNG)
// ==========================================

const heroBannerSvg = `
<svg width="1200" height="500" viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="50%" stop-color="#1E3A8A"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#2563EB" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="500" rx="28" fill="url(#heroGrad)"/>
  <circle cx="950" cy="250" r="220" fill="url(#glowGrad)"/>

  <!-- Left Text Content -->
  <text x="80" y="170" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="52" letter-spacing="-1">Shop Smart.</text>
  <text x="80" y="235" fill="#38BDF8" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="52" letter-spacing="-1">Live Better.</text>
  
  <text x="80" y="295" fill="#E2E8F0" font-family="Inter, system-ui, sans-serif" font-weight="500" font-size="20">Top brands. Great prices.</text>
  <text x="80" y="325" fill="#E2E8F0" font-family="Inter, system-ui, sans-serif" font-weight="500" font-size="20">Everything you need, all in one place.</text>

  <!-- Button Badge Mockup -->
  <rect x="80" y="365" width="160" height="52" rx="26" fill="#FFFFFF"/>
  <text x="160" y="398" fill="#1E3A8A" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="17" text-anchor="middle">Shop Now</text>

  <!-- Right Visual: Headphones Silhouette Graphic -->
  <g transform="translate(850, 150) scale(1.6)">
    <path d="M-10 60 C-10 10 30 -20 80 -20 C130 -20 170 10 170 60" fill="none" stroke="#E2E8F0" stroke-width="14" stroke-linecap="round"/>
    <ellipse cx="-12" cy="75" rx="18" ry="32" fill="#0F172A" stroke="#38BDF8" stroke-width="4"/>
    <ellipse cx="172" cy="75" rx="18" ry="32" fill="#0F172A" stroke="#38BDF8" stroke-width="4"/>
  </g>
</svg>
`;

await renderSvgToPng(heroBannerSvg, path.join(homeDir, 'hero-banner.png'), 1200, 500);
console.log('Hero banner created.');

// ==========================================
// 4. USER AVATARS (PNG)
// ==========================================

const johnDoeSvg = `
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="100" fill="#2563EB"/>
  <circle cx="100" cy="80" r="36" fill="#FFFFFF"/>
  <path d="M40 180 C40 135 70 125 100 125 C130 125 160 135 160 180 Z" fill="#FFFFFF"/>
</svg>
`;
await renderSvgToPng(johnDoeSvg, path.join(usersDir, 'john-doe.png'), 200, 200);

const adminSvg = `
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="100" fill="#0F172A"/>
  <circle cx="100" cy="80" r="36" fill="#F59E0B"/>
  <path d="M40 180 C40 135 70 125 100 125 C130 125 160 135 160 180 Z" fill="#F59E0B"/>
</svg>
`;
await renderSvgToPng(adminSvg, path.join(usersDir, 'admin.png'), 200, 200);
console.log('User avatars created.');

// ==========================================
// 5. PRODUCT PNG ASSETS
// ==========================================

// Create alternate iPhone 15 image (front view)
const iphone15AltSvg = `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#F8FAFC"/>
  <!-- Phone Body -->
  <rect x="270" y="100" width="260" height="580" rx="46" fill="#FCE7F3" stroke="#F472B6" stroke-width="4"/>
  <!-- Screen Bezel -->
  <rect x="282" y="112" width="236" height="556" rx="38" fill="#020617"/>
  <!-- Display Wallpaper -->
  <rect x="284" y="114" width="232" height="552" rx="36" fill="#18181B"/>
  <!-- Dynamic Island -->
  <rect x="360" y="130" width="80" height="24" rx="12" fill="#000000"/>
  <circle cx="425" cy="142" r="4" fill="#1E293B"/>
  <!-- Screen Wallpaper Gradient Art -->
  <ellipse cx="400" cy="400" rx="90" ry="160" fill="#F472B6" opacity="0.3"/>
  <text x="400" y="580" fill="#FFFFFF" opacity="0.7" font-family="sans-serif" font-weight="600" font-size="20" text-anchor="middle">Apple iPhone 15</text>
</svg>
`;
await renderSvgToPng(iphone15AltSvg, path.join(productsDir, 'apple-iphone-15-128gb-2.png'));

// OnePlus 12R 128GB
const oneplus12rSvg = `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#F8FAFC"/>
  <!-- Phone Body -->
  <rect x="270" y="100" width="260" height="580" rx="42" fill="#0284C7" stroke="#38BDF8" stroke-width="4"/>
  <!-- Circular Camera Deco -->
  <circle cx="340" cy="220" r="60" fill="#0369A1" stroke="#BAE6FD" stroke-width="3"/>
  <circle cx="320" cy="200" r="18" fill="#0C4A6E" stroke="#38BDF8" stroke-width="2"/>
  <circle cx="360" cy="200" r="18" fill="#0C4A6E" stroke="#38BDF8" stroke-width="2"/>
  <circle cx="340" cy="240" r="18" fill="#0C4A6E" stroke="#38BDF8" stroke-width="2"/>
  <text x="400" y="550" fill="#FFFFFF" opacity="0.9" font-family="sans-serif" font-weight="bold" font-size="22" text-anchor="middle">OnePlus 12R</text>
  <text x="400" y="580" fill="#BAE6FD" opacity="0.9" font-family="sans-serif" font-size="16" text-anchor="middle">Cool Blue • 128GB</text>
</svg>
`;
await renderSvgToPng(oneplus12rSvg, path.join(productsDir, 'oneplus-12r-128gb-1.png'));

// Xiaomi 14 128GB
const xiaomi14Svg = `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#F8FAFC"/>
  <!-- Phone Body -->
  <rect x="270" y="100" width="260" height="580" rx="38" fill="#065F46" stroke="#10B981" stroke-width="4"/>
  <!-- Square Leica Camera Island -->
  <rect x="290" y="130" width="130" height="130" rx="20" fill="#064E3B" stroke="#34D399" stroke-width="3"/>
  <circle cx="325" cy="165" r="22" fill="#022C22" stroke="#6EE7B7" stroke-width="2"/>
  <circle cx="385" cy="165" r="22" fill="#022C22" stroke="#6EE7B7" stroke-width="2"/>
  <circle cx="325" cy="225" r="22" fill="#022C22" stroke="#6EE7B7" stroke-width="2"/>
  <text x="385" y="230" fill="#EF4444" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle">LEICA</text>
  <text x="400" y="550" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="22" text-anchor="middle">Xiaomi 14</text>
  <text x="400" y="580" fill="#A7F3D0" font-family="sans-serif" font-size="16" text-anchor="middle">Jade Green • 128GB</text>
</svg>
`;
await renderSvgToPng(xiaomi14Svg, path.join(productsDir, 'xiaomi-14-128gb-1.png'));

// Nothing Phone (2a) 128GB
const nothingPhoneSvg = `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#F8FAFC"/>
  <!-- Phone Body Transparent White -->
  <rect x="270" y="100" width="260" height="580" rx="42" fill="#F1F5F9" stroke="#94A3B8" stroke-width="4"/>
  <!-- Transparent internal lines -->
  <circle cx="400" cy="230" r="65" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="3"/>
  <!-- Dual horizontal camera eyes -->
  <rect x="350" y="215" width="100" height="40" rx="20" fill="#0F172A"/>
  <circle cx="375" cy="235" r="14" fill="#334155" stroke="#FFFFFF" stroke-width="2"/>
  <circle cx="425" cy="235" r="14" fill="#334155" stroke="#FFFFFF" stroke-width="2"/>
  <!-- Glyph lights -->
  <path d="M320 180 C360 160 440 160 480 180" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>
  <text x="400" y="550" fill="#0F172A" font-family="sans-serif" font-weight="bold" font-size="22" text-anchor="middle">Nothing Phone (2a)</text>
  <text x="400" y="580" fill="#64748B" font-family="sans-serif" font-size="16" text-anchor="middle">Glyph Interface • 128GB</text>
</svg>
`;
await renderSvgToPng(nothingPhoneSvg, path.join(productsDir, 'nothing-phone-2a-128gb-1.png'));

// Google Pixel 8 128GB
const pixel8Svg = `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#F8FAFC"/>
  <!-- Phone Body Hazel -->
  <rect x="270" y="100" width="260" height="580" rx="44" fill="#64748B" stroke="#475569" stroke-width="4"/>
  <!-- Iconic Camera Bar Visor -->
  <rect x="264" y="200" width="272" height="70" rx="16" fill="#334155" stroke="#94A3B8" stroke-width="3"/>
  <!-- Pill cutout for dual lenses -->
  <rect x="290" y="215" width="70" height="38" rx="19" fill="#020617"/>
  <circle cx="310" cy="234" r="12" fill="#1E293B"/>
  <circle cx="340" cy="234" r="12" fill="#1E293B"/>
  <circle cx="490" cy="235" r="8" fill="#F8FAFC"/>
  <!-- G logo -->
  <text x="400" y="440" fill="#E2E8F0" font-family="sans-serif" font-weight="bold" font-size="40" text-anchor="middle">G</text>
  <text x="400" y="550" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="22" text-anchor="middle">Google Pixel 8</text>
  <text x="400" y="580" fill="#CBD5E1" font-family="sans-serif" font-size="16" text-anchor="middle">Hazel • 128GB</text>
</svg>
`;
await renderSvgToPng(pixel8Svg, path.join(productsDir, 'google-pixel-8-128gb-1.png'));

// Dell Inspiron 15
const dellInspironSvg = `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#F8FAFC"/>
  <!-- Laptop Display -->
  <rect x="180" y="160" width="440" height="290" rx="14" fill="#1E293B" stroke="#94A3B8" stroke-width="4"/>
  <!-- Screen Area -->
  <rect x="196" y="176" width="408" height="258" rx="6" fill="#0284C7"/>
  <!-- Screen Wallpaper Visual -->
  <ellipse cx="400" cy="305" rx="140" ry="70" fill="#38BDF8" opacity="0.4"/>
  <text x="400" y="310" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="24" text-anchor="middle">Dell Inspiron 15</text>
  <text x="400" y="340" fill="#E0F2FE" font-family="sans-serif" font-size="16" text-anchor="middle">Intel Core 13th Gen • 16GB RAM</text>
  
  <!-- Base Keyboard Hinge -->
  <polygon points="120,490 680,490 650,455 150,455" fill="#CBD5E1" stroke="#94A3B8" stroke-width="3"/>
  <rect x="330" y="465" width="140" height="15" rx="3" fill="#94A3B8"/>
</svg>
`;
await renderSvgToPng(dellInspironSvg, path.join(productsDir, 'dell-inspiron-15-1.png'));

// Nike Air Max 270
const nikeAirMaxSvg = `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#F8FAFC"/>
  <!-- Sneaker Body Profile -->
  <path d="M160 480 C160 450 200 420 280 400 C340 380 420 320 490 320 C540 320 570 350 590 400 C620 480 640 500 640 520 C640 540 600 550 500 550 C320 550 160 550 160 480 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="5"/>
  <!-- Big 270 Air Unit at heel -->
  <ellipse cx="230" cy="510" rx="55" ry="32" fill="#0284C7" stroke="#0369A1" stroke-width="4"/>
  <!-- Nike Swoosh -->
  <path d="M380 420 C420 440 470 440 500 400 C470 425 430 425 380 420 Z" fill="#0F172A"/>
  <!-- Sneaker Collar & Tongue -->
  <path d="M480 320 L440 370 L520 380 Z" fill="#0F172A"/>
  <text x="400" y="620" fill="#0F172A" font-family="sans-serif" font-weight="bold" font-size="24" text-anchor="middle">Nike Air Max 270</text>
  <text x="400" y="650" fill="#64748B" font-family="sans-serif" font-size="16" text-anchor="middle">White / Black • Max Air Cushioning</text>
</svg>
`;
await renderSvgToPng(nikeAirMaxSvg, path.join(productsDir, 'nike-air-max-270-1.png'));

// Apple iPad Air 11-inch (M2)
const ipadAirSvg = `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#F8FAFC"/>
  <!-- Tablet Body -->
  <rect x="200" y="120" width="400" height="560" rx="30" fill="#334155" stroke="#64748B" stroke-width="4"/>
  <!-- Liquid Retina Screen -->
  <rect x="220" y="140" width="360" height="520" rx="20" fill="#6366F1"/>
  <!-- Screen Wallpaper Visual -->
  <circle cx="400" cy="400" r="120" fill="#818CF8" opacity="0.4"/>
  <circle cx="400" cy="400" r="60" fill="#A5B4FC" opacity="0.6"/>
  <text x="400" y="390" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="26" text-anchor="middle">iPad Air 11″</text>
  <text x="400" y="425" fill="#E0E7FF" font-family="sans-serif" font-size="17" text-anchor="middle">Apple M2 Chip</text>
</svg>
`;
await renderSvgToPng(ipadAirSvg, path.join(productsDir, 'apple-ipad-air-11-1.png'));

// Samsung Galaxy Watch 6
const galaxyWatchSvg = `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#F8FAFC"/>
  <!-- Silicone Strap Top & Bottom -->
  <rect x="340" y="80" width="120" height="640" rx="20" fill="#1E293B"/>
  <!-- Watch Dial Bezel -->
  <circle cx="400" cy="400" r="150" fill="#0F172A" stroke="#475569" stroke-width="8"/>
  <!-- Screen Display -->
  <circle cx="400" cy="400" r="130" fill="#0284C7"/>
  <circle cx="400" cy="400" r="110" fill="#0F172A"/>
  <!-- Clock Face -->
  <text x="400" y="390" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="44" text-anchor="middle">10:09</text>
  <text x="400" y="430" fill="#38BDF8" font-family="sans-serif" font-size="18" text-anchor="middle">GALAXY WATCH 6</text>
</svg>
`;
await renderSvgToPng(galaxyWatchSvg, path.join(productsDir, 'samsung-galaxy-watch-6-1.png'));

// Apple MacBook Air M2
const macbookAirSvg = `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#F8FAFC"/>
  <!-- Display Lid Midnight -->
  <rect x="180" y="160" width="440" height="290" rx="14" fill="#0F172A" stroke="#334155" stroke-width="4"/>
  <!-- Screen -->
  <rect x="194" y="174" width="412" height="262" rx="8" fill="#1E293B"/>
  <!-- Notch -->
  <rect x="375" y="174" width="50" height="12" rx="4" fill="#0F172A"/>
  <text x="400" y="305" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="24" text-anchor="middle">MacBook Air</text>
  <text x="400" y="335" fill="#94A3B8" font-family="sans-serif" font-size="16" text-anchor="middle">M2 Chip • Midnight</text>
  <!-- Base Keyboard Hinge -->
  <polygon points="120,490 680,490 650,455 150,455" fill="#1E293B" stroke="#334155" stroke-width="3"/>
  <rect x="330" y="465" width="140" height="15" rx="3" fill="#334155"/>
</svg>
`;
await renderSvgToPng(macbookAirSvg, path.join(productsDir, 'apple-macbook-air-m2-1.png'));

// boAt Airdopes 141
const boatAirdopesSvg = `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#F8FAFC"/>
  <!-- Charging Case -->
  <rect x="250" y="240" width="300" height="260" rx="60" fill="#111827" stroke="#374151" stroke-width="6"/>
  <path d="M250 340 L550 340" stroke="#374151" stroke-width="4"/>
  <!-- boAt Logo style anchor / text -->
  <circle cx="400" cy="410" r="18" fill="#EF4444"/>
  <text x="400" y="416" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="16" text-anchor="middle">boAt</text>
  <text x="400" y="570" fill="#111827" font-family="sans-serif" font-weight="bold" font-size="24" text-anchor="middle">boAt Airdopes 141</text>
  <text x="400" y="600" fill="#6B7280" font-family="sans-serif" font-size="16" text-anchor="middle">42H Playtime • Beast Mode</text>
</svg>
`;
await renderSvgToPng(boatAirdopesSvg, path.join(productsDir, 'boat-airdopes-141-1.png'));

console.log('All product images generated successfully!');
