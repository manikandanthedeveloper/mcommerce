import { Skeleton } from "../ui/skeleton"
import Container from "./Container"

function ProductsLoading() {
    return (
        <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="space-y-2 border p-2 rounded-none">
                        <Skeleton className="w-full h-64 rounded-none" />
                        <Skeleton className="w-3/4 h-6 rounded-none" />
                        <Skeleton className="w-1/2 h-6 rounded-none" />
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default ProductsLoading