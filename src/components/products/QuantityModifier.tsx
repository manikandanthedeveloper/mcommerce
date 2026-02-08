"use client"

import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa"
import { Button } from "../ui/button"
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import ProductSignInButton from "../form/ProductSignInButton";
import { addToCartAction } from "@/util/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

function QuantityModifier({ productId }: { productId: string }) {
    const [amount, setAmount] = useState(0);
    const { userId } = useAuth();
    const [state, formAction] = useActionState(addToCartAction, { message: '' });

    useEffect(() => {
        if (state && state.message) {
            toast.success(state.message);
        }
    }, [state]);

    const handleAmountChange = (newAmount: number) => {
        if (newAmount < 0) return;
        setAmount(newAmount);

        // Create and submit form with the new amount
        if (newAmount > 0) {
            const formData = new FormData();
            formData.append('productId', productId);
            formData.append('amount', newAmount.toString());
            formAction(formData);
        }
    };

    return (
        <>
            {userId ? (
                <div>
                    {amount ? (
                        <div className="flex items-center">
                            <Button type="button" variant="default" size="sm" className="rounded-none mr-2 cursor-pointer" onClick={() => handleAmountChange(amount - 1)}><FaMinus /></Button>
                            <span className="mx-2">{amount}</span>
                            <Button type="button" variant="default" size="sm" className="rounded-none ml-2 cursor-pointer" onClick={() => handleAmountChange(amount + 1)}><FaPlus /></Button>
                        </div>
                    ) : (
                        <Button type="button" variant="default" size="sm" className="rounded-none cursor-pointer" onClick={() => handleAmountChange(1)}><FaCartPlus /></Button>
                    )}
                </div>
            ) : (<ProductSignInButton />)}

        </>
    )
}

export default QuantityModifier