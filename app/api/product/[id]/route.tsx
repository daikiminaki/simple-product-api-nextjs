import { db } from "@/lib/db";
import { product } from "@/lib/db/schema/product";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET a product
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const productResult = await db
      .select()
      .from(product)
      .where(eq(product.id, Number(id)))
      .limit(1)
      .then(result => result[0]);

    if (!productResult) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(productResult, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT update a product
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { name, price } = await request.json();
  try {
    const productResult = await db
      .update(product)
      .set({ name, price })
      .where(eq(product.id, Number(id)))
      .returning();

    if (productResult.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(productResult[0], { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE a product
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const result = await db
      .delete(product)
      .where(eq(product.id, Number(id)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}