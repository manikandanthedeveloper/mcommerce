'use client';

import { useState } from 'react';
import SelectProductAmount from '@/components/products/single/SelectProductAmount';
import { Mode } from '@/components/products/single/SelectProductAmount';
import FormContainer from '@/components/form/FormContainer';
import SubmitButton from '@/components/form/SubmitButton';
import { removeCartItemAction, updateCartItemAction } from '@/util/actions';
import { toast } from 'sonner';


function ThirdColumn({ quantity, id }: { quantity: number; id: string }) {
    const [amount, setAmount] = useState(quantity);
    const [isLoading, setIsLoading] = useState(false);

    const handleAmountChange = async (value: number) => {
        setIsLoading(true);
        toast.success("Updating...");
        const result = await updateCartItemAction({
            amount: value,
            cartItemId: id,
        });
        setAmount(value);
        toast.success(result.message);
        setIsLoading(false);
    };

    return (
        <div className='md:ml-8'>
            <SelectProductAmount
                amount={amount}
                setAmount={handleAmountChange}
                mode={Mode.CartItem}
                isLoading={isLoading}
            />
            <FormContainer action={removeCartItemAction}>
                <input type='hidden' name='id' value={id} />
                <SubmitButton size='sm' className='mt-4' text='remove' />
            </FormContainer>
        </div>
    );
}
export default ThirdColumn;