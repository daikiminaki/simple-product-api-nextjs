import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Check if required environment variables are set
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create postgres client
const client = postgres(process.env.DATABASE_URL);

// Create drizzle database instance
export const db = drizzle(client);
