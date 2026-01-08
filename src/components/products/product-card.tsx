import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { StarIcon } from "lucide-react";
import VotingButton from "./voting-button";
import { Product } from "../../../types";

export default function ProductCard({ product }: { product: Product }) {
    let hasVoted = false; // This should be determined by user state in a real app

    return (
        <Link href={`/products/${product.slug}`}>
            <Card className="group card-hover border-solid border-gray-400 min-h-45 transition-transform duration-300 hover:scale-105 transform">
                <CardHeader className="flex-1">
                    <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-lg group-hover:text-fuchsia-500 transition-colors">
                                    {product.name}
                                </CardTitle>
                                {product.votecount! > 10 &&
                                    <Badge className="gap-1 bg-fuchsia-500 text-primary-foreground">
                                        <StarIcon className="size-3 fill-current" />
                                        Featured
                                    </Badge>}
                            </div>
                            <CardDescription>{product.description!.length > 100 ? product.description?.substring(0, 100) + '...' : product.description}</CardDescription>
                        </div>

                        <VotingButton
                            hasVoted={hasVoted}
                            voteCount={product.votecount!}
                            productId={product.id}
                        />
                    </div>
                </CardHeader>
                <CardFooter>
                    <div className="flex items-center gap-2">
                        {product.tags?.map((tag, index) => (
                            <Badge key={index} className="bg-violet-400">{tag}</Badge>
                        ))}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
