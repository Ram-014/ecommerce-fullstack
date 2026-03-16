# 📘 Interview Q&A Guide — RamShop E-Commerce Project
**Prepared for: Ramakrishnan Aadhali**

---

## 🔷 SECTION 1: Project Overview Questions

**Q1. Tell me about your E-Commerce project.**
> "I built a full-stack e-commerce application called RamShop using Spring Boot for the backend, React.js for the frontend, and MySQL as the database. The app supports user registration and login with JWT authentication, product browsing with search and category filters, a cart system, and order placement with real-time stock management. I followed MVC layered architecture and used RESTful APIs to connect the frontend and backend."

**Q2. Why did you choose Spring Boot?**
> "Spring Boot removes a lot of boilerplate configuration compared to plain Spring. It has auto-configuration, an embedded Tomcat server, and integrates easily with Spring Security, JPA, and Hibernate. It's the industry standard for building Java REST APIs, which is why I chose it."

**Q3. How is your project structured?**
> "The backend follows a layered MVC architecture: Controller layer handles HTTP requests and maps URLs, Service layer contains business logic, Repository layer interacts with the database using Spring Data JPA, and Entity layer defines the database schema using JPA annotations. The frontend is a React SPA that consumes the REST APIs using Axios."

---

## 🔷 SECTION 2: Java & Spring Boot Questions

**Q4. What is Spring Boot auto-configuration?**
> "Spring Boot scans the classpath and automatically configures beans based on the dependencies present. For example, if MySQL and JPA are in the classpath, it automatically sets up a DataSource and EntityManagerFactory without manual XML configuration."

**Q5. What is the difference between @Component, @Service, @Repository, @Controller?**
> "All four are Spring stereotypes that register beans in the application context. @Component is the generic one. @Service is for business logic classes. @Repository is for data access classes — it also enables exception translation. @Controller handles HTTP requests in MVC. @RestController = @Controller + @ResponseBody."

**Q6. What is @RestController vs @Controller?**
> "@Controller returns a view name (used in Thymeleaf/JSP). @RestController = @Controller + @ResponseBody, meaning every method automatically serializes the return value to JSON. I used @RestController for all my API endpoints."

**Q7. What is the purpose of @RequestMapping and @GetMapping?**
> "@RequestMapping maps HTTP requests to handler methods at class or method level. @GetMapping, @PostMapping, @PutMapping, @DeleteMapping are shortcut annotations for specific HTTP methods. In my project, I used @GetMapping('/api/products') to get all products."

**Q8. What is @Valid and why did you use it?**
> "@Valid triggers Bean Validation on the annotated request body. In my RegisterRequest DTO, I added constraints like @NotBlank and @Email. When validation fails, Spring throws MethodArgumentNotValidException, which my @ControllerAdvice catches and returns a structured error response."

**Q9. What is @ControllerAdvice?**
> "It's a global exception handler. Instead of try-catch in every controller, I created a GlobalExceptionHandler class annotated with @RestControllerAdvice. It intercepts exceptions like ResourceNotFoundException and returns proper JSON error responses with HTTP status codes."

---

## 🔷 SECTION 3: JWT Security Questions

**Q10. What is JWT and how did you implement it?**
> "JWT (JSON Web Token) is a compact, self-contained token for authentication. When a user logs in, the server generates a JWT signed with a secret key and sends it to the client. The client stores it (localStorage) and sends it in the Authorization header as 'Bearer token' on every request. My JwtAuthFilter intercepts each request, validates the token, and sets the authentication in SecurityContext."

**Q11. What are the three parts of a JWT?**
> "A JWT has three parts separated by dots: Header (algorithm type), Payload (claims like email, expiry), and Signature (HMAC-SHA256 hash of header+payload with secret key). Only the server knows the secret, so it can verify the token hasn't been tampered with."

**Q12. What is OncePerRequestFilter?**
> "It's a Spring Filter that guarantees execution once per request. My JwtAuthFilter extends it to intercept every HTTP request, extract the JWT from the Authorization header, validate it, and set the authenticated user in the SecurityContextHolder."

**Q13. What is SecurityContextHolder?**
> "It stores the authentication details of the currently logged-in user. Once my JwtAuthFilter validates the token, it creates a UsernamePasswordAuthenticationToken and sets it in SecurityContextHolder. Spring Security then uses this to authorize method-level access."

**Q14. What is the difference between Authentication and Authorization?**
> "Authentication verifies who you are (login with email/password). Authorization determines what you're allowed to do. In my app, authentication happens via JWT login. Authorization is enforced by Spring Security rules — for example, only ROLE_ADMIN can create or delete products, while ROLE_USER can only view and buy."

---

## 🔷 SECTION 4: Hibernate & JPA Questions

**Q15. What is the difference between JPA and Hibernate?**
> "JPA (Jakarta Persistence API) is a specification — it defines interfaces and annotations like @Entity, @OneToMany, @Id. Hibernate is the most popular implementation of JPA. Spring Boot uses Hibernate as the default JPA provider. I used JPA annotations in my entities and Spring Data JPA repositories."

**Q16. Explain the entity relationships in your project.**
> "User has a OneToOne relationship with Cart and a OneToMany with Orders. Cart has a OneToMany with CartItems. Each CartItem has a ManyToOne with Product. Order has a OneToMany with OrderItems. Each OrderItem has a ManyToOne with Product. These are standard e-commerce entity relationships."

