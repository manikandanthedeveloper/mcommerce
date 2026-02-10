"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";
import { PaymentMethod, PaymentMethodFormData } from "@/types/PaymentMethod";
import PaymentMethodCard from "@/components/MyAccount/PaymentMethodCard";
import PaymentMethodForm from "@/components/MyAccount/PaymentMethodForm";

function PaymentPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/user/payment-methods");
      if (!response.ok) throw new Error("Failed to fetch payment methods");
      const data = await response.json();
      setMethods(data);
    } catch (err) {
      setError("Failed to load payment methods");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingMethod(null);
    setShowForm(true);
  };

  const handleEdit = (method: PaymentMethod) => {
    setEditingMethod(method);
    setShowForm(true);
  };

  const handleDelete = async (methodId: string) => {
    if (!confirm("Are you sure you want to delete this payment method?")) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/payment-methods/${methodId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete payment method");
      setMethods(methods.filter((method) => method.id !== methodId));
    } catch (err) {
      setError("Failed to delete payment method");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: PaymentMethodFormData) => {
    try {
      setIsLoading(true);
      const url = editingMethod
        ? `/api/user/payment-methods/${editingMethod.id}`
        : "/api/user/payment-methods";
      const method = editingMethod ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save payment method");
      const saved = await response.json();

      if (editingMethod) {
        setMethods(
          methods.map((methodItem) =>
            methodItem.id === saved.id ? saved : methodItem,
          ),
        );
      } else {
        setMethods([saved, ...methods]);
      }

      setShowForm(false);
      setEditingMethod(null);
    } catch (err) {
      setError("Failed to save payment method");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Methods
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your saved payment methods
        </p>
      </div>

      <Card className="rounded-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Saved Cards
            </CardTitle>
            <Button
              size="sm"
              variant="default"
              className="rounded-none"
              onClick={handleAdd}
              disabled={isLoading}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded">
              {error}
            </div>
          )}

          {methods.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
                <CreditCard className="w-12 h-12 text-gray-400 dark:text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No saved cards
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
                Add a payment method for faster checkout
              </p>
              <Button
                variant="default"
                className="rounded-none"
                onClick={handleAdd}
                disabled={isLoading}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Add Your First Card
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
                {methods.map((methodItem) => (
                  <PaymentMethodCard
                    key={methodItem.id}
                    method={methodItem}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isLoading={isLoading}
                  />
                ))}
              </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <PaymentMethodForm
          method={editingMethod || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingMethod(null);
          }}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default PaymentPage;
