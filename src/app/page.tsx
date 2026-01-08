import FeatureProduct from "@/components/landing-page/feature-product";
import HeroSection from "@/components/landing-page/hero-section";
import RecentlyLaunchedProducts from "@/components/landing-page/recently-launched-products";
import ProductSkeleton from "@/components/products/product-skeleton";
import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeatureProduct />

      <Suspense fallback={
        <ProductSkeleton />
      }>
        <RecentlyLaunchedProducts />
      </Suspense>
    </div>
  );
}
