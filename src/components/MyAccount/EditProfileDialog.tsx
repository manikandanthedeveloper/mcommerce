'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';

interface EditProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: { firstName: string; lastName: string; phoneNumber: string }) => Promise<void>;
    initialData: {
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
    };
}

export const EditProfileDialog = ({
    open,
    onOpenChange,
    onSave,
    initialData,
}: EditProfileDialogProps) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        phoneNumber: initialData.phoneNumber || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await onSave(formData);
            onOpenChange(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Update your profile information
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label htmlFor="firstName" className="text-sm font-semibold">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
                            placeholder="Enter first name"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="lastName" className="text-sm font-semibold">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
                            placeholder="Enter last name"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="phoneNumber" className="text-sm font-semibold">
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
                            placeholder="Enter phone number"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
