import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserIcon from "./UserIcon"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import SignInLink from "./SignInLink"
import SideMenuDropdownLinks from "./SideMenuDropdownLinks"

function SideMenuDropdown() {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="flex rounded-none border items-center content-center cursor-pointer">
                <UserIcon />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-none border">
            <SignedIn>
                <SideMenuDropdownLinks />
            </SignedIn>
            <SignedOut>
                <DropdownMenuItem>
                    <SignInLink />
                </DropdownMenuItem>
            </SignedOut>
        </DropdownMenuContent>
    </DropdownMenu>
}

export default SideMenuDropdown