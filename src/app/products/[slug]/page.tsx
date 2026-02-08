import { Suspense } from "react";
import Image from "next/image";

import Container from "@/components/global/Container";
import ProductLoading from "@/components/global/ProductLoading";
import ProductsLoading from "@/components/global/ProductsLoading";
import FavouriteButton from "@/components/products/FavouriteButton";
import { ProductBreadcrumb } from "@/components/products/ProductBreadcrumb";
import ProductLabel from "@/components/products/ProductLabel";
import ProductRating from "@/components/products/ProductRating";
import PromotionProducts from "@/components/products/PromotionProducts";
import QuantityModifier from "@/components/products/QuantityModifier";
import ShareButton from "@/components/products/single/ShareButton";
import ProductReviews from "@/components/reviews/ProductReviews";
import { fetchCategoryById, fetchProductBySlug, findExistingReview } from "@/util/actions";
import { formatCurrency } from "@/util/format";
import { specialPrice } from "@/util/products";
import { auth } from "@clerk/nextjs/server";
import SubmitReview from "@/components/reviews/SubmitReview";


async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const fetchedProduct = await fetchProductBySlug(slug);
  const fetchedCategory = await fetchCategoryById(fetchedProduct?.categoryId || '');

  const { id: productId, name: productName, image, description, price, specialPricePercent, isNew } = fetchedProduct || {};
  const { name: categoryName, slug: categorySlug } = fetchedCategory || {};
  const dollarsAmount = formatCurrency(price || 0);
  const specialPriceValue = specialPricePercent
    ? formatCurrency(specialPrice({
      price: price || 0,
      specialPricePercent: specialPricePercent ?? undefined,
    }))
    : null;
  const { userId } = await auth();
  const reviewDoesNotExist = userId && !(await findExistingReview(userId, productId || ''));

  return (
    <>
      <Suspense fallback={<ProductLoading />}>
        <Container className="my-8">
          <ProductBreadcrumb productName={productName} categoryName={categoryName} categorySlug={categorySlug} />
          <section className="mt-6 grid gap-y-8 md:grid-cols-2 md:gap-x-4 lg:gap-x-8">
            <div className="relative h-140 w-full border border-primary/10 bg-primary/5 md:h-96 lg:h-140">
              {(specialPricePercent && !isNew) && <ProductLabel position="left-1 top-1" color="bg-red-600">{specialPricePercent}% OFF</ProductLabel>}
              {isNew && <ProductLabel position="right-1 top-1" color="bg-green-600">New</ProductLabel>}
              <Image
                src={image || '/placeholder.png'}
                alt={productName || 'Product Image'}
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                className="rounded-none object-cover"
                loading="eager"
              />
            </div>
            <div className="flex flex-col gap-y-6">
              <div>
                <div className='flex gap-x-8 items-center'>
                  <h3 className="text-2xl font-semibold text-primary-dark capitalize">{productName}</h3>
                  {productId && <FavouriteButton productId={productId} />}
                  <ShareButton productId={productId || ''} name={productName || ''} />
                </div>
                <ProductRating productId={productId || ''} />
                <p className="mt-2 text-lg text-primary-dark/50">{description}</p>
              </div>
              <div className="flex items-baseline gap-x-4">
                {specialPriceValue ? (
                  <>
                    <span className="text-2xl font-bold text-primary-dark">{specialPriceValue}</span>
                    <span className="text-lg text-primary-dark/50 line-through">{dollarsAmount}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-primary-dark">{dollarsAmount}</span>
                )}
              </div>
              <QuantityModifier />
            </div>
          </section>
          <ProductReviews productId={productId || ''} />
          {reviewDoesNotExist && <SubmitReview productId={productId || ''} />}
        </Container>
      </Suspense>
      <Suspense fallback={<ProductsLoading />}>
        <PromotionProducts productsType="new" sectionTitle="New Products" />
      </Suspense>
    </>
  )
}

export default ProductPage