**Q17. What is the N+1 query problem?**
> "It happens when fetching a list of entities triggers one query per entity for a related field. For example, loading 10 orders and then executing 10 separate queries to fetch each order's items — total: 11 queries. I resolved this using EAGER fetching strategically and being careful with FetchType.LAZY on large collections."

**Q18. What is the DTO pattern and why did you use it?**
> "DTO (Data Transfer Object) decouples the API contract from the database entity. For example, my User entity has a password field, but my AuthResponse DTO only returns name, email, role, and token — never the password. It also lets me shape the response freely without changing the entity."

**Q19. What is @Transactional?**
> "It wraps a method in a database transaction. If any exception occurs, all database changes are rolled back. I used @Transactional on placeOrder() — it deducts stock, creates order items, and clears the cart atomically. If any step fails, nothing gets committed."

---

## 🔷 SECTION 5: REST API Questions

**Q20. What are REST principles?**
> "REST (Representational State Transfer) follows: Stateless (no session on server), Client-Server separation, Uniform Interface (standard HTTP methods: GET/POST/PUT/DELETE), Resource-based URLs (/api/products/1), and use of proper HTTP status codes (200, 201, 400, 401, 404, 500)."

**Q21. What HTTP status codes did you use?**
> "200 OK for successful GET/PUT, 201 Created for POST (new resource), 204 No Content for DELETE, 400 Bad Request for validation errors, 401 Unauthorized for missing/invalid JWT, 403 Forbidden for insufficient role, 404 Not Found for missing resources, 500 Internal Server Error for unexpected failures."

**Q22. What is the difference between PUT and PATCH?**
> "PUT replaces the entire resource with the new data. PATCH applies partial updates. In my project I used PUT for full product updates. PATCH would be used if only updating a specific field like price."

---

## 🔷 SECTION 6: React.js Questions

**Q23. What are React Hooks? Which ones did you use?**
> "Hooks let you use state and lifecycle features in functional components. I used useState for local component state (form fields, product list), useEffect for side effects (fetching data on page load), and useContext via custom hooks (useAuth) to access global auth state."

**Q24. What is the Context API and why did you use it?**
> "Context API provides global state without prop drilling. I created AuthContext to store the logged-in user's data (name, email, role, token) and made it available to all components. This avoids passing user props through every component tree level."

**Q25. How does Axios differ from fetch?**
> "Axios automatically parses JSON responses, supports request/response interceptors, handles timeouts, and throws errors for non-2xx status codes. I used Axios interceptors to automatically attach the JWT Bearer token to every request header — much cleaner than doing it manually with fetch."

---

## 🔷 SECTION 7: Database Questions

**Q26. Explain your database schema.**
> "I have 6 tables: users (id, name, email, password, role), products (id, name, description, price, stock, category, imageUrl), carts (id, user_id), cart_items (id, cart_id, product_id, quantity), orders (id, user_id, total_amount, status, shipping_address, created_at), order_items (id, order_id, product_id, quantity, price_at_purchase). Relationships use foreign keys."

**Q27. Why did you store priceAtPurchase in OrderItem?**
> "Product prices can change over time. If I just stored a reference to the product, the order total would change whenever the product price changes. By capturing priceAtPurchase at the time of order, I maintain a historically accurate order record — this is standard e-commerce design."

**Q28. What is database normalization?**
> "Normalization reduces data redundancy and improves integrity. My schema follows 3NF: no repeating groups, all attributes depend on the primary key, and no transitive dependencies. For example, product details are stored once in the products table and referenced by foreign key in cart_items and order_items."

---

## 🔷 SECTION 8: Git & Tools Questions

**Q29. How did you use Git in this project?**
> "I used Git for version control with a feature-branch strategy — separate branches for each feature (feature/auth, feature/cart, feature/orders). I committed regularly with meaningful messages, merged to main after testing, and used .gitignore to exclude sensitive files like application.properties."

**Q30. How would you deploy this application?**
> "For the backend, I'd package it as a JAR with mvn package and deploy on AWS EC2 or a VPS. For the database, I'd use AWS RDS (MySQL). For the React frontend, I'd run npm run build and deploy the static files to AWS S3 + CloudFront or Netlify. I'd use environment variables for secrets instead of hardcoded application.properties."

---

## ⚡ Quick-Fire Answers (Common HR/Technical Screening)

| Question | Answer |
|---|---|
| What is Spring Boot? | Framework to build production-ready Spring apps with minimal config |
| What is REST API? | Architectural style using HTTP methods to communicate between systems |
| What is JWT? | Stateless token-based authentication mechanism |
| What is ORM? | Maps Java objects to database tables (Hibernate does this) |
| What is MVC? | Design pattern: Model (data), View (UI), Controller (request handler) |
| What is CORS? | Cross-Origin Resource Sharing — allows React (3000) to call Spring API (8080) |
| What is BCrypt? | Password hashing algorithm — never store plain text passwords |
| What is @Autowired? | Spring injects the dependency automatically — I prefer constructor injection |
| What is Lombok? | Reduces boilerplate — @Data generates getters/setters, @Builder creates builder pattern |
