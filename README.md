# Product API Documentation

This repository contains a simple **Product API** built with Next.js and Docker, using PostgreSQL as the database. The API supports basic CRUD operations for products.

*Japanese Translation at Bottom*

---

## Prerequisites

* Docker & Docker Compose installed ([https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/))
* Node.js (for local scripts, if needed)
* Git (to clone the repo)

---

## Setup & Run

1. **Clone the repository**

   ```bash
   git clone https://github.com/daikiminaki/simple-product-api-nextjs.git
   cd simple-product-api-nextjs
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
| POST   | `/api/products`     | Create a new product       | JSON `{ name, price }`    | `201 Created`<br/>JSON newly created product                     |
| PUT    | `/api/products/:id` | Update an existing product | JSON `{ name, price? }` | `200 OK`<br/>JSON updated product<br/>`404 Not Found` if missing |
| DELETE | `/api/products/:id` | Delete a product           | N/A                                    | `204 No Content`<br/>`404 Not Found` if missing                  |

### Product Object Schema

```json
{
  "id": "bigint",
  "name": "string",
  "price": "integer"
}
```

---

## Additional Notes & Limitations

* **Migrations**: Uses Drizzle Kit to manage schema migrations.
* **Data persistence**: PostgreSQL data is stored in a named Docker volume (`pgdata`), so data remains between restarts.
* **No authentication**: All endpoints are public. Consider adding JWT or session-based auth for production.
* **Error handling**: Returns standard HTTP codes but no detailed error body. You may expand with richer error responses.

---

*For any questions or contributions, please open an issue or submit a pull request.*


# プロダクトAPI ドキュメント

このリポジトリは、Next.js と Docker を用いて構築されたシンプルなプロダクトAPIを含んでおり、データベースには PostgreSQL を使用しています。API はプロダクトの基本的な CRUD 操作をサポートします。

---

## 前提条件

* Docker & Docker Compose のインストール

  ```bash
  https://docs.docker.com/get-docker/
  ```
* Node.js（ローカルスクリプト実行時に必要）
* Git（リポジトリをクローンするため）

---

## セットアップ & 実行

1. リポジトリをクローン

   ```bash
   git clone https://github.com/daikiminaki/simple-product-api-nextjs.git
   cd simple-product-api-nextjs
   ```

2. 環境変数ファイルの作成と設定

   ```bash
   cp .env.example .env
   ```

   `.env` に以下を設定してください：

   ```ini
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=products_db
   DB_HOST=db
   DB_PORT=5432
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

3. サービスのビルド & 起動

   ```bash
   docker-compose build --no-cache
   docker-compose up -d
   ```

4. マイグレーションの適用（entrypoint スクリプトで自動実行）

   * 初回起動時に API コンテナが Postgres の起動を待機し、Drizzle マイグレーションを実行します。

5. 動作確認

   * API サーバーが `http://localhost:3000` で稼働していることを確認
   * `http://localhost:3000/api/products` にアクセスし、プロダクト一覧（初期状態では空の配列）を取得

6. 停止 & クリーンアップ

   ```bash
   docker-compose down
   ```

---

## Web API 仕様

すべてのエンドポイントは `/api/products` から始まります。

| メソッド   | パス                  | 説明           | リクエストボディ                                   | レスポンス                                          |
| ------ | ------------------- | ------------ | ------------------------------------------ | ---------------------------------------------- |
| GET    | `/api/products`     | すべてのプロダクト取得  | なし                                         | `200 OK`<br>JSON 配列（プロダクトオブジェクト）               |
| GET    | `/api/products/:id` | 特定IDのプロダクト取得 | なし                                         | `200 OK`<br>JSON オブジェクト<br>`404 Not Found`     |
| POST   | `/api/products`     | プロダクト作成      | JSON `{ "name": string, "price": number }` | `201 Created`<br>作成されたプロダクトの JSON              |
| PUT    | `/api/products/:id` | プロダクト更新      | JSON `{ "name"?, "price"? }`               | `200 OK`<br>更新後のプロダクトの JSON<br>`404 Not Found` |
| DELETE | `/api/products/:id` | プロダクト削除      | なし                                         | `204 No Content`<br>`404 Not Found`            |

### プロダクトオブジェクト スキーマ

```json
{
  "id": "bigint",
  "name": "string",
  "price": "integer",
  "createdAt": "string (ISO 8601)",
  "updatedAt": "string (ISO 8601)"
}
```

---

## 追加の注意点 & 制限事項

* **マイグレーション**: Drizzle Kit を使用してスキーママイグレーションを管理しています。
* **データ永続化**: PostgreSQL のデータは `pgdata` という名の Docker ボリュームに保存され、再起動後も保持されます。
* **認証なし**: すべてのエンドポイントは公開されています。必要に応じて JWT やセッション認証を追加してください。
* **エラー処理**: 標準的な HTTP ステータスコードを返しますが、詳細なエラー情報は含まれていません。必要に応じて拡張可能です。

---

ご質問やご要望がありましたら、Issue の作成または Pull Request をお待ちしております。
