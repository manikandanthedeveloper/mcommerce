import ProductsLoading from "@/components/global/ProductsLoading"
import HeroBanner from "@/components/home/HeroBanner"
import PromotionProducts from "@/components/products/PromotionProducts"
import { Suspense } from "react"

async function HomePage() {
  return (
    <>
      <HeroBanner />
      <Suspense fallback={<ProductsLoading />}>
        <PromotionProducts productsType="featured" sectionTitle="Featured Products" />
      </Suspense>
      <Suspense fallback={<ProductsLoading />}>
        <PromotionProducts productsType="new" sectionTitle="New Products" />
      </Suspense>
    </>
  )
}

export default HomePage