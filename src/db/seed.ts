import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { products } from "./schema";
import { allProducts } from "./data";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    console.log("Seeding database ...");

    await db.delete(products);

    console.log("Creared exiting data");

    for (const product of allProducts) {
        await db.insert(products).values({
            name: product.name,
            slug: product.slug,
            tagline: product.tagline,
            description: product.description,
            websiteUrl: product.websiteUrl,
            tags: product.tags,
            votecount: product.votecount || 0,
            createdAt: product.createdAt,
            approvedAt: product.approvedAt,
            status: product.status,
            submittedBy: product.submittedBy,
        });
    }
    console.log("Seeding db success")
}

main()
.catch(error => {
    console.log("Error sending database", error);
    process.exit(1);
})
.finally(() => {
    console.log("Seeding completed!");
    process.exit(0);
});