"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { PaymentMethod, PaymentMethodFormData } from "@/types/PaymentMethod";

interface PaymentMethodFormProps {
    method?: PaymentMethod;
    onSubmit: (data: PaymentMethodFormData) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

const PaymentMethodForm = ({
    method,
    onSubmit,
    onCancel,
    isLoading = false,
}: PaymentMethodFormProps) => {
    const [formData, setFormData] = useState<PaymentMethodFormData>({
        brand: method?.brand || "",
        last4: method?.last4 || "",
        expMonth: method?.expMonth || 1,
        expYear: method?.expYear || new Date().getFullYear(),
        holderName: method?.holderName || "",
        isDefault: method?.isDefault || false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.brand.trim()) newErrors.brand = "Card brand is required";
        if (!formData.last4.trim() || formData.last4.length !== 4)
            newErrors.last4 = "Enter last 4 digits";
        if (formData.expMonth < 1 || formData.expMonth > 12)
            newErrors.expMonth = "Enter a valid month";
        if (!formData.expYear || formData.expYear < new Date().getFullYear())
            newErrors.expYear = "Enter a valid year";
        if (!formData.holderName.trim())
            newErrors.holderName = "Card holder name is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        await onSubmit({
            ...formData,
            last4: formData.last4.replace(/\D/g, "").slice(0, 4),
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.currentTarget;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : name === "expMonth" || name === "expYear"
                        ? Number(value)
                        : value,
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">
                        {method ? "Edit Card" : "Add New Card"}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Card Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        {errors.brand && (
                            <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Last 4 Digits</label>
                        <input
                            type="text"
                            name="last4"
                            value={formData.last4}
                            onChange={handleChange}
                            disabled={isLoading}
                            maxLength={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        {errors.last4 && (
                            <p className="text-red-500 text-sm mt-1">{errors.last4}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Exp Month</label>
                            <input
                                type="number"
                                name="expMonth"
                                value={formData.expMonth}
                                onChange={handleChange}
                                disabled={isLoading}
                                min={1}
                                max={12}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            {errors.expMonth && (
                                <p className="text-red-500 text-sm mt-1">{errors.expMonth}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Exp Year</label>
                            <input
                                type="number"
                                name="expYear"
                                value={formData.expYear}
                                onChange={handleChange}
                                disabled={isLoading}
                                min={new Date().getFullYear()}
                                max={new Date().getFullYear() + 20}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            {errors.expYear && (
                                <p className="text-red-500 text-sm mt-1">{errors.expYear}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Card Holder Name</label>
                        <input
                            type="text"
                            name="holderName"
                            value={formData.holderName}
                            onChange={handleChange}
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        {errors.holderName && (
                            <p className="text-red-500 text-sm mt-1">{errors.holderName}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isDefault"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleChange}
                            disabled={isLoading}
                            className="w-4 h-4"
                        />
                        <label htmlFor="isDefault" className="text-sm">
                            Set as default payment method
                        </label>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="rounded-none flex-1"
                            onClick={onCancel}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-none flex-1"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save Card"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentMethodForm;
