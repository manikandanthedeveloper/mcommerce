"use client";

import AccountSetting from "@/components/MyAccount/AccountSetting";

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your preferences and account security</p>
      </div>
      <AccountSetting />
    </div>
  );
}

export default SettingsPage;
