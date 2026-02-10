'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Upload, X } from 'lucide-react';

interface UploadPhotoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpload: (file: File) => Promise<void>;
    currentPhoto?: string;
}

export const UploadPhotoDialog = ({
    open,
    onOpenChange,
    onUpload,
    currentPhoto,
}: UploadPhotoDialogProps) => {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!fileInputRef.current?.files?.[0]) {
            alert('Please select a file');
            return;
        }

        setLoading(true);
        try {
            await onUpload(fileInputRef.current.files[0]);
            setPreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            onOpenChange(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Update Photo</DialogTitle>
                    <DialogDescription>
                        Choose a new photo for your profile. Maximum file size is 5MB.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex justify-center">
                        {preview ? (
                            <div className="relative">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-52 h-52 object-cover rounded-none border-2 border-gray-300"
                                />
                                <button
                                    onClick={() => setPreview(null)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : currentPhoto ? (
                            currentPhoto.startsWith('data:') ? (
                                <img
                                    src={currentPhoto}
                                    alt="Current"
                                    className="w-52 h-52 object-cover rounded-none border-2 border-gray-300"
                                />
                            ) : (
                                <img
                                    src={currentPhoto}
                                    alt="Current"
                                    className="w-52 h-52 object-cover rounded-none border-2 border-gray-300"
                                />
                            )
                        ) : (
                            <div className="w-52 h-52 bg-gray-200 dark:bg-gray-800 rounded-none border-2 border-dashed border-gray-300 flex items-center justify-center">
                                <Upload className="w-8 h-8 text-gray-400" />
                            </div>
                        )}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={loading}
                        className="w-full"
                    >
                        Choose Photo
                    </Button>
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
                        onClick={handleUpload}
                        disabled={loading || !preview}
                    >
                        {loading ? 'Uploading...' : 'Upload Photo'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
