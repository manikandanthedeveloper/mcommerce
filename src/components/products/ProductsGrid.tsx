import { Product } from "@/types/Product"
import ProductItem from "./ProductItem"

function ProductsGrid({ products }: { products: Product[] }) {
    return (
        <div className="pt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductsGrid