'use client';

import { Card } from '@/components/ui/card';
import { FirstColumn, SecondColumn, FourthColumn } from '@/components/cart/CartItemColumns';
import ThirdColumn from '@/components/cart/ThirdColumn';
import { CartItem } from '@/types/CartItemWithProduct';
import { useAppDispatch } from '@/store/hooks';
import { removeFromCart } from '@/store/slices/cartSlice';
import { toast } from 'sonner';

function CartItemsList({ cartItems }: { cartItems: CartItem[] }) {
    const dispatch = useAppDispatch();

    const handleRemoveItem = (id: string) => {
        try {
            dispatch(removeFromCart(id));
            toast.success("Item removed from cart");
        } catch (error) {
            console.error("Failed to remove item:", error);
            toast.error("Failed to remove item");
        }
    }
    return (
        <div>
            {cartItems.map((cartItem) => {
                const { id, amount, image, title, price, productId, slug } = cartItem;

                return (
                    <Card
                        key={id}
                        className='flex justify-between gap-2 md:flex-row flex-wrap p-6 mb-8 rounded-none'
                    >
                        <FirstColumn image={image} name={title} productId={productId} slug={slug} />
                        <SecondColumn name={title} productId={productId} slug={slug} />
                        <ThirdColumn id={id!} amount={amount} productName={title} productImage={image} price={price} productId={productId} slug={slug} />
                        <FourthColumn price={Number(price)} amount={amount} removeItem={() => handleRemoveItem(id!)} />
                    </Card>
                );
            })}
        </div>
    );
}
export default CartItemsList;