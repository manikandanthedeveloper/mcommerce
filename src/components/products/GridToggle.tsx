import Link from "next/link";
import { Button } from "../ui/button"
import { LucideLayoutGrid, LucideList } from "lucide-react";
import { Separator } from "../ui/separator";

function GridToggle({ totalProducts, layout, searchTerm, slug }: { totalProducts: number; layout: string; searchTerm: string; slug: string }) {
    return (
        <section>
            <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">
                    {totalProducts} product{totalProducts !== 1 ? 's' : ''} found
                </h3>
                <div className="flex gap-x-4">
                    <Button variant={layout === 'grid' ? 'default' : 'ghost'} size={"icon"} asChild>
                        <Link href={`${slug === "All Products" ? "/products" : `/products/category/${slug.toLowerCase()}`}?layout=grid${searchTerm ? `${searchTerm}` : ''}`}>
                            <LucideLayoutGrid size={16} />
                        </Link>
                    </Button>
                    <Button variant={layout === 'list' ? 'default' : 'ghost'} size={"icon"} asChild>
                        <Link href={`${slug === "All Products" ? "/products" : `/products/category/${slug.toLowerCase()}`}?layout=list${searchTerm ? `${searchTerm}` : ''}`}>
                            <LucideList size={16} />
                        </Link>
                    </Button>
                </div>
            </div>
            <Separator className="mt-2" />
        </section>
    )
}

export default GridToggle