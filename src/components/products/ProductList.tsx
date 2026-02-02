import { Product } from "@/types/Product"
import ProductItem from "./ProductItem";

function ProductList({ products }: { products: Product[] }) {
    return (
        <div className="pt-5 flex flex-col gap-4">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} list={true} />
            ))}
        </div>
    )
}

export default ProductList