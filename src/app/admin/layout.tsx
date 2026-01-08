import { LoaderIcon } from 'lucide-react';
import React, { ReactNode, Suspense } from 'react'

export default function LayoutAdmin({ 
    children,
 }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Suspense fallback={<div className='flex justify-center items-center'>
                <LoaderIcon className='size-4 animate-spin' />
            </div>}>
                {children}
            </Suspense>
        </div>
    )
}
