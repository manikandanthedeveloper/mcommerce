
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { fetchFeaturedProducts, fetchNewProducts } from "@/util/actions";
import Container from "../global/Container"
import SectionTitle from "../global/SectionTitle"
import ProductItem from "./ProductItem";
import { Product } from "@/types/Product";

async function PromotionProducts({ productsType, sectionTitle }: { productsType?: 'featured' | 'new', sectionTitle?: string }) {
    let products: Product[] = [];

    if (productsType === 'new') {
        const newProducts = await fetchNewProducts();
        products = newProducts.map(p => ({
            ...p,
            categoryId: p.categoryId || ''
        }));
    }

    if (productsType === 'featured') {
        const featuredProducts = await fetchFeaturedProducts();
        products = featuredProducts.map(p => ({
            ...p,
            categoryId: p.categoryId || ''
        }));
    }

    return (
        <Container className="my-8">
            <SectionTitle title={sectionTitle || (productsType === 'new' ? "New Products" : "Featured Products")} />
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {products.map((product) => {
                        return (
                            <CarouselItem key={product.id} className="basis-1/2 lg:basis-1/4">
                                <ProductItem product={product} />
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </Container >
    )
}

export default PromotionProducts