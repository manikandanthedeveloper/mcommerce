"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { UserPreferences } from "@/types/UserPreferences";

interface EmailNotificationsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EmailNotificationsModal = ({ isOpen, onClose }: EmailNotificationsModalProps) => {
    const [preferences, setPreferences] = useState<UserPreferences | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (isOpen) {
            fetchPreferences();
        }
    }, [isOpen]);

    const fetchPreferences = async () => {
        try {
            const response = await fetch("/api/user/preferences");
            if (!response.ok) throw new Error("Failed to fetch preferences");
            const data = await response.json();
            setPreferences(data);
        } catch (err) {
            setError("Failed to load preferences");
            console.error(err);
        }
    };

    const handleToggle = (key: keyof UserPreferences) => {
        if (preferences) {
            setPreferences({
                ...preferences,
                [key]: !preferences[key],
            });
        }
    };

    const handleSave = async () => {
        if (!preferences) return;

        try {
            setIsLoading(true);
            setError("");
            setSuccess("");

            const response = await fetch("/api/user/preferences", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    emailNotificationsOrders: preferences.emailNotificationsOrders,
                    emailNotificationsNewsletter: preferences.emailNotificationsNewsletter,
                    emailNotificationsPromotions: preferences.emailNotificationsPromotions,
                    privacyShowProfile: preferences.privacyShowProfile,
                    privacyAllowMessages: preferences.privacyAllowMessages,
                    privacyDataCollection: preferences.privacyDataCollection,
                }),
            });

            if (!response.ok) throw new Error("Failed to update preferences");
            setSuccess("Email preferences updated successfully");
            setTimeout(onClose, 1500);
        } catch (err) {
            setError("Failed to save preferences");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen || !preferences) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Email Notifications</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded text-sm">
                        {success}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded">
                        <div>
                            <p className="font-medium text-sm">Order Updates</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Receive updates about your orders</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={preferences.emailNotificationsOrders}
                            onChange={() => handleToggle('emailNotificationsOrders')}
                            disabled={isLoading}
                            className="w-4 h-4"
                        />
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded">
                        <div>
                            <p className="font-medium text-sm">Newsletter</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Receive our weekly newsletter</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={preferences.emailNotificationsNewsletter}
                            onChange={() => handleToggle('emailNotificationsNewsletter')}
                            disabled={isLoading}
                            className="w-4 h-4"
                        />
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded">
                        <div>
                            <p className="font-medium text-sm">Promotions & Offers</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Get notified about special offers</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={preferences.emailNotificationsPromotions}
                            onChange={() => handleToggle('emailNotificationsPromotions')}
                            disabled={isLoading}
                            className="w-4 h-4"
                        />
                    </div>
                </div>

                <div className="flex gap-2 pt-6">
                    <Button
                        variant="outline"
                        className="rounded-none flex-1"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="rounded-none flex-1"
                        onClick={handleSave}
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EmailNotificationsModal;
