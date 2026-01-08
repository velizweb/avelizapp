"use client"
import { approvedProductAction, rejectProductAction } from '@/lib/admin/admin-action';
import { Button } from '../ui/button'
import { CheckCircleIcon, XCircleIcon } from 'lucide-react'
import { Product } from '../../../types';

export default function ActionAdmin({ status, productId }: { status: string, productId: Product["id"] }) {

    const handleApprove = async () => {
        await approvedProductAction(productId);
    }

    const handleRejected = async () => {
        await rejectProductAction(productId);
    }

    return (
        <div className='space-y-2'>
            {status === "PENDING" && (
                <div className='flex gap-2'>
                    <Button
                        onClick={handleApprove} 
                        variant={"default"} 
                        className='border border-fuchsia-400 bg-fuchsia-500 cursor-pointer hover:bg-fuchsia-400'>
                        <CheckCircleIcon className='size-4' />
                        Approve
                    </Button>
                    <Button 
                        onClick={handleRejected}
                        variant={"destructive"} 
                        className='border border-fuchsia-400 cursor-pointer'>
                        <XCircleIcon className='size-4' />
                        Rejected
                    </Button>
                </div>
            )}
        </div>
    )
}
