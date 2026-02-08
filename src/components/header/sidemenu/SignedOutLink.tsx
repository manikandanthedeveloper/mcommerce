"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useClerk } from "@clerk/nextjs"
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { toast } from "sonner"

const SignedOutLink = () => {
    const { signOut } = useClerk();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        toast.success("Signed out successfully")
        router.push("/");
    }

    return (
        <>
            <Separator className="my-1" />
            <Button variant={"ghost"} className="flex items-start gap-3 group cursor-pointer w-full" onClick={handleLogout}>
                <div
                    className="flex items-start gap-3 w-full rounded-none transition-all duration-200 cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent"
                >
                    <LogOutIcon className="w-5 h-5 shrink-0 mt-0.5 transition-colors text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300" />
                    <div className="flex min-w-0">
                        <p className="font-medium text-sm transition-colors text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                            Sign Out
                        </p>
                    </div>
                </div>
            </Button>
        </>
    )
}

export default SignedOutLink