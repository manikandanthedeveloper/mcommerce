"use client"

import { searchProducts } from "@/util/actions";
import { useState, useCallback } from "react";
import { Product } from "@/types/Product";
import NavSearchDropdown from "./NavSearchDropdown";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

function NavSearch() {
    const [results, setResults] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [, setIsLoading] = useState(false);

    const handleSearch = useCallback(async (query: string) => {
        if (!query.trim()) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        setIsLoading(true);
        const products = await searchProducts(query);
        const productsWithCategory = products.map(p => ({
            ...p,
            categoryId: p.categoryId || ''
        }));
        setResults(productsWithCategory);
        setIsOpen(true);
        setIsLoading(false);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value);
    };

    return (
        <div className="relative w-full max-w-xs">
            <form className="rounded-none">
                <InputGroup className="rounded-none">
                    <InputGroupInput
                        placeholder="Search..."
                        className="dark:bg-muted rounded-none focus:ring-0"
                        type="search"
                        name="search"
                        onChange={handleInputChange}
                        onFocus={() => results.length > 0 && setIsOpen(true)}
                    />
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="secondary" type="submit" className="rounded-none">Search</InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </form>
            {isOpen && results.length > 0 && (
                <NavSearchDropdown results={results} setIsOpen={setIsOpen} />
            )}
        </div>
    );
}

export default NavSearch
