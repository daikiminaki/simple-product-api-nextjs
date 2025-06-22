#!/bin/sh
set -e

echo "⏳ Waiting for database at $DATABASE_URL…"
until pg_isready -d "$DATABASE_URL"; do
  sleep 1
done
echo "✅ Database is up!"

# generate & apply migrations
mkdir -p ./db/migrations
echo "🔧 Generating Drizzle migrations…"
npx drizzle-kit generate

# apply migrations
echo "🏃 Applying migrations…"
npx drizzle-kit push

# start Next.js
echo "🚀 Starting Next.js"
exec npm start
