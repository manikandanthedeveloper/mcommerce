import Container from "./Container"
import { Skeleton } from "../ui/skeleton"

const ProductLoading = () => {
    return (
        <Container className="my-8">
            <div className="mt-6 grid gap-y-8 md:grid-cols-2 md:gap-x-4 lg:gap-x-8">
                <div className="relative h-140 w-full border border-primary/10 bg-primary/5 md:h-96 lg:h-140">
                    <Skeleton className="w-full h-full rounded-none" />
                </div>
                <div className="flex flex-col items-baseline gap-y-4">
                    <Skeleton className="w-full h-6 rounded-none" />
                    <Skeleton className="w-2/4 h-6 rounded-none" />
                    <Skeleton className="w-full h-6 rounded-none" />
                    <Skeleton className="w-2/4 h-6 rounded-none" />
                </div>
            </div>
        </Container>
    )
}

export default ProductLoading