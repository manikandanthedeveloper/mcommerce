import ProductsGrid from "./ProductsGrid";
import ProductList from "./ProductList";
import { Product } from "@/types/Product";
import ProductNotFound from "./ProductNotFound";
import GridToggle from "./GridToggle";

async function ProductsContainer({ products, layout, searchQuery, slug }: { products: Product[]; layout: string; searchQuery: string; slug: string }) {
    const totalProducts = products.length;
    const searchTerm = searchQuery ? `&search=${searchQuery}`.toLowerCase() : '';

    return (
        <>
            <GridToggle totalProducts={totalProducts} layout={layout} searchTerm={searchTerm} slug={slug} />
            {totalProducts === 0 ? (
                <ProductNotFound />
            ) : layout === 'grid' ? (
                < ProductsGrid products={products} />
            ) : (<ProductList products={products} />)}
        </>
    );
}

export default ProductsContainer