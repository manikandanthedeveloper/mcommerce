import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import LinkDropdown from "./LinkDropdown"
import { fetchAllCategories } from "@/util/actions"
import { Category } from "@/generated/browser";

export async function Navbar() {
    const categories: Category[] = await fetchAllCategories();

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/about">About</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <div className="flex items-center">
                        <NavigationMenuTrigger>
                            <NavigationMenuLink
                                asChild
                            >
                                <Link href="/products">Shop</Link>
                            </NavigationMenuLink>
                        </NavigationMenuTrigger>
                    </div>
                    <NavigationMenuContent>
                        <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                            {categories.map((category) => (
                                <LinkDropdown
                                    key={category.name}
                                    slug={category.slug}
                                    name={category.name}
                                >
                                    {category.description}
                                </LinkDropdown>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
