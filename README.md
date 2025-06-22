# Product API Documentation

This repository contains a simple **Product API** built with Next.js and Docker, using PostgreSQL as the database. The API supports basic CRUD operations for products.

---

## Prerequisites

* Docker & Docker Compose installed ([https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/))
* Node.js (for local scripts, if needed)
* Git (to clone the repo)

---

## Setup & Run

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/your-repo.git
   cd your-repo
   ```

2. **Create and configure environment variables**

   * Copy the example file:

     ```bash
     cp .env.example .env
     ```
   * Edit `.env` and set the following values:

     ```ini
     DB_USER=postgres
     DB_PASSWORD=postgres
     DB_NAME=products_db
     DB_HOST=db
     DB_PORT=5432
     NEXT_PUBLIC_API_URL=http://localhost:3000/api
     ```

3. **Build and start services**

   ```bash
   docker-compose build --no-cache
   docker-compose up -d
   ```

4. **Apply database migrations** (handled automatically by the entrypoint script)

   * On first startup, the API container will wait for Postgres, then run Drizzle migrations.

5. **Verify**

   * The API server should be running at `http://localhost:3000`
   * Visit `http://localhost:3000/api/products` to list products (initially an empty array).

6. **Stopping & Cleanup**

   ```bash
   docker-compose down
   ```

---

## Web API Specifications

All endpoints are prefixed with `/api/products`.

| Method | Path                | Description                | Request Body                           | Response                                                         |
| ------ | ------------------- | -------------------------- | -------------------------------------- | ---------------------------------------------------------------- |
| GET    | `/api/products`     | List all products          | N/A                                    | `200 OK`<br/>JSON array of product objects                       |
| GET    | `/api/products/:id` | Get a single product by ID | N/A                                    | `200 OK`<br/>JSON product object<br/>`404 Not Found` if missing  |
| POST   | `/api/products`     | Create a new product       | JSON `{ name, description, price }`    | `201 Created`<br/>JSON newly created product                     |
| PUT    | `/api/products/:id` | Update an existing product | JSON `{ name?, description?, price? }` | `200 OK`<br/>JSON updated product<br/>`404 Not Found` if missing |
| DELETE | `/api/products/:id` | Delete a product           | N/A                                    | `204 No Content`<br/>`404 Not Found` if missing                  |

### Product Object Schema

```json
{
  "id": "string (UUID)",
  "name": "string",
  "description": "string",
  "price": "number",
  "createdAt": "string (ISO 8601)",
  "updatedAt": "string (ISO 8601)"
}
```

---

## Additional Notes & Limitations

* **Migrations**: Uses Drizzle Kit to manage schema migrations. The `scripts/entrypoint.sh` runs `npx drizzle-kit push` automatically at container start.
* **Data persistence**: PostgreSQL data is stored in a named Docker volume (`db-data`), so data remains between restarts.
* **No authentication**: All endpoints are public. Consider adding JWT or session-based auth for production.
* **No pagination**: The `GET /api/products` endpoint returns all products. For large datasets, add `limit`/`offset` query parameters.
* **Error handling**: Returns standard HTTP codes but no detailed error body. You may expand with richer error responses.
* **Custom build output**: This project uses the default `.next` build directory. If you change `distDir` in `next.config.js`, update the Dockerfile accordingly.

---

*For any questions or contributions, please open an issue or submit a pull request.*
