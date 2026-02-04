import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    BadgeCheckIcon,
    BellIcon,
    CreditCardIcon,
    LogInIcon,
} from "lucide-react"
import FavoritesLink from "./FavoritesLink"
import { BsHeart } from "react-icons/bs"
import UserIcon from "./UserIcon"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import SignedOutLink from "./SignedOutLink"

function SideMenuDropdown() {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="flex rounded-none border items-center content-center cursor-pointer">
                <UserIcon />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-none border">
            <SignedIn>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <BsHeart />
                        <FavoritesLink />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <BadgeCheckIcon />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCardIcon />
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <BellIcon />
                        Notifications
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <SignedOutLink />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </SignedIn>
            <SignedOut>
                <DropdownMenuItem>
                    <LogInIcon />
                    Sign In
                </DropdownMenuItem>
            </SignedOut>
        </DropdownMenuContent>
    </DropdownMenu>
}

export default SideMenuDropdown