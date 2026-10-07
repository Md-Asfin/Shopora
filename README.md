# 🛍️ Shopora — E-Commerce Full-Stack Platform

> **Shop Smart. Live Better.**  
> A full-stack e-commerce solution built with **Spring Boot 3**, **Java 21**, **Spring Security (JWT)**, **MySQL**, **React 18**, **Vite**, and **Tailwind CSS**.

---

## 📖 Table of Contents
1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Architecture & Tech Stack](#-architecture--tech-stack)
4. [Project Structure](#-project-structure)
5. [Prerequisites & Requirements](#-prerequisites--requirements)
6. [Database Setup (MySQL)](#-database-setup-mysql)
7. [Environment Variables & Configuration](#-environment-variables--configuration)
8. [Running the Application](#-running-the-application)
9. [API Documentation & Swagger](#-api-documentation--swagger)
10. [Authentication & Security](#-authentication--security)
11. [Admin Dashboard & Store Management](#-admin-dashboard--store-management)
12. [Testing](#-testing)
13. [Troubleshooting & FAQ](#-troubleshooting--faq)
14. [License](#-license)

---

## 🌟 Project Overview
**Shopora** is an enterprise-grade e-commerce application designed to deliver an intuitive shopping experience. It features a stateless Spring Boot REST backend with DTO isolation, role-based JWT authorization, transactional checkout with stock decrement, and a responsive frontend implementing 16 distinct UI screens based on the *Shopora Design System*.

---

## ✨ Key Features
- 🚀 **16 Screen UI Design**: Faithfully implemented following the Shopora Design System (Home, Products, Details, Cart, Checkout, Success, Orders, Wishlist, Addresses, Admin, Login, Register, Dark Mode, etc.).
- 🛡️ **Stateless JWT Security**: BCrypt password hashing, configurable token validity, role-based authorization (`ROLE_USER`, `ROLE_ADMIN`).
- 🛒 **Authoritative Cart & Checkout**: All calculations (discounts, taxes, totals) are executed on the backend to prevent price tampering.
- 📦 **Stock Management**: Transactional inventory validation and decrement upon checkout with optimistic concurrency safety.
- 🔍 **Search, Filtering & Pagination**: Full server-side pagination, multi-attribute filtering (category, price range, stock status, ratings), and keyword search.
- 🌓 **Comprehensive Dark Mode**: Persistent theme toggle respecting user preferences and system settings.
- 📱 **Fully Responsive Layout**: Fluid mobile drawer navigation, responsive grids, and adaptive touch-friendly components.
- 📖 **Interactive OpenAPI / Swagger**: Built-in interactive API documentation at `/swagger-ui/index.html`.

---

## 🏗️ Architecture & Tech Stack

```
Frontend (React 18 + Vite + Tailwind CSS)
   │
   ▼ (REST API / JSON / Bearer JWT)
Spring Boot 3 REST API (Java 21)
   │
   ├── Security Filter Chain (JWT Auth & Role Authorization)
   ├── Controller Layer (DTO Mapping & Bean Validation)
   ├── Service Layer (Business Logic & @Transactional Boundaries)
   └── Repository Layer (Spring Data JPA)
   │
   ▼ (JDBC / MySQL Connector)
MySQL Database (ecom_db)
```

| Layer | Technology |
|---|---|
| **Backend Framework** | Spring Boot 3.3.4 (Java 21 LTS) |
| **Security** | Spring Security 6, JJWT (io.jsonwebtoken 0.12.6) |
| **Database & ORM** | MySQL 8+, Spring Data JPA, Hibernate 6.5+ |
| **API Documentation** | Springdoc OpenAPI 2.6.0 |
| **Frontend Framework** | React 18, Vite 5 |
| **Styling** | Tailwind CSS 3.4, PostCSS, Lucide React Icons |
| **State & HTTP** | React Context API, Axios 1.7 |

---

## 📂 Project Structure

```text
D:\Java Full Stack\Shopora\
├── backend/                              # Modern Merged Backend Source of Truth
│   ├── pom.xml
│   └── src/
│       ├── main/java/com/shopora/
│       │   ├── config/                  # CORS, OpenAPI, Database Seeder
│       │   ├── controller/              # REST Controllers (Auth, Product, Cart, Order, etc.)
│       │   ├── dto/                     # Request & Response DTOs
│       │   ├── entity/                  # JPA Entities
│       │   ├── exception/               # GlobalExceptionHandler & Custom Exceptions
│       │   ├── repository/              # Spring Data JPA Repositories
│       │   ├── security/                # JWT Filter, Token Provider, SecurityConfig
│       │   ├── service/                 # Business Services (Auth, Product, Order, Cart...)
│       │   └── ShoporaApplication.java  # Main Spring Boot Runner
│       └── main/resources/
│           ├── application.properties   # Base properties & environment variable bindings
│           └── application-local.properties.example # Development template
│
├── frontend/                             # Modern React + Vite Frontend
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── components/                  # Navbar, Footer, ProductCard, Modals, Skeleton
│       ├── context/                     # AuthContext, CartContext, WishlistContext, ThemeContext
│       ├── pages/                       # 16 Screen Implementations
│       ├── services/                    # Axios API Client & Endpoint Wrappers
│       └── App.jsx                      # Routing & Protected Route Guards
│
├── Backend 1/                            # [READ-ONLY] Original Reference 1 (H2)
├── Backend 2/                            # [READ-ONLY] Original Reference 2 (PostgreSQL)
├── CHANGELOG.md                          # Record of all migrations & bug fixes
├── PROGRESS.md                           # Phase tracking checklist
└── README.md                             # Documentation
```

---

## 📋 Prerequisites & Requirements
- **Java**: JDK 21+ (`java -version`)
- **Maven**: 3.9+ (`mvn -v`)
- **Node.js**: v18+ (`node -v`) & **npm** (`npm -v`)
- **MySQL**: MySQL Server 8.0+ running on port `3306`

---

## 🗄️ Database Setup (MySQL)
1. Start your local MySQL service (e.g. `net start MySQL80` or via MySQL Workbench).
2. The application is configured with `createDatabaseIfNotExist=true`, so the database `ecom_db` and all schema tables will be automatically provisioned on the first startup.
3. To configure your local database credentials without committing secrets:
   - Duplicate `backend/src/main/resources/application-local.properties.example`
   - Rename to `backend/src/main/resources/application-local.properties`
   - Set your local username and password.

---

## ⚙️ Environment Variables & Configuration

### Backend Options (`backend/.env` or system environment variables):
```properties
DB_URL=jdbc:mysql://localhost:3306/ecom_db?createDatabaseIfNotExist=true&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=<YOUR_LOCAL_DB_PASSWORD>
JWT_SECRET=<GENERATE_SECURE_SECRET_IN_PRODUCTION>
JWT_EXPIRATION_MS=86400000
FRONTEND_URL=http://localhost:5173
```

### Frontend Options (`frontend/.env`):
```properties
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 🚀 Running the Application

### 1. Start the Backend:
```powershell
cd "D:\Java Full Stack\Shopora\backend"
mvn spring-boot:run
```
*The backend will boot up at `http://localhost:8080` and seed initial product catalog and admin accounts.*

### 2. Start the Frontend:
```powershell
cd "D:\Java Full Stack\Shopora\frontend"
npm install
npm run dev
```
*Open your browser and navigate to `http://localhost:5173`.*

---

## 📡 API Documentation & Endpoints

Interactive Swagger UI is accessible at:
👉 **`http://localhost:8080/swagger-ui/index.html`**

### Summary Table

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new customer account |
| `POST` | `/api/auth/login` | Public | Authenticate and obtain JWT token |
| `GET` | `/api/products` | Public | Paginated & filtered product search |
| `GET` | `/api/products/{id}` | Public | Fetch product details by ID |
| `POST` | `/api/products` | Admin | Create a new catalog item |
| `PUT` | `/api/products/{id}` | Admin | Update existing catalog item |
| `DELETE` | `/api/products/{id}` | Admin | Delete product from catalog |
| `GET` | `/api/categories` | Public | List all product categories |
| `GET` | `/api/cart` | User | Get current user's shopping cart |
| `POST` | `/api/cart/items` | User | Add item to shopping cart |
| `PUT` | `/api/cart/items/{id}` | User | Update quantity of cart item |
| `DELETE` | `/api/cart/items/{id}` | User | Remove item from cart |
| `POST` | `/api/orders/checkout` | User | Execute transactional checkout |
| `GET` | `/api/orders/my-orders` | User | View customer's order history |
| `GET` | `/api/orders/{id}` | User | View specific order details |
| `GET` | `/api/orders` | Admin | List all orders with pagination |
| `PUT` | `/api/orders/{id}/status` | Admin | Update order fulfillment status |
| `GET` | `/api/addresses` | User | List user's saved addresses |
| `POST` | `/api/addresses` | User | Add new shipping address |
| `GET` | `/api/admin/dashboard` | Admin | Key metrics & stock alerts |

---

## 🔒 Authentication & Security
- **JWT Storage**: JWT tokens are securely stored in memory with fallback to `localStorage` for seamless reloads.
- **Auto-Logout on 401**: Axios response interceptors immediately wipe local tokens upon receiving a `401 Unauthorized` response.
- **Stock Depletion Safeguard**: Orders cannot be placed if requested quantities exceed available inventory.
- **Role Isolation**: Admin APIs under `/api/admin/**` and product/order management endpoints reject non-admin users with `403 Forbidden`.

---

## 🧪 Testing

Run backend tests:
```powershell
cd "D:\Java Full Stack\Shopora\backend"
mvn test
```

Build production packages:
```powershell
# Backend Build
cd "D:\Java Full Stack\Shopora\backend"
mvn clean package -DskipTests=false

# Frontend Build
cd "D:\Java Full Stack\Shopora\frontend"
npm run build
```

---

## 💡 Troubleshooting & FAQ

- **Database Connection Error**: Verify MySQL is active on port `3306` and credentials in `application-local.properties` or environment variables match your local setup.
- **Port Conflicts**: Backend defaults to port `8080`. If occupied, specify `server.port=8081` in `application-local.properties`.
- **CORS Errors**: The backend allows `http://localhost:5173` by default. If running frontend on another port, update `FRONTEND_URL` in `application.properties`.

---

## 📄 License
This project is licensed under the MIT License.
