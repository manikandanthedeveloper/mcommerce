"use client"

import { useClerk } from "@clerk/nextjs"
import { LogInIcon } from "lucide-react"
import { useRouter } from "next/navigation";

const SignInLink = () => {
    const { openSignIn } = useClerk();
    const router = useRouter();

    const handleLogin = async () => {
        await openSignIn();
        router.push("/");
    }

    return (
        <button className="flex items-center gap-2 cursor-pointer" onClick={handleLogin}>
            <LogInIcon />
            Sign In
        </button>
    )
}

export default SignInLink