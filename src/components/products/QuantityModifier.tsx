"use client"

import { FaCartPlus, FaMinus, FaPlus, FaTrash } from "react-icons/fa"
import { Button } from "../ui/button"
import { useAuth } from "@clerk/nextjs";
import ProductSignInButton from "../form/ProductSignInButton";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, removeFromCart, updateCartItemAmount } from "@/store/slices/cartSlice";

function QuantityModifier({
    productId,
    productName,
    productImage,
    productPrice,
    amount,
    setAmount,
    isLoading,
}: {
    productId: string
    productName: string
    productImage: string
    productPrice: string
    amount?: number
    setAmount?: (value: number) => void | Promise<void>
    isLoading?: boolean
}) {
    const { userId } = useAuth();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.cartItems);

    // Use prop amount if provided (cart page), otherwise get from Redux (products page)
    const currentAmount = amount !== undefined ? amount : (cartItems.find((item) => item.productId === productId)?.amount || 0);
    const cartItem = cartItems.find((item) => item.productId === productId);
    const isLoadingState = isLoading || false;

    const handleAmountChange = async (newAmount: number) => {
        if (newAmount < 0) return;

        try {
            // If setAmount callback is provided, use it (cart page context)
            if (setAmount) {
                await setAmount(newAmount);
                return;
            }

            // Otherwise, manage Redux directly (products page context)
            if (newAmount === 0) {
                if (cartItem?.id) {
                    dispatch(removeFromCart(cartItem.id));
                }
                return;
            }

            if (cartItem?.id) {
                dispatch(updateCartItemAmount({ id: cartItem.id, amount: newAmount }));
                toast.success("Cart updated!");
                return;
            }

            dispatch(addToCart({
                productId,
                title: productName,
                image: productImage,
                price: productPrice,
                amount: newAmount,
            }));
            toast.success("Added to cart!");
        } catch (error) {
            console.error("Failed to update cart:", error);
            toast.error("Failed to update cart");
        }
    };

    const handleRemove = () => {
        handleAmountChange(0);
    };

    return (
        <>
            {userId ? (
                <div className="flex items-center gap-2">
                    {currentAmount ? (
                        <div className="flex items-center">
                            <Button
                                type="button"
                                variant="default"
                                size="sm"
                                className="rounded-none mr-2 cursor-pointer disabled:opacity-50"
                                onClick={() => handleAmountChange(currentAmount - 1)}
                                disabled={isLoadingState}
                            >
                                <FaMinus />
                            </Button>
                            <span className="mx-2 w-4 text-center">{currentAmount}</span>
                            <Button
                                type="button"
                                variant="default"
                                size="sm"
                                className="rounded-none ml-2 cursor-pointer disabled:opacity-50"
                                onClick={() => handleAmountChange(currentAmount + 1)}
                                disabled={isLoadingState}
                            >
                                <FaPlus />
                            </Button>
                        </div>
                    ) : (
                            <Button
                                type="button"
                                variant="default"
                                size="sm"
                                className="rounded-none cursor-pointer disabled:opacity-50"
                                onClick={() => handleAmountChange(1)}
                                disabled={isLoadingState}
                            >
                                <FaCartPlus />
                            </Button>
                    )}
                </div>
            ) : (<ProductSignInButton />)}
        </>
    )
}

export default QuantityModifier