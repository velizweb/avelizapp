import SectionHeader from "@/components/common/section-header";
import ProductSubmitForm from "@/components/products/product-submit-form";
import { SparklesIcon } from "lucide-react";


export default function SubmitPage() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader icon={SparklesIcon} title="Submit Your Product" description="Share your content with our community by submitting it here." />
                <div className="max-w-2xl mx-auto">
                    <ProductSubmitForm />
                </div>
            </div>
        </section>
    )
}
