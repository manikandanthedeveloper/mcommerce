"use client";

import Container from "@/components/global/Container";
import SectionTitle from "@/components/global/SectionTitle";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { clearCart } from "@/store/slices/cartSlice";

const CheckoutSuccessContent = () => {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading",
    );
    const [message, setMessage] = useState("");

    const sessionId = searchParams.get("session_id");
    const orderId = searchParams.get("orderId");
    const cartId = searchParams.get("cartId");

    useEffect(() => {
        const verifyPayment = async () => {
            if (!sessionId || !orderId || !cartId) {
                setStatus("error");
                setMessage("Missing payment information");
                return;
            }

            try {
                const response = await axios.post("/api/checkout/verify", {
                    sessionId,
                    orderId,
                    cartId,
                });

                if (response.data.success) {
                    setStatus("success");
                    setMessage("Payment successful! Your order has been placed.");
                    // Clear the cart from Redux
                    dispatch(clearCart());
                } else {
                    setStatus("error");
                    setMessage("Payment verification failed");
                }
            } catch (error) {
                console.error("Verification error:", error);
                setStatus("error");
                setMessage("Failed to verify payment");
            }
        };

        verifyPayment();
    }, [sessionId, orderId, cartId, dispatch]);

    return (
        <Container className="my-8 min-h-screen">
            <SectionTitle title="Order Status" />

            <div className="mt-12 text-center">
                {status === "loading" && (
                    <>
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                        <p className="mt-4 text-lg">
                            Verifying your payment...
                        </p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                            <svg
                                className="h-12 w-12 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h2 className="mb-4 text-2xl font-bold text-green-600">
                            Order Confirmed!
                        </h2>
                        <p className="mb-8 text-lg text-gray-600">{message}</p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/myaccount/orders">
                                <Button className="rounded-none">
                                    View Orders
                                </Button>
                            </Link>
                            <Link href="/products">
                                <Button variant="outline" className="rounded-none">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                            <svg
                                className="h-12 w-12 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                        <h2 className="mb-4 text-2xl font-bold text-red-600">
                            Payment Failed
                        </h2>
                        <p className="mb-8 text-lg text-gray-600">{message}</p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/cart">
                                <Button className="rounded-none">
                                    Back to Cart
                                </Button>
                            </Link>
                            <Link href="/products">
                                <Button variant="outline" className="rounded-none">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </Container>
    );
};

function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading checkout...</div>}>
            <CheckoutSuccessContent />
        </Suspense>
    );
}

export default CheckoutSuccessPage;
