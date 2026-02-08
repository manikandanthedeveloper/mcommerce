'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Trash2 } from "lucide-react";

function PaymentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payment Methods</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your saved payment methods</p>
      </div>

      <Card className="rounded-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Saved Cards
            </CardTitle>
            <Button size="sm" variant="default" className="rounded-none">
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
              <CreditCard className="w-12 h-12 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No saved cards</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">Add a payment method for faster checkout</p>
            <Button variant="default" className="rounded-none">
              <CreditCard className="w-4 h-4 mr-2" />
              Add Your First Card
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Example Card List (uncomment when data is available) */}
      <Card className="rounded-none">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-none p-4 flex items-center justify-between hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-950/30 rounded p-2">
                  <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Visa ending in 4242</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Expires 12/25</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="rounded-none text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentPage;
