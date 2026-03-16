🛍️ RamShop — Full Stack E-Commerce Application
![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4.1-green?style=flat-square&logo=springboot)
![Spring Security](https://img.shields.io/badge/Spring_Security-6.4-darkgreen?style=flat-square&logo=springsecurity)
![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)
![React Router](https://img.shields.io/badge/React_Router-7.1-red?style=flat-square&logo=reactrouter)
![MySQL](https://img.shields.io/badge/MySQL-9.1-blue?style=flat-square&logo=mysql)
![Hibernate](https://img.shields.io/badge/Hibernate-6.6-brown?style=flat-square&logo=hibernate)
![JWT](https://img.shields.io/badge/JWT-JJWT_0.12.6-purple?style=flat-square)
![Maven](https://img.shields.io/badge/Maven-3.9.9-red?style=flat-square&logo=apachemaven)
![Node](https://img.shields.io/badge/Node.js-22.x_LTS-green?style=flat-square&logo=nodedotjs)
![Axios](https://img.shields.io/badge/Axios-1.7-purple?style=flat-square&logo=axios)
![Lombok](https://img.shields.io/badge/Lombok-1.18.36-pink?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)
A production-style full-stack e-commerce web application built with Spring Boot 3.4, React 19, and MySQL 9. Features JWT-based authentication, product management, shopping cart, and complete order processing with real-time stock management.
---
🚀 Live Demo
> Backend API: `http://localhost:8080`
> Frontend App: `http://localhost:3000`
> Demo Admin Login: `admin@shop.com` / `admin123`
---
✨ Features
🔐 JWT Authentication — Stateless auth using JJWT 0.12.6 with BCrypt password hashing
🛒 Shopping Cart — Add, update quantity, remove items with live total calculation
📦 Order Management — Place orders, view full history, cancel pending orders
🔍 Product Search & Filter — Search by keyword, filter by category in real-time
🛡️ Role-Based Access Control — ROLE_USER (shopping) and ROLE_ADMIN (product CRUD)
📱 Responsive UI — Mobile-first design, works across all screen sizes
📊 Stock Management — Auto-deducts stock on order placement, restores on cancellation
⚡ Global Exception Handling — Structured JSON error responses via @RestControllerAdvice
🌐 CORS Configured — Seamless React ↔ Spring Boot communication
---
🏗️ Tech Stack
Layer	Technology	Version
Language	Java (OpenJDK)	21 LTS
Backend Framework	Spring Boot	3.4.1
Security	Spring Security	6.4
ORM	Hibernate / Spring Data JPA	6.6
Authentication	JJWT	0.12.6
Password Hashing	BCryptPasswordEncoder	Spring Security 6.4
Database	MySQL	9.1
Frontend Framework	React.js	19.0
Routing	React Router DOM	7.1
HTTP Client	Axios	1.7
State Management	React Context API + Hooks	Built-in
Build Tool (Backend)	Apache Maven	3.9.9
Runtime (Frontend)	Node.js	22.x LTS
Code Generation	Lombok	1.18.36
IDE	IntelliJ IDEA / VS Code	Latest
API Testing	Postman	Latest
Version Control	Git + GitHub	Latest
---
🗂️ Project Structure
```
ecommerce/
├── backend/                              # Spring Boot 3.4 Application
│   ├── pom.xml                           # Maven dependencies
│   └── src/main/java/com/ram/ecommerce/
│       ├── EcommerceApplication.java     # Main entry point
│       ├── config/
│       │   ├── SecurityConfig.java       # Spring Security 6.4 config + CORS
│       │   └── DataSeeder.java           # Auto-seeds products & admin on startup
│       ├── controller/
│       │   ├── AuthController.java       # POST /api/auth/register, /login
│       │   ├── ProductController.java    # CRUD /api/products
│       │   ├── CartController.java       # /api/cart operations
│       │   └── OrderController.java      # /api/orders operations
│       ├── dto/
│       │   ├── AuthDto.java              # RegisterRequest, LoginRequest, AuthResponse
│       │   ├── ProductDto.java           # ProductRequest, ProductResponse
│       │   ├── CartDto.java              # AddItemRequest, CartResponse
│       │   └── OrderDto.java             # PlaceOrderRequest, OrderResponse
│       ├── entity/
│       │   ├── User.java                 # @Entity — users table
│       │   ├── Product.java              # @Entity — products table
│       │   ├── Cart.java                 # @Entity — carts table (OneToOne with User)
│       │   ├── CartItem.java             # @Entity — cart_items table
│       │   ├── Order.java                # @Entity — orders table
│       │   └── OrderItem.java            # @Entity — order_items table
│       ├── exception/
│       │   ├── GlobalExceptionHandler.java  # @RestControllerAdvice
│       │   ├── ResourceNotFoundException.java
│       │   └── BadRequestException.java
│       ├── repository/
│       │   ├── UserRepository.java
│       │   ├── ProductRepository.java
│       │   ├── CartRepository.java
│       │   ├── CartItemRepository.java
│       │   └── OrderRepository.java
│       ├── security/
│       │   ├── JwtUtil.java              # Token generation & validation
│       │   ├── JwtAuthFilter.java        # OncePerRequestFilter — JWT interceptor
│       │   └── UserDetailsServiceImpl.java
│       └── service/
│           ├── AuthService.java          # Register, Login logic
│           ├── ProductService.java       # Product CRUD + search
│           ├── CartService.java          # Cart management + @Transactional
│           └── OrderService.java         # Order placement + stock management
│
└── frontend/                             # React 19 Application
    ├── package.json
    └── src/
        ├── App.js                        # Root component + React Router 7 routes
        ├── index.js                      # ReactDOM.createRoot entry point
        ├── api/
        │   └── api.js                    # Axios 1.7 instance + JWT interceptor
        ├── context/
        │   └── AuthContext.js            # Global auth state via Context API
        ├── components/
        │   ├── layout/
        │   │   ├── Navbar.js             # Sticky nav with cart badge
        │   │   └── Footer.js
        │   └── common/
        │       ├── ProductCard.js        # Reusable product card component
        │       └── Spinner.js            # Loading spinner
        └── pages/
            ├── Home.js                   # Landing page with hero + categories
            ├── Auth/
            │   ├── Login.js              # Login form with JWT handling
            │   └── Register.js           # Registration form with validation
            ├── Products/
            │   ├── Products.js           # Product listing + search + filter
            │   └── ProductDetail.js      # Single product view + quantity selector
            ├── Cart/
            │   └── Cart.js               # Cart management + order placement
            └── Orders/
                └── Orders.js             # Order history + cancel functionality
```
---
🗄️ Database Schema
```
users                products              orders
──────────────       ─────────────────     ─────────────────────
id          PK       id           PK       id             PK
name                 name                  user_id        FK → users
email       UNIQUE   description           total_amount
password             price                 status         ENUM
role        ENUM     stock                 shipping_addr
                     category              created_at
                     image_url

carts                cart_items            order_items
──────────────       ─────────────────     ─────────────────────
id          PK       id           PK       id             PK
user_id     FK       cart_id      FK →     order_id       FK → orders
            UNIQUE   product_id   FK →     product_id     FK → products
                     quantity              quantity
                                           price_at_purchase
```
---
⚙️ Prerequisites & Setup
System Requirements
Tool	Minimum Version	Recommended
Java (OpenJDK)	21	21 LTS
Apache Maven	3.9+	3.9.9
MySQL	8.0+	9.1
Node.js	18+	22 LTS
npm	9+	10+
1. Clone the Repository
```bash
git clone https://github.com/Ram-014/ecommerce-fullstack.git
cd ecommerce-fullstack
```
2. MySQL Setup
```sql
CREATE DATABASE ecommerce_db;
-- Tables are auto-created by Hibernate (ddl-auto=update)
-- Sample data seeded automatically on first run
```
3. Configure Backend
```bash
cd backend/src/main/resources
cp application.properties.example application.properties
# Open application.properties and set your MySQL password
```
4. Run Backend (Spring Boot 3.4)
```bash
cd backend
mvn spring-boot:run
```
✅ Starts on `http://localhost:8080`
✅ Auto-creates all 6 database tables
✅ Seeds 8 sample products + 1 admin user
5. Run Frontend (React 19)
```bash
cd frontend
npm install
npm start
```
✅ Opens `http://localhost:3000` in your browser
---
📡 REST API Reference
🔑 Auth Endpoints
Method	Endpoint	Description	Access
`POST`	`/api/auth/register`	Register new user, returns JWT	Public
`POST`	`/api/auth/login`	Login with email/password, returns JWT	Public
🛍️ Product Endpoints
Method	Endpoint	Description	Access
`GET`	`/api/products`	Fetch all products	Public
`GET`	`/api/products/{id}`	Fetch product by ID	Public
`GET`	`/api/products/search?keyword=x`	Search products by name	Public
`GET`	`/api/products/category/{cat}`	Filter by category	Public
`POST`	`/api/products`	Create new product	ADMIN
`PUT`	`/api/products/{id}`	Update product	ADMIN
`DELETE`	`/api/products/{id}`	Delete product	ADMIN
🛒 Cart Endpoints
Method	Endpoint	Description	Access
`GET`	`/api/cart`	Get current user's cart	USER
`POST`	`/api/cart/add`	Add product to cart	USER
`PUT`	`/api/cart/update/{itemId}?quantity=x`	Update item quantity	USER
`DELETE`	`/api/cart/remove/{itemId}`	Remove item from cart	USER
📦 Order Endpoints
Method	Endpoint	Description	Access
`POST`	`/api/orders/place`	Place order from cart	USER
`GET`	`/api/orders`	Get all my orders	USER
`GET`	`/api/orders/{id}`	Get order by ID	USER
`PUT`	`/api/orders/{id}/cancel`	Cancel pending order	USER
---
🔒 JWT Security Architecture
```
┌─────────┐    POST /api/auth/login     ┌──────────────────┐
│  React  │ ─────────────────────────▶  │   AuthController  │
│ Client  │ ◀─────────────────────────  │   AuthService     │
└─────────┘    { token, name, email }   └──────────────────┘
     │
     │  Stores JWT in localStorage
     │
     │    GET /api/cart
     │    Authorization: Bearer <JWT>
     ▼
┌─────────────────┐   Extract & Validate   ┌──────────────────────┐
│  JwtAuthFilter  │ ─────────────────────▶ │  SecurityContextHolder│
│ (Once Per Req)  │ ◀───────────────────── │  Authentication set   │
└─────────────────┘   UserDetails loaded   └──────────────────────┘
```
---
🧪 API Testing — Postman Examples
1. Register
```json
POST /api/auth/register
Content-Type: application/json

{
  "name": "Ramakrishnan",
  "email": "ram@example.com",
  "password": "password123"
}
```
2. Add to Cart (use token from register/login response)
```json
POST /api/cart/add
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2
}
```
3. Place Order
```json
POST /api/orders/place
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "shippingAddress": "42, Anna Nagar, Chennai, Tamil Nadu - 600040"
}
```
---
🌱 Future Enhancements
[ ] Payment gateway integration (Razorpay / Stripe)
[ ] Product image upload (AWS S3)
[ ] Email notifications on order placement (Spring Mail)
[ ] Pagination and sorting for product listing
[ ] Docker containerization (Docker Compose)
[ ] CI/CD pipeline (GitHub Actions)
[ ] Unit & Integration tests (JUnit 5 + Mockito)
---
👤 Author
Ramakrishnan Aadhali
Java Full Stack Developer | B.E. CSE 2026 | Oasys Institute of Technology, Trichy
![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)
![GitHub](https://img.shields.io/badge/GitHub-Ram--014-black?style=flat-square&logo=github)
![Email](https://img.shields.io/badge/Gmail-014ramakrishnanaa%40gmail.com-red?style=flat-square&logo=gmail)
---
📄 License
This project is licensed under the MIT License.
---
> ⭐ If you found this project helpful, please give it a star — it helps others discover it!
