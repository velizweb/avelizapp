"use client"

import { ClockIcon, SearchIcon, TrendingUpIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ProductCard from "./product-card";
import { Product } from "../../../types";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";



export default function ProductExplore({ products }: { products: Product[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortby, setSortBy] = useState<'trending' | 'recent' | 'newest'>("trending");


    const filteredProducts = useMemo(() => {
        const filtered = [...products];
        if (searchQuery.length > 0) {
            return filtered.filter(product => product.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
        }

        switch (sortby) {
            case "trending":
                return filtered.sort((a, b) => b.votecount! - a.votecount!);

            case "recent":
                return filtered.sort((a, b) =>
                    new Date(b.createdAt || "").getTime() -
                    new Date(a.createdAt || "").getTime()
                );

            case "newest":
                return filtered.sort((a, b) =>
                    new Date(b.createdAt || "").getTime() -
                    new Date(a.createdAt || "").getTime()
                );

            default:
                return filtered;
        }

    }, [searchQuery, products, sortby]);

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                    <Input
                        className="border border-fuchsia-400 pl-12"
                        type="text"
                        value={searchQuery}
                        placeholder="Search product"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <Button 
                        className={cn("border border-fuchsia-400 hover:bg-fuchsia-300 cursor-pointer", 
                            sortby === "trending"
                            ? "bg-fuchsia-500 text-white"
                            : "bg-transparent text-primary"
                        )}  
                        onClick={() => setSortBy("trending")}
                    >
                        <TrendingUpIcon className="size-4" />
                        Trendeing
                    </Button>
                    <Button 
                        className={cn("border border-fuchsia-400 hover:bg-fuchsia-300 cursor-pointer", 
                            sortby === "recent"
                            ? "bg-fuchsia-500 text-white"
                            : "bg-transparent text-primary"
                        )}   
                        onClick={() => setSortBy("recent")}
                    >
                        <ClockIcon className="size-4" />
                        Recent
                    </Button>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-sm text-primary">Showing {filteredProducts.length} products</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product =>
                    <ProductCard key={product.id} product={product} />
                )}
            </div>

        </>
    )
}
