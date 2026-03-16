# 🛍️ RamShop — Full Stack E-Commerce Application

![Java](https://img.shields.io/badge/Java-24-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Auth-purple?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

A production-style full-stack e-commerce web application built with **Spring Boot**, **React.js**, and **MySQL**. Features JWT-based authentication, product management, shopping cart, and order processing.

---

## 🚀 Live Demo

> Backend: `http://localhost:8080`  
> Frontend: `http://localhost:3000`  
> Demo Admin: `admin@shop.com` / `admin123`

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure register/login with BCrypt password hashing
- 🛒 **Shopping Cart** — Add, update quantity, remove items in real-time
- 📦 **Order Management** — Place orders, view history, cancel pending orders
- 🔍 **Product Search** — Search by keyword and filter by category
- 🛡️ **Role-Based Access** — ROLE_USER (shopping) and ROLE_ADMIN (product management)
- 📱 **Responsive UI** — Works on desktop and mobile browsers
- 📊 **Stock Management** — Auto-deducts stock on order, restores on cancellation

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 17, Spring Boot 3.2, Spring Security, Hibernate/JPA |
| Frontend | React.js 18, React Router v6, Axios, Context API |
| Database | MySQL 8.0, Spring Data JPA |
| Authentication | JWT (jjwt 0.11.5), BCryptPasswordEncoder |
| Build Tools | Maven (backend), npm (frontend) |
| Dev Tools | IntelliJ IDEA, VS Code, Postman, Git |

---

## 🗂️ Project Structure

```
ecommerce/
├── backend/                          # Spring Boot Application
│   └── src/main/java/com/ram/ecommerce/
│       ├── config/                   # Security config, CORS, Data seeder
│       ├── controller/               # REST API endpoints
│       ├── dto/                      # Data Transfer Objects
│       ├── entity/                   # JPA Entities (DB models)
│       ├── exception/                # Custom exceptions + Global handler
│       ├── repository/               # Spring Data JPA repositories
│       ├── security/                 # JWT Filter, UserDetailsService, JwtUtil
│       └── service/                  # Business logic layer
│
└── frontend/                         # React.js Application
    └── src/
        ├── api/                      # Axios API configuration
        ├── components/               # Reusable UI components
        ├── context/                  # AuthContext (global state)
        └── pages/                    # Auth, Products, Cart, Orders
```

---

## 🗄️ Database Schema

```
users          products         orders          order_items
─────────      ────────────     ──────────      ───────────
id (PK)        id (PK)          id (PK)         id (PK)
name           name             user_id (FK)    order_id (FK)
email          description      total_amount    product_id (FK)
password       price            status          quantity
role           stock            shipping_addr   price_at_purchase
               category         created_at
               image_url
                                carts           cart_items
                                ─────           ──────────
                                id (PK)         id (PK)
                                user_id (FK)    cart_id (FK)
                                                product_id (FK)
                                                quantity
```

---

## ⚙️ Getting Started

### Prerequisites
- Java JDK 17+
- Maven 3.8+
- MySQL 8.0+
- Node.js 18+ and npm

### 1. Clone the Repository
```bash
git clone https://github.com/Ram-014/ecommerce-fullstack.git
cd ecommerce-fullstack
```

### 2. Setup MySQL Database
```sql
CREATE DATABASE ecommerce_db;
```

### 3. Configure Backend
```bash
cd backend/src/main/resources
cp application.properties.example application.properties
# Edit application.properties and set your MySQL password
```

### 4. Run Backend
```bash
cd backend
mvn spring-boot:run
```
Backend starts on `http://localhost:8080`  
✅ Database tables auto-created, sample products and admin user seeded.

### 5. Run Frontend
```bash
cd frontend
npm install
npm start
```
Frontend starts on `http://localhost:3000`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login, returns JWT | Public |

### Products
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/{id}` | Get product by ID | Public |
| GET | `/api/products/search?keyword=x` | Search products | Public |
| GET | `/api/products/category/{cat}` | Filter by category | Public |
| POST | `/api/products` | Create product | ADMIN |
| PUT | `/api/products/{id}` | Update product | ADMIN |
| DELETE | `/api/products/{id}` | Delete product | ADMIN |

### Cart
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/cart` | Get user's cart | USER |
| POST | `/api/cart/add` | Add item to cart | USER |
| PUT | `/api/cart/update/{itemId}?quantity=x` | Update quantity | USER |
| DELETE | `/api/cart/remove/{itemId}` | Remove item | USER |

### Orders
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/orders/place` | Place order from cart | USER |
| GET | `/api/orders` | Get my orders | USER |
| GET | `/api/orders/{id}` | Get order by ID | USER |
| PUT | `/api/orders/{id}/cancel` | Cancel order | USER |

---

## 🔒 Security Flow

```
Client                    JwtAuthFilter              SecurityContext
  │                             │                          │
  │── POST /api/auth/login ────▶│                          │
  │◀─ JWT Token ───────────────│                          │
  │                             │                          │
  │── GET /api/cart ───────────▶│                          │
  │   Authorization: Bearer JWT │                          │
  │                             │── validateToken() ──────▶│
  │                             │◀─ Authentication set ────│
  │◀─ Cart Data ───────────────│                          │
```

---

## 🧪 Testing with Postman

Import the following sample requests:

**Register:**
```json
POST /api/auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

**Add to Cart:**
```json
POST /api/cart/add
Authorization: Bearer <your_token>
{
  "productId": 1,
  "quantity": 2
}
```

**Place Order:**
```json
POST /api/orders/place
Authorization: Bearer <your_token>
{
  "shippingAddress": "123 Main Street, Chennai, Tamil Nadu 600001"
}
```

---

## 👤 Author

**Ramakrishnan Aadhali**  
Java Full Stack Developer | B.E. CSE 2026

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/ramakrishnan-aadhali-b7609b382/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat-square&logo=github)](https://github.com/Ram-014)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=flat-square&logo=gmail)](mailto:014ramakrishnanaa@gmail.com)

---

## 📄 License

This project is licensed under the MIT License.
