"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DeleteAccountModal = ({ isOpen, onClose }: DeleteAccountModalProps) => {
    const [confirmation, setConfirmation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (confirmation.trim() !== "DELETE") {
            setError("Please type DELETE to confirm.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch("/api/user/delete-account", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ confirmation }),
            });

            if (!response.ok) throw new Error("Failed to delete account");
            window.location.href = "/";
        } catch (err) {
            setError("Failed to delete account. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
                        Delete Account
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    This action permanently deletes your account and all associated data. This cannot
                    be undone.
                </p>

                <form onSubmit={handleDelete} className="space-y-4">
                    <label className="block text-sm font-medium">
                        Type DELETE to confirm
                    </label>
                    <input
                        type="text"
                        value={confirmation}
                        onChange={(e) => setConfirmation(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {error && (
                        <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
                    )}

                    <div className="flex gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="rounded-none flex-1"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-none flex-1 bg-red-600 hover:bg-red-700"
                            disabled={isLoading}
                        >
                            {isLoading ? "Deleting..." : "Delete Account"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
