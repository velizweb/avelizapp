"use client"
import { downVoteProduct, upVoteProduct } from '@/lib/products.ts/product-actions'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { ChevronDownIcon, ChevronUpIcon, Loader2Icon } from 'lucide-react'
import { useOptimistic, useTransition } from 'react'

export default function VotingButton({
    hasVoted,
    voteCount: initialVoteCount,
    productId
}: {
    hasVoted?: boolean,
    voteCount: number,
    productId: number
}) {

    const [optimisticVoteCount, setOptimisticVoteCount] = useOptimistic(
        initialVoteCount,
        (currentVotecount, change: number) => Math.max(0, currentVotecount + change));

    const [isPending, startTransition] = useTransition();

    const handleUpVote = async () => {
        startTransition(async () => {
            setOptimisticVoteCount(1);
            const result = await upVoteProduct(productId);
        })

    }

    const handleDownVote = async () => {
        startTransition(async () => {
            setOptimisticVoteCount(-1);
            const result = await downVoteProduct(productId);
        });
    }

    return (
        <div
            className='flex flex-col items-center gap-1 shrink-0'
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <Button
                onClick={handleUpVote}
                variant="ghost"
                size="icon-sm"
                className={cn("h-8 w-8 text-primary",
                    hasVoted
                        ? "bg-primary/10 text-primary hover:bg-primary/20"
                        : "hover:bg-primary/10 hover:text-primary")}
                    disabled={isPending}
            >
                <ChevronUpIcon className="size-5" />
            </Button>
            <span
                className="text-sm font-semibold transition-colors text-foreground">
                {optimisticVoteCount}
            </span>
            <Button
                onClick={handleDownVote}
                variant="ghost"
                size="icon-sm"
                className={cn("h-8 w-8 text-primary",
                    hasVoted
                        ? "hover:text-destructive"
                        : "opacity-50 cursor-not-allowed")}
                disabled={isPending}
            >
                <ChevronDownIcon className="size-5" />
            </Button>
        </div>
    )
}
