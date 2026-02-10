"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ChangePasswordModal from "./ChangePasswordModal";
import EmailNotificationsModal from "./EmailNotificationsModal";
import PrivacySecurityModal from "./PrivacySecurityModal";
import DeleteAccountModal from "./DeleteAccountModal";

const AccountSetting = () => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
            <Card className="rounded-none">
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Password</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Change your password</p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-none cursor-pointer"
                                onClick={() => setShowPasswordModal(true)}
                            >
                                Change
                            </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Email Notifications</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your notification preferences</p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-none cursor-pointer"
                                onClick={() => setShowEmailModal(true)}
                            >
                                Configure
                            </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Privacy & Security</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your privacy preferences</p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-none cursor-pointer"
                                onClick={() => setShowPrivacyModal(true)}
                            >
                                Manage
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-none border-red-200 dark:border-red-900">
                <CardHeader>
                    <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            This action permanently deletes your account and data.
                        </p>
                        <Button
                            variant="outline"
                            className="w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900 rounded-none"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Delete Account
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <ChangePasswordModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />
            <EmailNotificationsModal
                isOpen={showEmailModal}
                onClose={() => setShowEmailModal(false)}
            />
            <PrivacySecurityModal
                isOpen={showPrivacyModal}
                onClose={() => setShowPrivacyModal(false)}
            />
            <DeleteAccountModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            />
        </>
    );
};

export default AccountSetting;