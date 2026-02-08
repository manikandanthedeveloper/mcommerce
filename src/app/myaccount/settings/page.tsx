'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Eye, Shield } from "lucide-react";

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your preferences and account security</p>
      </div>

      {/* Notification Settings */}
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-none">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Email Notifications</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive email updates about orders and promotions</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded cursor-pointer" />
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-none">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">SMS Notifications</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get updates via text message</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded cursor-pointer" />
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-none">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Marketing Emails</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive special offers and promotions</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded cursor-pointer" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-none">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Profile Visibility</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Allow other users to see your profile</p>
              </div>
              <select className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <option>Private</option>
                <option>Public</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-none">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Data Collection</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Allow us to collect usage data to improve your experience</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded cursor-pointer" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
              </div>
              <Button size="sm" variant="outline" className="rounded-none">Setup</Button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Active Sessions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">View and manage your active sessions</p>
              </div>
              <Button size="sm" variant="outline" className="rounded-none">View</Button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Change Password</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
              </div>
              <Button size="sm" variant="outline" className="rounded-none">Change</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="rounded-none border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              These actions are irreversible. Please proceed with caution.
            </p>
            <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900 rounded-none">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SettingsPage;
