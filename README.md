# Category API

A clean RESTful Category API built with **Node.js, Express, TypeScript, and Knex.js**.

This module provides complete CRUD functionality for product categories with:

* Category creation
* Category listing
* Category details
* Category updating
* Category deletion
* Automatic slug generation
* Duplicate slug protection
* Pagination
* Search
* Parent/child category support
* Consistent API responses
* HTTP status code handling

---

## Features

### Category CRUD

The Category API supports the following operations:

```text
GET     /categories
GET     /categories/:id
POST    /categories
PATCH   /categories/:id
DELETE  /categories/:id
```

### Additional Features

* Automatic slug generation using `slugify`
* Duplicate category detection
* Database-level unique slug support
* Pagination
* Category search
* Parent category support
* Child category deletion protection
* Centralized response helpers
* Centralized HTTP status constants
* TypeScript type safety
* Async/await error handling

---

# API Endpoints

## Get Categories

Returns a paginated list of categories.

### Request

```http
GET /categories
```

### Query Parameters

| Parameter | Type   | Default | Description             |
| --------- | ------ | ------: | ----------------------- |
| `page`    | number |     `1` | Current page            |
| `limit`   | number |    `20` | Number of records       |
| `search`  | string |   empty | Search by category name |

### Example

```http
GET /categories?page=1&limit=20&search=electronics
```

### Response

```json
{
    "success": true,
    "message": "Categories retrieved successfully",
    "data": [],
    "meta": {
        "page": 1,
        "limit": 20,
        "total": 0,
        "totalPages": 0
    }
}
```

---

# Get Category

Returns a single category by ID.

### Request

```http
GET /categories/1
```

### Response

```json
{
    "success": true,
    "message": "Category retrieved successfully",
    "data": {
        "id": 1,
        "parent_id": null,
        "name": "Electronics",
        "slug": "electronics",
        "description": "Electronic products",
        "image": null,
        "sort_order": 0,
        "status": 1
    }
}
```

---

# Create Category

Creates a new category.

### Request

```http
POST /categories
Content-Type: application/json
```

### Body

```json
{
    "name": "Electronics",
    "description": "Electronic products",
    "image": "electronics.jpg",
    "parent_id": null,
    "sort_order": 1,
    "status": 1
}
```

### Generated Slug

The API automatically generates:

```text
electronics
```

from:

```text
Electronics
```

### Success Response

```json
{
    "success": true,
    "message": "Category created successfully",
    "data": {
        "id": 1,
        "parent_id": null,
        "name": "Electronics",
        "slug": "electronics",
        "description": "Electronic products",
        "image": "electronics.jpg",
        "sort_order": 1,
        "status": 1
    }
}
```

---

# Update Category

Updates an existing category.

### Request

```http
PATCH /categories/1
Content-Type: application/json
```

### Body

```json
{
    "name": "Mobile Electronics",
    "description": "Mobile electronic products"
}
```

The API automatically regenerates the slug:

```text
mobile-electronics
```

Only submitted fields are updated.

This makes the endpoint suitable for true `PATCH` behavior.

---

# Delete Category

Deletes a category.

### Request

```http
DELETE /categories/1
```

Before deletion, the API checks whether the category contains child categories.

If the category is being used by products, a product dependency check should also be enabled.

### Success Response

```json
{
    "success": true,
    "message": "Category deleted successfully"
}
```

---

# Category Structure

Categories support parent/child relationships.

Example:

```text
Electronics
├── Mobile
├── Laptop
├── Television
└── Accessories
```

Database example:

```text
Electronics
id = 1
parent_id = null

Mobile
id = 2
parent_id = 1

Laptop
id = 3
parent_id = 1
```

A category with child categories should not be deleted until its children are handled.

---

# Database Recommendation

The `slug` column should have a unique index.

```sql
ALTER TABLE categories
ADD UNIQUE INDEX categories_slug_unique (slug);
```

This provides database-level protection against duplicate slugs.

For parent categories, use a foreign key:

```sql
ALTER TABLE categories
ADD CONSTRAINT categories_parent_id_foreign
FOREIGN KEY (parent_id)
REFERENCES categories(id)
ON DELETE RESTRICT
ON UPDATE CASCADE;
```

---

# Suggested Table Structure

```text
categories
--------------------------------
id
parent_id
name
slug
description
image
sort_order
status
created_at
updated_at
```

Recommended types:

```text
id          BIGINT UNSIGNED
parent_id   BIGINT UNSIGNED NULL
name        VARCHAR(255)
slug        VARCHAR(255) UNIQUE
description TEXT NULL
image       VARCHAR(255) NULL
sort_order  INT DEFAULT 0
status      TINYINT DEFAULT 1
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

---

# Controller Structure

The controller follows a simple responsibility-based structure:

```text
CategoryController
│
├── index()
│   └── Get category list
│
├── show()
│   └── Get single category
│
├── create()
│   └── Create category
│
├── update()
│   └── Update category
│
└── destroy()
    └── Delete category
