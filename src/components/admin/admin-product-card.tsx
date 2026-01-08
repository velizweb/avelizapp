import { TrashIcon } from "lucide-react";
import { Product } from "../../../types";
import { Badge } from "../ui/badge";
import { Card, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import ActionAdmin from "./action-admin";
import { cn } from "@/lib/utils";


export default function AdminProductCard({ product }: { product: Product }) {
    return (
        <Card className="border border-fuchsia-400 rounded-lg p-6 bg-transparent hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1 min-w-0 space-y-4">
                    <CardTitle className="text-lg font-semibold flex justify-between items-center">
                        {product.name}
                        <Badge className={cn(
                            product.status === "PENDING" && "bg-yellow-200 text-yellow-600 border-yellow-600",
                            product.status === "APPROVED" && "bg-green-200 text-green-600 border-green-500",
                            product.status === "REJECTED" && "bg-red-200 text-red-600 border-red-600",
                        )}>{product.status}</Badge>
                    </CardTitle>
                    <CardDescription className="flex flex-col gap-4">
                        {product.tagline}
                        <div className="flex items-center gap-2">
                            {product.votecount! > 100 && (
                                product.tags?.map((tag, index) => (
                                    <Badge key={index} className="bg-violet-400">{tag}</Badge>
                                ))
                            )}
                        </div>
                        <div className="flex gap-x-2 gap-y-2 text-sm text-primary">
                            <p>By: {product.submittedBy}</p>
                            <p>{product.createdAt ? new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                            })
                                .format(new Date(product.createdAt?.toISOString() ?? ""))
                                : ""
                            }</p>
                            <p>
                                <a
                                    href={product.websiteUrl ?? ""}
                                    target="_blank"
                                    rel="noopener nofererrer"
                                >
                                    Visit Website
                                </a>
                            </p>
                        </div>
                    </CardDescription>
                    <CardFooter>
                        <Button variant="outline" className="border border-fuchsia-400 hover:bg-fuchsia-500 hover:text-white cursor-pointer">
                            <TrashIcon className="size-4" />
                            Delete
                        </Button>
                    </CardFooter>
                </div>

                <div className="lg:shrink-0">
                    <ActionAdmin status={product.status ?? ""} productId={product.id} />
                </div>
            </div>
        </Card>
    )
}
