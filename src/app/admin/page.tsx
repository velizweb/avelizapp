
import AdminProductCard from "@/components/admin/admin-product-card";
import StatsCard from "@/components/admin/stats-card";
import EmptyState from "@/components/common/empty-state";
import SectionHeader from "@/components/common/section-header";
import { getAllProducts } from "@/lib/products.ts/product-select";
import { auth, clerkClient } from "@clerk/nextjs/server"
import { InboxIcon, ShieldIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const { userId } = await auth();
    
    if (!userId) {
        redirect("/sign-in");
    }

    const response = await clerkClient();
    const user = await response.users.getUser(userId!);

    //Metadata modificada en el panel de user en clerk
    const metadata = user.publicMetadata;
    const isAdmin = metadata?.isAdmin ?? false;

    if (!isAdmin) {
        redirect("/");
    }

    const allProducts = await getAllProducts();
    const approvedProducts = allProducts.filter(product => product.status === "APPROVED");
    const pendingProducts = allProducts.filter(product => product.status === "PENDING");
    const rejectedProducts = allProducts.filter(product => product.status === "REJECTED");

    return (
        <div className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <SectionHeader
                        title="Product ADmin"
                        icon={ShieldIcon}
                        description="Review and manage submitted products"
                    />
                </div>

                <StatsCard
                    approved={approvedProducts.length}
                    pending={pendingProducts.length}
                    rejected={rejectedProducts.length}
                    total={allProducts.length}
                />

                <section className="my-12">
                    <div className="flex-1 justify-start items-center mb-6">
                        <h2 className="text-2xl font-bold">Pending Products ({pendingProducts.length})</h2>
                    </div>

                    <div className="space-y-4">
                        {pendingProducts.length === 0 && (
                            <EmptyState message="No pending products to review" icon={InboxIcon} />
                        )}
                        {
                            pendingProducts.map(product =>(
                                <AdminProductCard key={product.id} product={product} />
                            ))
                        }
                    </div>
                </section>

                <section className="my-12">
                    <div className="flex-1 justify-start items-center mb-6">
                        <h2 className="text-2xl font-bold">All Products</h2>
                    </div>

                    <div className="space-y-4">
                        {
                            allProducts.map(product =>(
                                <AdminProductCard key={product.id} product={product} />
                            ))
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}
