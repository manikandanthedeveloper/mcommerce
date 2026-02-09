import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image";
import { Product } from "@/types/Product";
import { specialPrice } from "@/util/products";
import ProductLabel from "./ProductLabel";
import { formatCurrency } from "@/util/format";
import FavouriteButton from "./FavouriteButton";
import QuantityModifier from "./QuantityModifier";
import Link from "next/link";

function ProductItem({ product, list = false }: { product: Product, list?: boolean }) {
    const { name, image, price, specialPricePercent, isNew, slug } = product;
    const specialPriceValue = specialPrice({
        price,
        specialPricePercent: specialPricePercent ?? undefined,
    });
    const dollarsPrice = formatCurrency(price);
    const dollarsSpecialPrice = formatCurrency(specialPriceValue);

    return (

        <Card className={`p-0 rounded-none gap-0 shadow-none hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden relative ${list ? 'flex' : ''}`}>
            {(specialPricePercent && !isNew) && <ProductLabel position="left-0 top-0" color="bg-red-600">{specialPricePercent}% OFF</ProductLabel>}
            {isNew && <ProductLabel position="right-0 top-0" color="bg-green-600">New</ProductLabel>}

            <CardHeader className="p-0 m-0 gap-0 relative">
                <div className={`w-full h-48 overflow-hidden transition-transform hover:scale-105 duration-1000 ${list ? 'w-48 h-48 ' : ''}`}>
                    <Link href={`/products/${slug}`} className="block w-full h-full relative" passHref>
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            unoptimized
                            loading="eager"
                        />
                    </Link>
                </div>
                <div className="absolute bottom-2 right-2 z-20 bg-background/70">
                    {product.id && <FavouriteButton productId={product.id} />}
                </div>
            </CardHeader>

            <CardContent className="flex flex-col p-2 relative z-20">
                <h3 className="text-lg font-semibold capitalize mb-2"><Link href={`/products/${slug}`} passHref>{name}</Link></h3>
                <div className="flex items-center justify-between relative">
                    <Link href={`/products/${slug}`} passHref>
                        <div className="flex flex-col gap-1">
                            {specialPricePercent ? (
                                <>
                                    <p className="text-gray-600 line-through">
                                        {dollarsPrice}
                                    </p>
                                    <p className="text-red-500 font-semibold">
                                        {dollarsSpecialPrice}
                                    </p>
                                </>
                            ) : (
                                <p className="text-gray-600 mt-2">
                                    {dollarsPrice}
                                </p>
                            )}
                        </div>
                    </Link>
                    <QuantityModifier
                        productId={product.id ?? ""}
                        productName={name}
                        productImage={image}
                        productPrice={String(price)}
                        productSlug={slug}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductItem