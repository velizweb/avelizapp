"use cache"

import SectionHeader from "@/components/common/section-header";
import VotingButton from "@/components/products/voting-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, getProductBySlug } from "@/lib/products.ts/product-select";
import { ArrowBigLeftIcon, CalendarIcon, ExternalLinkIcon, GlobeIcon, StarIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const products = await getFeaturedProducts();
  return products.map(product => ({ slug: product.slug.toString() }));
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { name, description, tagline, websiteUrl, tags, votecount } = product;

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={"/explore"} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowBigLeftIcon className="size-4" />
          Back to explore
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">

            <div className="flex items-start gap-6">
              <div className="flex-1 min-w-0">
                <div className="mb-6">
                  <SectionHeader title={name} icon={StarIcon} description={tagline ?? ""} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags?.map(tag => (<Badge className="bg-violet-400 text-primary-foreground" key={tag}>{tag}</Badge>))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            <div className="border border-fuchsia-400 bg-fuchsia-300 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Product Details</h2>

              <div className="space-y-3">
                {
                  [
                    {
                      label: "Launched:",
                      value: new Date(product.createdAt?.toISOString() ?? "").toLocaleDateString(),
                      icon: CalendarIcon
                    },
                    {
                      label: "Submitted by:",
                      value: product.submittedBy,
                      icon: UserIcon
                    },
                    {
                      label: "Website:",
                      value: product.websiteUrl,
                      icon: GlobeIcon
                    },
                  ].map(({ label, value, icon: Icon }) => (
                    <div className="flex items-center gap-2 text-sm" key={label}>
                      {Icon && <Icon className="size-4 text-primary" />}
                      <span className="text-primary">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="border border-fuchsia-400  rounded-lg p-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-primary mb-2">
                    Support this product
                  </p>

                  <VotingButton productId={product.id} voteCount={votecount!} />
                </div>
                {votecount! > 100 &&
                  <div className="pt-6 border-t">
                    <Badge className="w-full justify-center py-2 bg-fuchsia-500">
                      <StarIcon className="size-4" />
                      Featured Product
                    </Badge>
                  </div>
                }
              </div>

              {websiteUrl &&
                <Button asChild className="w-full rounded-ld border-fuchsia-400 hover:bg-fuchsia-500 hover:text-white" variant="outline">
                  <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                    Visit website <ExternalLinkIcon className="size-4 ml-2" />
                  </a>
                </Button>
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
