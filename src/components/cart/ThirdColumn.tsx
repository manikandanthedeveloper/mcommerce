'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useAppDispatch } from '@/store/hooks';
import { updateCartItemAmount, removeFromCart } from '@/store/slices/cartSlice';
import QuantityModifier from '../products/QuantityModifier';


function ThirdColumn({ id, price, amount, productName, productImage, productId, slug }: { id: string; price: string; amount: number; productName: string; productImage: string; productId: string; slug?: string; }) {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleAmountChange = async (value: number) => {
        setIsLoading(true);
        toast.info("Updating...");
        try {
            if (value === 0) {
                dispatch(removeFromCart(id));
                toast.success("Item removed from cart");
            } else {
                dispatch(updateCartItemAmount({ id, amount: value }));
                toast.success("Cart updated!");
            }
        } catch (error) {
            console.error("Failed to update cart:", error);
            toast.error("Failed to update cart");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='md:ml-8'>
            <QuantityModifier
                productId={productId}
                productName={productName}
                productImage={productImage}
                productPrice={price}
                productSlug={slug}
                amount={amount}
                setAmount={handleAmountChange} 
                isLoading={isLoading}
            />
        </div>
    );
}
export default ThirdColumn;