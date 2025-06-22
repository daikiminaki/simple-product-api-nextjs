import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema/product.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
