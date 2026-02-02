import MenuLink from "@/types/CategoryList";
import { NavigationMenuLink } from "../../ui/navigation-menu";
import { Link } from "@radix-ui/react-navigation-menu";
import { ComponentPropsWithoutRef } from "react";

function LinkDropdown({
    name,
    slug,
    children,
    ...props
}: ComponentPropsWithoutRef<"li"> & MenuLink) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={name === "All Products" ? `/products` : `/products/category/${slug}`} className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="leading-none font-medium">{name}</div>
                        <div className="text-muted-foreground line-clamp-2">{children}</div>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

export default LinkDropdown;