"use client"

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
        <button className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
            <LogOutIcon />
            Sign Out
        </button>
    )
}

export default SignedOutLink