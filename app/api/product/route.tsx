import { db } from "@/lib/db";
import { isValidSortKey, product, ProductKey } from "@/lib/db/schema/product";
import { gte, lte, and, ilike, asc, desc, AnyColumn } from "drizzle-orm";
import { NextResponse } from "next/server";

// POST a new product
export async function POST(request: Request) {
  try {
    const { name, price } = await request.json();

    const newProduct = await db
        .insert(product).values({ name, price }).returning();

    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product', details: error }, { status: 500 });
  }
}

// GET products with pagination
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;
  const offset = (Number(page) - 1) * Number(limit);

  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'id';
  const sortKey = isValidSortKey(sortBy) ? sortBy : 'id';
  const sortColumn = product[sortKey as ProductKey] as AnyColumn;
  const orderBy = searchParams.get('orderBy') || 'asc';

  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');

  try {

    const conditions = [];

    if (search) {
      conditions.push(ilike(product.name, `%${search}%`));
    }
    if (priceMin) {
      conditions.push(gte(product.price, Number(priceMin)));
    }
    if (priceMax) {
      conditions.push(lte(product.price, Number(priceMax)));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const products = await db
      .select()
      .from(product)
      .where(whereClause)
      .orderBy(orderBy === 'asc' 
        ? asc(sortColumn)
        : desc(sortColumn))
      .limit(Number(limit))
      .offset(Number(offset))

    return NextResponse.json({
      products,
      page: Number(page),
      limit: Number(limit),
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
