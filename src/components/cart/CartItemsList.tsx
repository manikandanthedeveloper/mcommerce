'use client';

import { Card } from '@/components/ui/card';
import { FirstColumn, SecondColumn, FourthColumn } from '@/components/cart/CartItemColumns';
import ThirdColumn from '@/components/cart/ThirdColumn';
import { CartItemWithProduct } from '@/types/CartItemWithProduct';

function CartItemsList({ cartItems }: { cartItems: CartItemWithProduct[] }) {
    return (
        <div>
            {cartItems.map((cartItem) => {
                const { id, amount } = cartItem;
                const { image, name, price, id: productId } = cartItem.product;

                return (
                    <Card
                        key={id}
                        className='flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4'
                    >
                        <FirstColumn image={image} name={name} />
                        <SecondColumn name={name} productId={productId} />
                        <ThirdColumn id={id} quantity={amount} />
                        <FourthColumn price={price} />
                    </Card>
                );
            })}
        </div>
    );
}
export default CartItemsList;