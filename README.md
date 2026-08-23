# Category Controller & Route

The Category module provides a clean and structured way to manage category-related API requests.

## Controller

`CategoryController` handles the business logic for category management.

### Responsibilities

* **`index()`** — Retrieves all categories.
* **`show()`** — Retrieves a single category by ID.
* **`create()`** — Validates and creates a new category with an automatic slug.
* **`update()`** — Updates an existing category and regenerates the slug when needed.
* **`destroy()`** — Deletes a category after checking its dependencies.

The controller manages:

* Request validation
* Business logic
* Database operations
* API responses
* Error handling
* HTTP status codes

---

## Route

The Category routes map HTTP requests to the appropriate controller methods.

```ts
Route.group({ prefix: "/categories" }, () => {

    // Get all categories
    Route.get("/", CategoryController.index);

    // Get a category by ID
    Route.get("/:id", CategoryController.show);

    // Create a new category
    Route.post("/", CategoryController.create);

    // Update a category
    Route.patch("/:id", CategoryController.update);

    // Delete a category
    Route.delete("/:id", CategoryController.destroy);

});
```

### API Endpoints

| Method   | Endpoint          | Action          |
| -------- | ----------------- | --------------- |
| `GET`    | `/categories`     | List categories |
| `GET`    | `/categories/:id` | Get category    |
| `POST`   | `/categories`     | Create category |
| `PATCH`  | `/categories/:id` | Update category |
| `DELETE` | `/categories/:id` | Delete category |

---

## Request Flow

```text
HTTP Request
     ↓
   Route
     ↓
 Controller
     ↓
   Model
     ↓
  Database
     ↓
 HTTP Response
```

**Route** handles request mapping, while **Controller** handles the application logic and response.

# Brand Controller & Route

The Brand module provides a clean and structured way to manage brand-related API requests.

## Controller

`BrandController` handles the business logic for brand management.

### Responsibilities

* **`index()`** — Retrieves all brands.
* **`show()`** — Retrieves a single brand by ID.
* **`create()`** — Validates and creates a new brand with an automatic slug.
* **`update()`** — Updates an existing brand and regenerates the slug when needed.
* **`destroy()`** — Soft deletes a brand.

The controller manages:

* Request validation
* Business logic
* Slug generation
* Duplicate brand checking
* Database operations
* API responses
* Error handling
* HTTP status codes

---

## Route

The Brand routes map HTTP requests to the appropriate controller methods.

```ts
Route.group({ prefix: "/brand" }, () => {

    // Get all brands
    Route.get("/", BrandController.index);

    // Get a brand by ID
    Route.get("/:id", BrandController.show);

    // Create a new brand
    Route.post("/", BrandController.create);

    // Update a brand
    Route.patch("/:id", BrandController.update);

    // Delete a brand
    Route.delete("/:id", BrandController.destroy);

});
```

### API Endpoints

| Method   | Endpoint     | Action       |
| -------- | ------------ | ------------ |
| `GET`    | `/brand`     | List brands  |
| `GET`    | `/brand/:id` | Get brand    |
| `POST`   | `/brand`     | Create brand |
| `PATCH`  | `/brand/:id` | Update brand |
| `DELETE` | `/brand/:id` | Delete brand |

---

## Request Flow

```text
HTTP Request
     ↓
   Route
     ↓
 Controller
     ↓
   Model
     ↓
  Database
     ↓
 HTTP Response
```

**Route** handles request mapping, while **Controller** handles the application logic and response.

# Product Controller & Route

The **Product Module** provides a clean and structured API for managing products, product barcodes, brands, categories, stock information, and product lifecycle operations.

---

## 📌 Controller

`ProductController` handles the business logic for product management.

### Controller Methods

| Method | Responsibility |
|---|---|
| `index()` | Get product list or a single product by ID/slug |
| `barcode()` | Generate and return a product barcode image |
| `create()` | Validate and create a new product |
| `update()` | Partially update an existing product |
| `destroy()` | Soft delete a product |

### Controller Responsibilities

- Request validation
- Product business logic
- Slug generation
- Duplicate slug checking
- Category validation
- Brand validation
- Barcode generation
- Database operations
- Category & Brand joins
- API response handling
- Error handling
- HTTP status handling
- Soft deletion

---

# 🛣️ Route

Product routes are grouped under the `/products` prefix.

```ts
Route.group({ prefix: "/products" }, () => {

    // Get all products
    Route.get("/", ProductController.index);

    // Get product barcode
    Route.get("/barcode/:text", ProductController.barcode);

    // Get a product by ID
    Route.get("/:id", ProductController.index);

    // Create a new product
    Route.post("/", ProductController.create);

    // Update a product
    Route.patch("/:id", ProductController.update);

    // Delete a product
    Route.delete("/:id", ProductController.destroy);

});
```

## API Endpoints

| Method | Endpoint | Description |
|:---:|---|---|
| `GET` | `/products` | Get all products |
| `GET` | `/products/barcode/:text` | Generate product barcode |
| `GET` | `/products/:id` | Get product by ID |
| `POST` | `/products` | Create product |
| `PATCH` | `/products/:id` | Update product |
| `DELETE` | `/products/:id` | Soft delete product |

