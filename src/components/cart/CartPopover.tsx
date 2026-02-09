'use client'

import { BsMinecartLoaded } from "react-icons/bs"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Separator } from "../ui/separator"
import Link from "next/link"
import Image from "next/image"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { removeFromCart, updateCartItemAmount } from "@/store/slices/cartSlice"
import { toast } from "sonner"
import { formatCurrency } from "@/util/format"
import QuantityModifier from "@/components/products/QuantityModifier"
import { CiTrash } from "react-icons/ci"

const CartPopover = () => {
    const cartItems = useAppSelector((state) => state.cart.cartItems)
    const dispatch = useAppDispatch()

    const handleAmountChange = (itemId: string | undefined, value: number) => {
        if (!itemId) return;

        if (value === 0) {
            dispatch(removeFromCart(itemId))
            toast.success("Item removed from cart")
            return;
        }

        dispatch(updateCartItemAmount({ id: itemId, amount: value }))
        toast.success("Cart updated!")
    }

    const removeItem = (itemId: string | undefined) => {
        if (!itemId) return;
        try {
            dispatch(removeFromCart(itemId))
            toast.success("Item removed from cart")
        } catch (error) {
            console.error("Failed to remove item:", error)
            toast.error("Failed to remove item")
        }
    }

    const cartItemsCount = cartItems.length
    const cartTotal = cartItems.reduce((sum: number, item) => {
        return sum + (Number(item.price) || 0) * item.amount
    }, 0)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    size='icon'
                    className='rounded-none cursor-pointer relative'
                >
                    <BsMinecartLoaded size={24} />
                    {cartItemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {cartItemsCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 rounded-none p-0" align="end">
                <div className="bg-white">
                    <div className="p-4 bg-gray-50 border-b">
                        <h3 className="font-semibold text-lg">Shopping Cart</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        {cartItems.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="divide-y">
                                    {cartItems.map((item) => (
                                        <div key={item.id ?? item.productId} className="p-4 hover:bg-gray-50 transition">
                                            <div className="flex justify-items-start gap-3">
                                            <div className="w-16 h-16 bg-gray-100 rounded shrink-0">
                                                    {item.image && (
                                                        <Image
                                                            src={item.image}
                                                            alt={item.title || 'Product'}
                                                            width={64}
                                                            height={64}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                            </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium truncate capitalize">{item.title || 'Product'}</p>
                                                    <div className="mt-2">
                                                        <QuantityModifier
                                                            productId={item.productId}
                                                            productName={item.title}
                                                            productImage={item.image}
                                                            productPrice={item.price}
                                                            amount={item.amount}
                                                            setAmount={(value) => handleAmountChange(item.id, value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="min-w-0 ml-auto justify-between flex flex-col items-end">
                                                    <p className="text-sm font-semibold mt-1">{formatCurrency((Number(item.price) || 0) * item.amount)}</p>
                                                    <CiTrash className='cursor-pointer' onClick={() => removeItem(item.id)} color='red' />
                                                </div>
                                            </div>
                                        </div>))
                                    }
                            </div>
                        )}
                    </div>
                    {cartItems.length > 0 && (
                        <>
                            <Separator />
                            <div className="p-4 bg-gray-50 space-y-3">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="font-medium">{formatCurrency(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2 mt-2">
                                        <span className="font-semibold">Total:</span>
                                        <span className="font-bold text-lg">{formatCurrency(cartTotal)}</span>
                                    </div>
                                </div>
                                <Link href="/cart" className="block">
                                    <Button className="w-full rounded-none bg-black hover:bg-gray-800 text-white cursor-pointer">
                                        View Cart
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default CartPopover