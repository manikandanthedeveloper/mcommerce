import { Product } from '@/types/Product';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function NavSearchDropdown({ results, setIsOpen }: { results: Product[]; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-lg z-50 mt-1">
            {results.map((product) => (
                <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={() => setIsOpen(false)}
                >
                    <div className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-slate-800 border-b border-gray-200 dark:border-slate-700 last:border-b-0 cursor-pointer">
                        {product.image && (
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="rounded object-cover"
                            />
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{product.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">${(product.price / 100).toFixed(2)}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default NavSearchDropdown