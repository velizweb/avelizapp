import SectionHeader from '../common/section-header'
import { CalendarIcon, RocketIcon } from 'lucide-react'
import ProductCard from '../products/product-card';
import EmptyState from '../common/empty-state';
import { getRecentlyLaunchedProducts } from '@/lib/products.ts/product-select';


export default async function RecentlyLaunchedProducts() {

    const recentlyLaunchedProducts = await getRecentlyLaunchedProducts();

    return (
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <SectionHeader
                    title='Recently Launched Products'
                    description="Check out the latest products launched on our platform."
                    icon={RocketIcon}
                />


                {recentlyLaunchedProducts.length > 0 ?
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {recentlyLaunchedProducts.map((product: any) =>
                            <ProductCard key={product.id} product={product} />
                        )}
                    </div>
                    : (<EmptyState message="No recently launched products available." icon={CalendarIcon} />)
                }
            </div>
        </section >
    )
}
