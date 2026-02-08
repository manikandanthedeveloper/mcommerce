import { User2 } from "lucide-react";
import MyAccountLinks from './MyAccountLinks';
import SignedOutLink from '../header/sidemenu/SignedOutLink';

const Sidebar = () => {

    return (
        <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
                {/* User Quick Info */}
                <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-none p-4 mb-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3">
                        <div className="shrink-0">
                            <User2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Welcome back!</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">My Account</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Items */}
                <MyAccountLinks />
                {/* Logout Button */}
                <SignedOutLink />
            </div>
        </aside>
    )
}

export default Sidebar