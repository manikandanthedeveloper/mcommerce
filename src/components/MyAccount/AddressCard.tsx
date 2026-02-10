import { Trash2, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Address } from "@/types/Address";

interface AddressCardProps {
    address: Address;
    onEdit: (address: Address) => void;
    onDelete: (addressId: string) => void;
    isLoading?: boolean;
}

const AddressCard = ({ address, onEdit, onDelete, isLoading = false }: AddressCardProps) => {
    return (
        <div className="border rounded-lg p-4 flex flex-col gap-4">
            {address.isDefault && (
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded w-fit text-sm font-medium">
                    Default Address
                </div>
            )}

            <div className="space-y-2">
                <p className="font-semibold">{address.fullName}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{address.street}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{address.country}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Phone: {address.phone}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Email: {address.email}</p>
            </div>

            <div className="flex gap-2 pt-2">
                <Button
                    size="sm"
                    variant="outline"
                    className="rounded-none flex-1 flex items-center justify-center gap-2"
                    onClick={() => onEdit(address)}
                    disabled={isLoading}
                >
                    <Edit className="w-4 h-4" />
                    Edit
                </Button>
                <Button
                    size="sm"
                    variant="destructive"
                    className="rounded-none flex-1 flex items-center justify-center gap-2"
                    onClick={() => onDelete(address.id)}
                    disabled={isLoading}
                >
                    <Trash2 className="w-4 h-4" />
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default AddressCard;
