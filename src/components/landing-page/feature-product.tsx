"use cache"
import SectionHeader from '../common/section-header'
import { ArrowRightIcon, StarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import ProductCard from '../products/product-card';
import { getFeaturedProducts } from '@/lib/products.ts/product-select';

export default async function FeatureProduct() {
    const featureProducts = await getFeaturedProducts();
  return (
    <section className="py-20 bg-fuchsia-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className='flex items-center justify-between mb-8'>
                <SectionHeader title='Title product' icon={StarIcon} description="Information the products" />
                <Button variant="outline" asChild  className='hidden sm:flex'>
                    <Link href="/explore">
                    View All
                    <ArrowRightIcon className='size-4F' />
                    </Link>
                </Button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {featureProducts.map(product => 
                <ProductCard key={product.id} product={product} />
                )}
            </div>
        </div>
    </section>
  )
}
