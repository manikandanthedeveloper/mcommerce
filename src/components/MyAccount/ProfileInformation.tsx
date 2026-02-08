import { useUser } from "@clerk/nextjs";
import { Mail, Phone, Edit2, User } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const ProfileInformation = () => {
    const { user } = useUser();

    return (
        <Card className="rounded-none">
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                </CardTitle>
                <Button variant="default" className="h-fit rounded-none self-start mt-4 md:mt-0">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center gap-4">
                        {user && user?.imageUrl && (
                            <Image
                                src={user.imageUrl}
                                alt={user.fullName || "User"}
                                className="w-24 h-24 rounded-none border-2 border-gray-200 dark:border-gray-700"
                                width={96}
                                height={96}
                                loading="eager"
                            />
                        )}
                        <Button size="sm" variant="outline" className="rounded-none">
                            <Edit2 className="w-4 h-4 mr-2" />
                            Update Photo
                        </Button>
                    </div>

                    {/* User Details */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Full Name</label>
                            <p className="text-lg text-gray-900 dark:text-white">{user?.fullName || "Not set"}</p>
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
                                <p className="text-gray-900 dark:text-white">{user?.primaryPhoneNumber?.phoneNumber || "Not set"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileInformation