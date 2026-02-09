import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Package, Calendar, CreditCard, Mail, ArrowLeft, CheckCircle2, Truck } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/util/format";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

async function OrderDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
        notFound();
    }

    const order = await prisma.order.findUnique({
        where: {
            id,
            clerkId: userId,
        },
    });

    if (!order) {
        notFound();
    }

    const subtotal = order.orderTotal - order.tax - order.shipping;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/myaccount/orders">
                    <Button variant="outline" size="sm" className="rounded-none cursor-pointer">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Orders
                    </Button>
                </Link>
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Order #{order.id.slice(0, 8)}
                    </h1>
                    <Badge variant={order.isPaid ? "default" : "destructive"} className="rounded-none">
                        {order.isPaid ? "Paid" : "Unpaid"}
                    </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    Order placed on {formatDate(order.createdAt)}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="w-5 h-5" />
                            Order Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4">
                            <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Order Date</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {formatDate(order.createdAt)}
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-start gap-4">
                            <CreditCard className="w-5 h-5 text-gray-500 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Payment Status</p>
                                <div className="flex items-center gap-2 mt-1">
                                    {order.isPaid ? (
                                        <>
                                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                                            <span className="text-sm text-green-600 dark:text-green-400">Paid</span>
                                        </>
                                    ) : (
                                        <span className="text-sm text-red-600 dark:text-red-400">Unpaid</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-start gap-4">
                            <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{order.email}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-start gap-4">
                            <Truck className="w-5 h-5 text-gray-500 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Number of Items</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {order.products} {order.products === 1 ? "item" : "items"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5" />
                            Order Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {formatCurrency(subtotal)}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {formatCurrency(order.shipping)}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {formatCurrency(order.tax)}
                                </span>
                            </div>

                            <Separator />

                            <div className="flex justify-between text-lg font-bold">
                                <span className="text-gray-900 dark:text-white">Total</span>
                                <span className="text-gray-900 dark:text-white">
                                    {formatCurrency(order.orderTotal)}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-none bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                <CardContent className="pt-6">
                    <div className="flex gap-3">
                        <Package className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                                Order Items
                            </p>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                Detailed order items tracking is currently being implemented. This order contains {order.products} {order.products === 1 ? "item" : "items"}.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default OrderDetailsPage;
