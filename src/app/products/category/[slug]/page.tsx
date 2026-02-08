import Container from "@/components/global/Container";
import ProductsLoading from "@/components/global/ProductsLoading";
import ProductsContainer from "@/components/products/ProductsContainer";
import { Product } from "@/types/Product";
import { fetchProductsByCategory } from "@/util/actions";
import { Suspense } from "react";

async function CategoryPage({
    params,
    searchParams
}: {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ layout?: string, search?: string }>
}) {
    const routeParams = await params;
    const searchParams_resolved = await searchParams;
    const layout = searchParams_resolved.layout || 'grid';
    const searchQuery = searchParams_resolved.search || '';
    const slug = routeParams.slug;

    const fetchedProducts = await fetchProductsByCategory(slug);
    const products: Product[] = fetchedProducts.map(product => ({
        ...product,
        categoryId: product.categoryId || ''
    }));

    return (
        <Suspense fallback={<ProductsLoading />}>
            <Container className="my-8 h-screen">
                <ProductsContainer layout={layout || 'grid'} searchQuery={searchQuery || ''} products={products} slug={slug || ''} />
            </Container>
        </Suspense>
    );
}

export default CategoryPage