```

Each method is responsible for one specific operation.

---

# Validation

Category creation requires:

```text
name
```

The following validation is performed:

```text
1. Check whether name exists
2. Trim the name
3. Generate slug
4. Check duplicate slug
5. Insert category
```

For updates:

```text
1. Check category existence
2. Validate submitted name
3. Generate new slug when name changes
4. Check duplicate slug
5. Update only submitted fields
```

---

# Error Handling

All controller methods use `try/catch`.

Example:

```ts
try {
    // Application logic
} catch (error) {
    return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json(
            _error({
                message: "Something went wrong",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            })
        );
}
```

This keeps API responses consistent.

---

# Response Convention

Successful response:

```json
{
    "success": true,
    "message": "Operation completed successfully",
    "data": {}
}
```

Error response:

```json
{
    "success": false,
    "message": "Category not found"
}
```

The project should keep response formatting centralized through:

```ts
_success()
_error()
```

---

# HTTP Status Codes

Recommended status codes:

| Status | Usage                 |
| ------ | --------------------- |
| `200`  | Successful request    |
| `201`  | Resource created      |
| `400`  | Invalid request       |
| `404`  | Resource not found    |
| `409`  | Duplicate/conflict    |
| `500`  | Internal server error |

For category creation:

```ts
STATUS.CREATED
```

should be preferred over:

```ts
STATUS.OK
```

---

# Performance Recommendations

## 1. Add database indexes

Recommended indexes:

```sql
CREATE UNIQUE INDEX categories_slug_unique
ON categories(slug);

CREATE INDEX categories_parent_id_index
ON categories(parent_id);

CREATE INDEX categories_status_index
ON categories(status);

CREATE INDEX categories_sort_order_index
ON categories(sort_order);
```

---

## 2. Use Pagination

Never return thousands of categories without pagination.

Recommended:

```text
?page=1&limit=20
```

The API limits the maximum page size to prevent unnecessarily large queries.

---

## 3. Use Database Constraints

Application-level validation is useful, but important rules should also exist in the database.

Examples:

```text
slug UNIQUE
parent_id FOREIGN KEY
```

---

## 4. Avoid Unnecessary Queries

After creating or updating a category, fetching the final record ensures the API returns the database-generated values.

This is preferable to returning only the original request object.

---

# Recommended Project Structure

```text
src/
│
├── Controllers/
│   └── CategoryController.ts
│
├── Models/
│   └── categorys.model.ts
│
├── helpers/
│   └── appHelper.ts
│
├── config/
│   └── status.ts
│
├── routes/
│   └── api.ts
│
└── @types/
    ├── index.ts
    └── table.ts
```

---

# Routes

```ts
Route.group({ prefix: "/categories" }, () => {

    Route.get("/", CategoryController.index);

    Route.get("/:id", CategoryController.show);

    Route.post("/", CategoryController.create);

    Route.patch("/:id", CategoryController.update);

    Route.delete("/:id", CategoryController.destroy);

});
```

---

# REST API Design

The API follows REST-style naming:

```text
GET     /categories
GET     /categories/:id
POST    /categories
PATCH   /categories/:id
DELETE  /categories/:id
```

Avoid action-based URLs such as:

```text
/categories/create
/categories/update/1
/categories/delete/1
```

The HTTP method already describes the action.

---

# Future Improvements

The category module can later be extended with:

* Category tree API
* Category slug lookup
* Active/inactive filtering
* Category image upload
* Soft delete
* Product dependency validation
* Category caching
* Redis caching
* Bulk category operations
* Category ordering
* Nested category tree
* Database transactions
* Request validation middleware
* Authorization/permission middleware
* API rate limiting

---

# Final Architecture

The recommended flow is:

```text
Request
   │
   ▼
Route
   │
   ▼
Controller
   │
   ├── Validate
   │
   ├── Business Logic
   │
   └── Response
   │
   ▼
Model
   │
   ▼
Knex
   │
   ▼
MySQL / MariaDB
```

This keeps routing, controller logic, database access, and response formatting separated.

---

# Conclusion

The Category API is designed as a clean CRUD module for a TypeScript/Express application.

The main design goals are:

```text
Clean Controller
      +
Type Safety
      +
RESTful Routes
      +
Database Constraints
      +
Consistent Responses
      +
Pagination
      +
Error Handling
      +
Performance
```

This structure is suitable for extending the application with other modules such as:

```text
Products
Brands
Orders
Customers
Users
Inventory
Attributes
Coupons
Payments
```

while keeping the same controller architecture.
#   s t o r e  
 