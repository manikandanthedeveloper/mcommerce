'use client';

import { useUser } from "@clerk/nextjs";
import { Mail, Phone, Edit2, User } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { EditProfileDialog } from "./EditProfileDialog";
import { UploadPhotoDialog } from "./UploadPhotoDialog";
import { toast } from "sonner";

interface UserProfile {
    id?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    photoUrl?: string;
}

const ProfileInformation = () => {
    const { user, isLoaded } = useUser();
    const [userProfile, setUserProfile] = useState<UserProfile>({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch("/api/user/profile");
                if (response.ok) {
                    const data = await response.json();
                    setUserProfile(data);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        if (isLoaded && user) {
            fetchUserProfile();
        }
    }, [isLoaded, user]);

    const handleSaveProfile = async (data: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
    }) => {
        try {
            const response = await fetch("/api/user/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setUserProfile(updatedData);
                toast.success("Profile saved successfully!");
            } else {
                const errorData = await response.json();
                toast.error(`Save failed: ${errorData.error || 'Unknown error'}`);
                console.error("Save error:", errorData);
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error("Failed to save profile. Please try again.");
        }
    };

    const handlePhotoUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/user/photo", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const updatedData = await response.json();
                setUserProfile(updatedData);
                toast.success("Photo uploaded successfully!");
            } else {
                const errorData = await response.json();
                toast.error(`Upload failed: ${errorData.error || 'Unknown error'}`);
                console.error("Upload error:", errorData);
            }
        } catch (error) {
            console.error("Error uploading photo:", error);
            toast.error("Failed to upload photo. Please try again.");
        }
    };

    if (!isLoaded) {
        return <Card className="rounded-none"><CardContent className="pt-6">Loading...</CardContent></Card>;
    }

    if (!user) {
        return <Card className="rounded-none"><CardContent className="pt-6">No user data available</CardContent></Card>;
    }

    return (
        <>
            <Card className="rounded-none">
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                </CardTitle>
                    <Button
                        variant="default"
                        className="h-fit rounded-none self-start mt-4 md:mt-0 cursor-pointer"
                        onClick={() => setDialogOpen(true)}
                    >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center gap-4">
                            {userProfile?.photoUrl ? (
                                <Image
                                    src={userProfile.photoUrl}
                                    alt={user?.fullName || "User"}
                                    className="w-24 h-24 rounded-none border-2 border-gray-200 dark:border-gray-700 object-cover"
                                    width={96}
                                    height={96}
                                    priority
                                />
                            ) : user?.imageUrl ? (
                                <Image
                                src={user.imageUrl}
                                alt={user.fullName || "User"}
                                className="w-24 h-24 rounded-none border-2 border-gray-200 dark:border-gray-700"
                                width={96}
                                height={96}
                                priority
                            />
                                ) : (
                                    <div className="w-24 h-24 rounded-none border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                        <User className="w-8 h-8 text-gray-400" />
                                    </div>
                        )}
                            <Button
                                size="sm"
                                variant="outline"
                                className="rounded-none cursor-pointer"
                                onClick={() => setUploadDialogOpen(true)}
                            >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Update Photo
                        </Button>
                    </div>

                    {/* User Details */}
                    <div className="flex-1 space-y-4">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">First Name</label>
                                    <p className="text-gray-900 dark:text-white capitalize">{userProfile?.firstName || user?.firstName || "Not set"}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Last Name</label>
                                    <p className="text-gray-900 dark:text-white capitalize">{userProfile?.lastName || user?.lastName || "Not set"}</p>
                                </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-1">
                                    <Mail className="w-4 h-4" />
                                    Email
                                </label>
                                <p className="text-gray-900 dark:text-white">{user?.primaryEmailAddress?.emailAddress || "Not set"}</p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-1">
                                    <Phone className="w-4 h-4" />
                                    Phone
                                </label>
                                    <p className="text-gray-900 dark:text-white">{userProfile?.phoneNumber || user?.primaryPhoneNumber?.phoneNumber || "Not set"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
            <EditProfileDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSave={handleSaveProfile}
                initialData={userProfile}
            />
            <UploadPhotoDialog
                open={uploadDialogOpen}
                onOpenChange={setUploadDialogOpen}
                onUpload={handlePhotoUpload}
                currentPhoto={userProfile?.photoUrl || user?.imageUrl}
            />
        </>
    )
}

export default ProfileInformation