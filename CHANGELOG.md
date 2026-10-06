# Changelog — Shopora Modernization

All notable changes to the Shopora e-commerce ecosystem are documented in this file.

---

## [1.0.0] - 2026-10-06

### Initial Audit & Inspection
- Audited `Backend 1` (Spring Boot 3.3.4, H2 in-memory DB, `imageDate` spelling bug, direct entity exposure) and `Backend 2` (Spring Boot 3.3.4, PostgreSQL, missing JWT security, no DTO layer, direct entity exposure).
- Preserved both `Backend 1` and `Backend 2` as read-only reference implementations.

### Backend Merge & Architecture
- Initialized clean monolithic backend at `backend/` under package `com.shopora`.
- Migrated domain models: `User`, `Role`, `Product`, `Category`, `Address`, `CartItem`, `Order`, `OrderItem`, `OrderStatus`, `WishlistItem`.
- Standardized pure Java POJO implementations with manual getters/setters/constructors to guarantee 100% build reliability and eliminate any IDE/annotation processor incompatibilities.
- Converted all controllers to DTO-only contracts (`RegisterRequest`, `LoginRequest`, `AuthResponse`, `ProductRequest`, `ProductResponse`, `CategoryRequest`, `CategoryResponse`, `CartResponse`, `OrderRequest`, `OrderResponse`, `AddressRequest`, `AddressResponse`, `DashboardSummaryResponse`, `ApiResponse`).
- Implemented `@RestControllerAdvice` global exception handling (`GlobalExceptionHandler`) for validation, auth errors, duplicate keys, and resource not found.

### Database & Seeding
- Standardized persistence on MySQL (`ecom_db` with `createDatabaseIfNotExist=true`).
- Dynamic dialect configuration enabling H2 for in-memory unit tests and MySQL for local/production environments.
- Implemented transactional database seeder (`DataInitializer`) inserting sample electronics, fashion, home, beauty, sports, books, toys, and automotive items with stock levels, categories, and BCrypt-hashed credentials.
- Guarded seeder to prevent duplicate insertions on subsequent application launches.

### Security
- Upgraded to modern Spring Security 6 `SecurityFilterChain` (`jakarta.*`).
- Integrated stateless JWT authentication (`JwtTokenProvider`, `JwtAuthenticationFilter`, `JwtAuthEntryPoint`) with configurable secrets and expiration.
- Configured role-based access control (`ROLE_USER`, `ROLE_ADMIN`).
- Enforced server-authoritative checkout totals and stock reduction in transactional boundary (`@Transactional`), neutralizing client-side price tampering.

### Frontend Modernization & Rebranding
- Fully rebranded from legacy names to **Shopora** (*Shop Smart. Live Better.*).
- Upgraded frontend build stack to React 18, Vite 5, Tailwind CSS 3, and React Router 6.
- Created centralized Axios HTTP client with request interceptors for Bearer tokens and response interceptors for 401 unauthenticated session handling.
- Rebuilt all 16 screens matching `Shopora E-Commerce UI Design.png`:
  - Screen 1: Home Page (Desktop with Hero Carousel, Deals, Category Chips, Trust Bar)
  - Screen 2: Product Listing Page (Desktop with Filter Sidebar, Sort, and Pagination)
  - Screen 3: Product Details Page (Desktop with Gallery, Stock Status, Quantity, Trust Row)
  - Screen 4: Cart Page (Desktop with Qty Controls, Price Breakdown, Clear Cart)
  - Screen 5: Checkout Page (Desktop with 3-Step Stepper, Address Selector, Delivery & Mock Payment)
  - Screen 6: Order Success & Tracking (Desktop with 5-step status timeline)
  - Screen 7: My Orders Page (Desktop with Tabbed Order History)
  - Screen 8: Wishlist Page (Desktop with Quick Add-to-Cart)
  - Screen 9: Mobile Menu (Drawer Navigation)
  - Screen 10: Login Page (Desktop 2-Column with Illustration)
  - Screen 11: Register Page (Desktop 2-Column with Form Validation)
  - Screen 12: Address Book Page (Desktop with Default Badges and Modal)
  - Screen 13: Admin Dashboard (Desktop with Dark Sidebar, Metrics, Sales Chart, and Catalog/Order CRUD)
  - Screen 14: Dark Mode Home Page (Full Dark Theme Support)
  - Screen 15: Footer (Desktop with Brand, Links, Socials, Copyright)
  - Screen 16: Design System (Interactive Tokens, Buttons, Badges, Typography Gallery)

### Verification & Testing
- Unit & Mockito test suite created for `AuthService`, `ProductService`, `CartService`, `OrderService`, and context bootstrap.
- All backend tests passed (`mvn test` -> 0 failures, 0 errors).
