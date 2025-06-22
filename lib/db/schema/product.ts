import { integer, pgTable, text, bigserial } from "drizzle-orm/pg-core";

export const product = pgTable("product", {
    id: bigserial({ mode: "number" }).primaryKey(),
    name: text().notNull(),
    price: integer().notNull(),
});

export type ProductKey = keyof typeof product;

export function isValidSortKey(key: string): key is ProductKey {
  return key in product;
}