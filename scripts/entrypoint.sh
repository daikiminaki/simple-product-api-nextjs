#!/bin/sh
set -e

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
