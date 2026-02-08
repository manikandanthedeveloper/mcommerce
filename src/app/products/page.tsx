import { Suspense } from "react";
import Container from "@/components/global/Container";
import ProductsLoading from "@/components/global/ProductsLoading";
import ProductsContainer from "@/components/products/ProductsContainer";
import { Product } from "@/types/Product";
import { fetchAllProducts } from "@/util/actions";

async function ProductsPage({ searchParams }: { searchParams: Promise<{ layout?: string, search?: string }> }) {
  const params = await searchParams;
  const layout = params.layout || 'grid';
  const searchQuery = params.search || '';

  const fetchedProducts = await fetchAllProducts();
  const products: Product[] = fetchedProducts.map(product => ({
    ...product,
    categoryId: product.categoryId // Replace with actual category name lookup if needed
  }));

  return (
    <Suspense fallback={<ProductsLoading />}>
      <Container className="my-8 h-screen">
        <ProductsContainer layout={layout} searchQuery={searchQuery} products={products} slug="All Products" />
      </Container>
    </Suspense >
  );
}

export default ProductsPage