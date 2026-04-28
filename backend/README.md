# Spring Boot Backend - Akira Investments

## Prerequisites
- Java 17 or higher installed
- Maven 3.6+ installed
- PostgreSQL 12+ installed and running
- Git

## Database Setup

### 1. Create PostgreSQL Database
```bash
psql -U postgres

CREATE DATABASE akira_investments;
\c akira_investments
```

### 2. Create Database User (Optional but recommended)
```sql
CREATE USER akira_user WITH PASSWORD 'secure_password';
ALTER ROLE akira_user SET client_encoding TO 'utf8';
ALTER ROLE akira_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE akira_user SET default_transaction_deferrable TO on;
ALTER ROLE akira_user SET default_transaction_read_only TO off;
GRANT ALL PRIVILEGES ON DATABASE akira_investments TO akira_user;
\q
```

### 3. Update application.properties
Edit `src/main/resources/application.properties` with your database credentials:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/akira_investments
spring.datasource.username=postgres  # or your username
spring.datasource.password=postgres  # or your password
```

## Project Structure
```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/akira/investments/
│   │   │   ├── AkiraInvestmentsApplication.java    (Main entry point)
│   │   │   ├── entity/Product.java                  (JPA Entity)
│   │   │   ├── repository/ProductRepository.java    (Data access layer)
│   │   │   ├── service/ProductService.java          (Business logic)
│   │   │   └── controller/ProductController.java    (REST API endpoints)
│   │   └── resources/
│   │       └── application.properties               (Configuration)
│   └── test/
├── pom.xml                                           (Maven configuration)
└── README.md
```

## Building & Running

### 1. Clean and Build
```bash
cd backend
mvn clean package
```

### 2. Run Spring Boot Application
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080/api`

### 3. Test Backend
```bash
curl http://localhost:8080/api/products/health
```

Expected response: `Backend is running!`

## Available API Endpoints

### Products

#### Get All Products
```
GET /api/products
```

#### Get Product by ID
```
GET /api/products/{id}
```

#### Get Product by Product ID
```
GET /api/products/product-id/{productId}
```

#### Get Products by Category
```
GET /api/products/category/{category}
```
Categories: `spice`, `bag`, `dairy`, `other`

#### Search Products
```
GET /api/products/search?query=seasoning
GET /api/products/search?query=bread&category=bag
```

#### Create Product (POST)
```
POST /api/products
Content-Type: application/json

{
  "productId": "p5",
  "name": "New Product",
  "description": "Product description",
  "shortDescription": "Short desc",
  "price": 99.99,
  "moq": "10 units",
  "size": "500g",
  "category": "SPICE",
  "image": "https://..."
}
```

#### Update Product (PUT)
```
PUT /api/products/{id}
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 89.99,
  ...
}
```

#### Update Product Price (PATCH)
```
PATCH /api/products/{id}/price
Content-Type: application/json

{
  "price": 75.50
}
```

#### Delete Product
```
DELETE /api/products/{id}
```

#### Health Check
```
GET /api/products/health
```

## Connecting Frontend to Backend

Update your React frontend to call the backend API:

```typescript
// Example API call
const response = await fetch('http://localhost:8080/api/products');
const products = await response.json();
```

## Database Schema

The application automatically creates the `products` table with:
- `id` (Primary Key, Auto-generated)
- `product_id` (Unique)
- `name` (String)
- `description` (Text)
- `short_description` (String)
- `price` (Decimal)
- `moq` (String)
- `size` (String)
- `category` (Enum: SPICE, BAG, DAIRY, OTHER)
- `image` (String)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## Troubleshooting

### Cannot connect to PostgreSQL
- Ensure PostgreSQL service is running
- Check connection string in `application.properties`
- Verify database and user exist

### Port 8080 already in use
Edit `application.properties`:
```properties
server.port=8081
```

### Maven build fails
```bash
mvn clean install -DskipTests
```

## Development Tools

### View Logs
Logs are configured in `application.properties`. Increase verbosity for debugging:
```properties
logging.level.com.akira.investments=DEBUG
logging.level.org.hibernate.SQL=DEBUG
```

### Database Management
Use PgAdmin or CLI:
```bash
psql -U postgres -d akira_investments
```

## Deployment

For production deployment, see Spring Boot documentation on:
- Environment-specific configurations
- JAR building and deployment
- Database migrations with Flyway/Liquibase
