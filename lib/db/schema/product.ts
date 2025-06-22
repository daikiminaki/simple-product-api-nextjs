import { sql } from "drizzle-orm";
import { bigint, integer, pgTable, text } from "drizzle-orm/pg-core";

export const product = pgTable("product", {
    id: bigint({ mode: "number" }).primaryKey().default(sql`gen_random_uuid()`),
    name: text().notNull(),
    price: integer().notNull(),
});

export type ProductKey = keyof typeof product;

export function isValidSortKey(key: string): key is ProductKey {
  return key in product;
}