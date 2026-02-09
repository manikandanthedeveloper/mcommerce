import Image from 'next/image';
import Link from 'next/link';
import { CiTrash } from "react-icons/ci";
import { formatCurrency } from '@/util/format';

export const FirstColumn = ({
    name,
    image,
    productId,
    slug,
}: {
    image: string;
    name: string;
        productId: string;
        slug?: string;
}) => {
    const href = slug ? `/products/${slug}` : `/products/${productId}`;
    return (
        <Link href={href}>
            <div className='relative h-24 w-24 sm:h-32 sm:w-32 cursor-pointer hover:opacity-80 transition-opacity'>
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
                    priority
                    className='w-full rounded-none object-cover'
                />
            </div>
        </Link>
    );
};

export const SecondColumn = ({
    name,
    productId,
    slug,
}: {
    name: string;
    productId: string;
        slug?: string;
}) => {
    const href = slug ? `/products/${slug}` : `/products/${productId}`;
    return (
        <div className='sm:w-48'>
            <Link href={href}>
                <h3 className='capitalize font-medium hover:underline'>{name}</h3>
            </Link>
        </div>
    );
};

export const FourthColumn = ({ price, amount, removeItem }: { price: number; amount: number; removeItem: () => void }) => {
    const lineTotal = price * amount;
    return <div className='flex flex-col items-end justify-between gap-4'>
        <p className='font-medium md:ml-auto'>{formatCurrency(lineTotal)}</p>
        <CiTrash className='cursor-pointer' onClick={removeItem} color='red' />
    </div>;
};