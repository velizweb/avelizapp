"use cache"

import SectionHeader from "@/components/common/section-header";
import ProductExplore from "@/components/products/product-explore";
import { getAllApprovedProducts } from "@/lib/products.ts/product-select";
import { CompassIcon } from "lucide-react";
import { Suspense } from "react";

export default async function ExplorePage() {
    const products = await getAllApprovedProducts();
    return (
        <div className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Explore all Products"
                    icon={CompassIcon}
                    description="Browse and discovery all products shared from our community"
                />
                <Suspense>
                    <ProductExplore products={products} />
                </Suspense>
            </div>
        </div>
    )
}