---

# 🔄 Request Flow

```text
┌─────────────────┐
│  HTTP Request   │
└────────┬────────┘
         ↓
┌─────────────────┐
│      Route      │
└────────┬────────┘
         ↓
┌─────────────────┐
│ ProductController│
└────────┬────────┘
         ↓
┌─────────────────┐
│   Validation    │
└────────┬────────┘
         ↓
┌─────────────────┐
│  Business Logic │
└────────┬────────┘
         ↓
┌─────────────────┐
│      Model      │
└────────┬────────┘
         ↓
┌─────────────────┐
│    Database     │
└────────┬────────┘
         ↓
┌─────────────────┐
│  HTTP Response  │
└─────────────────┘
```

> **Route** handles request mapping, while **ProductController** handles validation, business logic, database operations, and API responses.

---

# 📦 Product `index()`

The `index()` method supports:

- Product list
- Product by ID
- Product by slug
- Brand information
- Category information
- Soft-delete filtering
- Query performance measurement

### Query Relationship

```text
Products
   │
   ├── category_id ──────→ Categories
   │
   └── brand_id ─────────→ Brands
```

The API returns product information together with its related brand and category information.

---

# 🏷️ Product `barcode()`

The `barcode()` method generates a PNG barcode.

### Flow

```text
Request
   ↓
Get barcode text
   ↓
Generate barcode
   ↓
Set image headers
   ↓
Return PNG image
```

### Example

```http
GET /products/barcode/SAM-S25-256GB
```

The endpoint returns an `image/png` response.

---

# ➕ Product `create()`

The `create()` method follows this validation flow:

```text
Request Body
     ↓
Generate Slug
     ↓
Check Duplicate Slug
     ↓
Validate Category
     ↓
Validate Brand
     ↓
Generate Barcode from SKU
     ↓
Insert Product
     ↓
Fetch Created Product
     ↓
Return Response
```

## Create Request

```http
POST /products
Content-Type: application/json
```

```json
{
    "category_id": 4,
    "brand_id": 1,
    "name": "স্যামসাং গ্যালাক্সি এস২৫",
    "slug": "samsung galaxy s25",
    "sku": "SAM-S25-256GB",
    "description": "স্যামসাং গ্যালাক্সি এস২৫ একটি প্রিমিয়াম স্মার্টফোন।",
    "unit": "পিস",
    "purchase_price": "85000.00",
    "sale_price": "94999.00",
    "discount": "5.00",
    "discount_type": "percent",
    "stock": "25.00",
    "min_stock": "5.00",
    "status": 1,
    "featured": 1
}
```

> **Note:** `barcode` is automatically generated from the product `sku`.

---

# ✏️ Product `update()`

The `update()` method uses PATCH behavior, so only the provided fields are updated.

### Flow

```text
Request
   ↓
Check Product
   ↓
Validate Slug (if provided)
   ↓
Validate Category (if provided)
   ↓
Validate Brand (if provided)
   ↓
Update Product
   ↓
Fetch Updated Product
   ↓
Return Response
```

### Example

```http
PATCH /products/12
Content-Type: application/json
```

```json
{
    "sale_price": "92999.00",
    "discount": "7.00",
    "stock": "30.00"
}
```

---

# 🗑️ Product `destroy()`

Products are **soft deleted** instead of being permanently removed from the database.

### Flow

```text
Request
   ↓
Check Product
   ↓
Set deleted_at
   ↓
Soft Delete
   ↓
Return Response
```

### Example

```http
DELETE /products/12
```

The product remains in the database, but its `deleted_at` field is populated.

Normal product queries exclude records where:

```text
deleted_at IS NOT NULL
```

---

# 🧾 Product Fields

## Product Information

| Field | Description |
|---|---|
| `id` | Product ID |
| `category_id` | Category ID |
| `brand_id` | Brand ID |
| `name` | Product name |
| `slug` | Product slug |
| `sku` | Product SKU |
| `barcode` | Product barcode |
| `description` | Product description |
| `unit` | Product unit |
| `purchase_price` | Purchase price |
| `sale_price` | Sale price |
| `discount` | Discount value |
| `discount_type` | Discount type |
| `stock` | Current stock |
| `min_stock` | Minimum stock |
| `status` | Product status |
| `featured` | Featured product status |
| `created_at` | Creation timestamp |
| `updated_at` | Update timestamp |
| `deleted_at` | Soft delete timestamp |

---

## 🏷️ Brand Information

| Field | Description |
|---|---|
| `brand_name` | Brand name |
| `brand_slug` | Brand slug |
| `brand_description` | Brand description |
| `brand_logo` | Brand logo |

---

## 📂 Category Information

| Field | Description |
|---|---|
| `categorie_name` | Category name |
| `categorie_slug` | Category slug |
| `categorie_description` | Category description |
| `categorie_logo` | Category image/logo |

---

# 📤 Example Product Response

