import { CreditCard, Trash2, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { PaymentMethod } from "@/types/PaymentMethod";

interface PaymentMethodCardProps {
    method: PaymentMethod;
    onEdit: (method: PaymentMethod) => void;
    onDelete: (methodId: string) => void;
    isLoading?: boolean;
}

const PaymentMethodCard = ({
    method,
    onEdit,
    onDelete,
    isLoading = false,
}: PaymentMethodCardProps) => {
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-none p-4 flex items-center justify-between hover:shadow-md transition">
            <div className="flex items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-950/30 rounded p-2">
                    <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                        {method.brand} ending in {method.last4}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Expires {method.expMonth.toString().padStart(2, "0")}/{method.expYear}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {method.holderName}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {method.isDefault && (
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 rounded">
                        Default
                    </span>
                )}
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-none"
                    onClick={() => onEdit(method)}
                    disabled={isLoading}
                >
                    <Edit className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-none text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                    onClick={() => onDelete(method.id)}
                    disabled={isLoading}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default PaymentMethodCard;
