import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { connection } from "next/server";

export async function getFeaturedProducts() {
    "use cache";
    const productsData = await db
        .select()
        .from(products)
        .where(eq(products.status, "APPROVED"))
        .orderBy(desc(products.votecount));
    return productsData;
}

export async function getAllProducts() {
    "use cache"
    const productsData = await db
        .select()
        .from(products)
        .orderBy(desc(products.votecount));
    return productsData;
}

export async function getAllApprovedProducts() {
    const productsData = await db
        .select()
        .from(products)
        .where(eq(products.status, "APPROVED"))
        .orderBy(desc(products.votecount));
    return productsData;
}

export async function getRecentlyLaunchedProducts() {
    await connection();

    const productsData = await getAllApprovedProducts();
    const onWeekAgo = new Date();
    onWeekAgo.setDate(onWeekAgo.getDate() - 12);

    return productsData.filter(product => product.createdAt! >= onWeekAgo && [1,3,6,8].includes(product.id));
}

export const getProductBySlug = async (slug: string) => {
    const product =  await db
                    .select()
                    .from(products)
                    .where(eq(products.slug, slug));
                    
    return product?.[0] ?? null;
}