```json
{
    "id": 12,
    "category_id": 4,
    "brand_id": 1,
    "name": "স্যামসাং গ্যালাক্সি এস২৫",
    "slug": "samsung-galaxy-s25",
    "sku": "SAM-S25-256GB",
    "barcode": "SAM-S25-256GB",
    "description": "স্যামসাং গ্যালাক্সি এস২৫ একটি প্রিমিয়াম স্মার্টফোন। এতে রয়েছে ১২ জিবি র‍্যাম, ২৫৬ জিবি স্টোরেজ এবং উন্নত ক্যামেরা সিস্টেম।",
    "unit": "পিস",
    "purchase_price": "85000.00",
    "sale_price": "94999.00",
    "discount": "5.00",
    "discount_type": "percent",
    "stock": "25.00",
    "min_stock": "5.00",
    "status": 1,
    "featured": 1,
    "created_at": "2026-08-22T20:52:04.000Z",
    "updated_at": "2026-08-22T20:52:04.000Z",
    "deleted_at": null,

    "brand_name": "Sam phone mobail",
    "brand_slug": "sam-phone-mobail",
    "brand_description": "Samsung is a global electronics and technology brand.",
    "brand_logo": "https://example.com/images/brands/samsung.png",

    "categorie_name": "মোবাইল ও ট্যাবলেট",
    "categorie_slug": "mobile-tablet",
    "categorie_description": "মোবাইল ফোন, ট্যাবলেট এবং মোবাইল এক্সেসরিজ",
    "categorie_logo": "categories/mobile-tablet.jpg"
}
```

---

# 🧩 Database Relationship

```text
                 ┌──────────────┐
                 │  Categories  │
                 └──────┬───────┘
                        │
                   category_id
                        │
                        ▼
                ┌───────────────┐
                │   Products    │
                └───────┬───────┘
                        │
                     brand_id
                        │
                        ▼
                 ┌──────────────┐
                 │    Brands    │
                 └──────────────┘
```

### Relationships

```text
Product
   ├── belongsTo → Category
   └── belongsTo → Brand
```

---

# 🚦 API Status Codes

| Status | Meaning |
|:---:|---|
| `200` | Request successful |
| `201` | Product created successfully |
| `404` | Product / Category / Brand not found |
| `409` | Product slug already exists |
| `500` | Internal server error |

---

# 🛡️ Validation Flow

### Create

```text
Product Request
      ↓
Slug Generate
      ↓
Duplicate Slug Check
      ↓
Category Check
      ↓
Brand Check
      ↓
Product Insert
```

### Update

```text
Product Request
      ↓
Product Exists?
      ↓
Slug Validation
      ↓
Category Validation
      ↓
Brand Validation
      ↓
Product Update
```

### Delete

```text
Product Request
      ↓
Product Exists?
      ↓
deleted_at = current date
      ↓
Soft Delete
```

---

# ⚡ Performance

The `index()` method measures database query execution time using:

```ts
const start = performance.now();

// Product query

const end = performance.now();
```

The response message includes the execution time:

```text
product list 2.35ms
```

This makes it easier to monitor Product API query performance during development and optimization.

---

# 📁 Module Structure

```text
Product Module
│
├── Controller
│   └── ProductController
│
├── Model
│   └── ProductModel
│
├── Route
│   └── /products
│
├── Helper
│   └── generateBarcode
│
├── Category
│   └── CategoryModel
│
└── Brand
    └── BrandModel
```

---

# 🔁 Complete Architecture

```text
                    HTTP Request
                         │
                         ▼
                       Route
                         │
                         ▼
                ProductController
                         │
              ┌──────────┼──────────┐
              │          │          │
              ▼          ▼          ▼
          Validation   Business   Response
                       Logic
              │
              ▼
          ProductModel
              │
        ┌─────┴─────┐
        ▼           ▼
   Categories     Brands
        │           │
        └─────┬─────┘
              ▼
           Database
              │
              ▼
        HTTP Response
```

---

# ✅ Summary

The Product module follows the same clean architecture as the **Category** and **Brand** modules.

```text
Route
  ↓
Controller
  ↓
Validation
  ↓
Business Logic
  ↓
Model
  ↓
Database
  ↓
Response
```

### Main Features

- ✅ Product CRUD
- ✅ Product list
- ✅ Product lookup by ID
- ✅ Product slug support
- ✅ Automatic slug generation
- ✅ Duplicate slug protection
- ✅ Category validation
- ✅ Brand validation
- ✅ Automatic barcode generation
- ✅ Barcode PNG endpoint
- ✅ PATCH-style product update
- ✅ Soft delete
- ✅ Brand information in response
- ✅ Category information in response
- ✅ Query performance measurement
- ✅ Consistent API error handling

---

## Product API

```text
GET     /products
GET     /products/barcode/:text
GET     /products/:id
POST    /products
PATCH   /products/:id
DELETE  /products/:id
```

**Product Controller → Product Model → Database**

This keeps the Product module simple, maintainable, and consistent with the existing Category and Brand modules.
