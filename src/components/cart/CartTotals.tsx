'use client';

import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { createOrderAction } from '@/util/actions';
import { formatCurrency } from '@/util/format';
import FormContainer from '../form/FormContainer';
import SubmitButton from '@/components/form/SubmitButton';
import { useAppSelector } from '@/store/hooks';

function CartTotals() {
    const cartItems = useAppSelector((state) => state.cart.cartItems);

    // Calculate totals from Redux state
    const cartTotal = cartItems.reduce((sum: number, item) => {
        return sum + (Number(item.price) || 0) * item.amount;
    }, 0);

    const shipping = 0; // You can add shipping logic here
    const tax = Math.round(cartTotal * 0.1); // 10% tax
    const orderTotal = cartTotal + shipping + tax;

    return (
        <div>
            <Card className='p-8 rounded-none'>
                <CartTotalRow label='Subtotal' amount={cartTotal} />
                <CartTotalRow label='Shipping' amount={shipping} />
                <CartTotalRow label='Tax' amount={tax} />
                <CardTitle className='mt-8'>
                    <CartTotalRow label='Order Total' amount={orderTotal} lastRow />
                </CardTitle>
            </Card>
            <FormContainer action={createOrderAction}>
                <SubmitButton text='Place Order' className='w-full mt-8 rounded-none' />
            </FormContainer>
        </div>
    );
}

function CartTotalRow({
    label,
    amount,
    lastRow,
}: {
    label: string;
    amount: number;
    lastRow?: boolean;
}) {
    return (
        <>
            <p className='flex justify-between text-sm'>
                <span>{label}</span>
                <span>{formatCurrency(amount)}</span>
            </p>
            {lastRow ? null : <Separator className='my-2' />}
        </>
    );
}

export default CartTotals;