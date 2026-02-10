"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import { Address } from "@/types/Address";

const AddressSection = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch addresses on mount
    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/user/addresses");
            if (!response.ok) throw new Error("Failed to fetch addresses");
            const data = await response.json();
            setAddresses(data);
        } catch (err) {
            setError("Failed to load addresses");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddAddress = () => {
        setEditingAddress(null);
        setShowForm(true);
    };

    const handleEditAddress = (address: Address) => {
        setEditingAddress(address);
        setShowForm(true);
    };

    const handleDeleteAddress = async (addressId: string) => {
        if (!confirm("Are you sure you want to delete this address?")) return;

        try {
            setIsLoading(true);
            const response = await fetch(`/api/user/addresses/${addressId}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete address");
            setAddresses(addresses.filter((a) => a.id !== addressId));
        } catch (err) {
            setError("Failed to delete address");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitAddress = async (formData: {
        fullName: string;
        phone: string;
        email: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        isDefault: boolean;
    }) => {
        try {
            setIsLoading(true);
            const url = editingAddress
                ? `/api/user/addresses/${editingAddress.id}`
                : "/api/user/addresses";
            const method = editingAddress ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to save address");
            const savedAddress = await response.json();

            if (editingAddress) {
                setAddresses(
                    addresses.map((a) => (a.id === savedAddress.id ? savedAddress : a))
                );
            } else {
                setAddresses([savedAddress, ...addresses]);
            }

            setShowForm(false);
            setEditingAddress(null);
        } catch (err) {
            setError("Failed to save address");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Card className="rounded-none">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Saved Addresses
                        </CardTitle>
                        <Button
                            size="sm"
                            variant="outline"
                            className="rounded-none"
                            onClick={handleAddAddress}
                            disabled={isLoading}
                        >
                            + Add Address
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded">
                            {error}
                        </div>
                    )}

                    {addresses.length === 0 ? (
                        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                            <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>No saved addresses yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {addresses.map((address) => (
                                <AddressCard
                                    key={address.id}
                                    address={address}
                                    onEdit={handleEditAddress}
                                    onDelete={handleDeleteAddress}
                                    isLoading={isLoading}
                                />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {showForm && (
                <AddressForm
                    address={editingAddress || undefined}
                    onSubmit={handleSubmitAddress}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingAddress(null);
                    }}
                    isLoading={isLoading}
                />
            )}
        </>
    );
};

export default AddressSection;