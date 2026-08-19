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

