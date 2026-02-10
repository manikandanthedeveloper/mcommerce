"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ChangePasswordModal from "./ChangePasswordModal";
import EmailNotificationsModal from "./EmailNotificationsModal";
import PrivacySecurityModal from "./PrivacySecurityModal";

const AccountSetting = () => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);

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
                                className="rounded-none"
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
                                className="rounded-none"
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
                                className="rounded-none"
                                onClick={() => setShowPrivacyModal(true)}
                            >
                                Manage
                            </Button>
                        </div>
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
        </>
    );
};

export default AccountSetting;