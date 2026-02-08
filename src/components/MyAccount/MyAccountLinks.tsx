"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils'
import { myAccountLinks } from '@/util/myaccountlinks';
import { usePathname } from 'next/navigation';

const MyAccountLinks = () => {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;

    return (
        <nav className="space-y-1">
            {myAccountLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                    <Link key={item.href} href={item.href}>
                        <div
                            className={cn(
                                'flex items-start gap-3 px-4 py-3 rounded-none transition-all duration-200 cursor-pointer group',
                                active
                                    ? 'bg-blue-100 dark:bg-blue-950/50 border border-blue-300 dark:border-blue-700'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
                            )}
                        >
                            <Icon className={cn(
                                'w-5 h-5 shrink-0 mt-0.5 transition-colors',
                                active
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300'
                            )} />
                            <div className="flex-1 min-w-0">
                                <p className={cn(
                                    'font-medium text-sm transition-colors',
                                    active
                                        ? 'text-blue-900 dark:text-blue-200'
                                        : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                                )}>
                                    {item.label}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-1">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </nav>
    )
}

export default MyAccountLinks