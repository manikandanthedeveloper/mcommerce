import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Package, Eye } from "lucide-react";
import { fetchUserOrders } from "@/util/actions";
import { formatCurrency, formatDate } from "@/util/format";
import Link from "next/link";

async function OrdersPage() {
  const orders = await fetchUserOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Orders</h1>
        <p className="text-gray-600 dark:text-gray-400">View and manage your order history</p>
      </div>
      {orders.length <= 0 ? (
        <Card className="rounded-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
                <Package className="w-12 h-12 text-gray-400 dark:text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No orders yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">You haven&apos;t placed any orders yet. Start shopping to see your orders here</p>
              <Button variant="default" className="rounded-none">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-none">
          <CardContent className="pt-6">
            <div className="space-y-4">
                {orders.map((order) => {
                  const { id, orderTotal, createdAt } = order;

                  return (
                    <div key={id} className="border border-gray-200 dark:border-gray-700 rounded-none p-4 hover:shadow-md transition">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">Order #{id}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(createdAt)}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-300 text-xs rounded-none font-medium">Delivered</span>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-semibold text-gray-900 dark:text-white">{formatCurrency(orderTotal)}</p>
                          <Link href={`/myaccount/orders/${id}`} className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 text-xs rounded-none font-medium">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
      )}
    </div>
  );
}

export default OrdersPage;
