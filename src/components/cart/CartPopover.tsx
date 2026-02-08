'use client'

import { BsMinecartLoaded } from "react-icons/bs"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Separator } from "../ui/separator"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { fetchOrCreateCart } from "@/util/actions"
import { useAuth } from "@clerk/nextjs"
import { X } from 'lucide-react'
import { Cart } from "@/types/Cart"
// import CartLink from "../header/sidemenu/CartLink"

const CartPopover = () => {
    const [cart, setCart] = useState<Cart | null>(null)
    const [loading, setLoading] = useState(false)
    const { userId } = useAuth()

    useEffect(() => {
        const loadCart = async () => {
            if (!userId) return
            try {
                setLoading(true)
                const cartData = await fetchOrCreateCart({ userId })
                setCart(cartData as unknown as Cart)
            } catch (error) {
                console.error('Failed to load cart:', error)
            } finally {
                setLoading(false)
            }
        }

        loadCart()
    }, [userId])

    const cartItemsCount = cart?.numItemsInCart || 0

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
                    {/* Header */}
                    <div className="p-4 bg-gray-50 border-b">
                        <h3 className="font-semibold text-lg">Shopping Cart</h3>
                    </div>

                    {/* Cart Items */}
                    <div className="max-h-80 overflow-y-auto">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">
                                Loading...
                            </div>
                        ) : !cart || cart.cartItems.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="divide-y">
                                {cart.cartItems.map((item) => (
                                    <div key={item.id} className="p-4 hover:bg-gray-50 transition">
                                        <div className="flex gap-3">
                                            {/* Product Image */}
                                            <div className="w-16 h-16 bg-gray-100 rounded shrink-0">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    width={64}
                                                    height={64}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {/* Qty: {item.quantity} */}
                                                </p>
                                                <p className="text-sm font-semibold mt-1">
                                                    {/* ${(item.product.price * item.quantity / 100).toFixed(2)} */}
                                                </p>
                                            </div>

                                            {/* Remove Button */}
                                            <button className="text-gray-400 hover:text-red-500 transition">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer - Summary & Actions */}
                    {cart && cart.cartItems.length > 0 && (
                        <>
                            <Separator />
                            <div className="p-4 bg-gray-50 space-y-3">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="font-medium">${(cart.cartTotal / 100).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax:</span>
                                        <span className="font-medium">${(cart.tax / 100).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2 mt-2">
                                        <span className="font-semibold">Total:</span>
                                        <span className="font-bold text-lg">${(cart.orderTotal / 100).toFixed(2)}</span>
                                    </div>
                                </div>
                                <Link href="/cart" className="block">
                                    <Button className="w-full rounded-none bg-black hover:bg-gray-800">
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