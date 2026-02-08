'use client'

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import ProfileInformation from "@/components/MyAccount/ProfileInformation";
import AddressSection from "@/components/MyAccount/AddressSection";
import AccountSetting from "@/components/MyAccount/AccountSetting";

const MyAccountPage = () => {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="space-y-4 text-center">
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto animate-pulse" />
                    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sign in to view your account</h2>
                <Button variant="default">Sign In</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Profile Overview Card */}
            <ProfileInformation />

            {/* Address Section */}
            <AddressSection />

            {/* Account Settings */}
            <AccountSetting />
        </div>
    );
};

export default MyAccountPage;