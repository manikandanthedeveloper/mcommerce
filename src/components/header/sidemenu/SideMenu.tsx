import CartLink from "./CartLink"
import SideMenuDropdown from "./SideMenuDropdown"
import DarkMode from "./DarkMode"
import CartPopover from "@/components/cart/CartPopover"

export function SideMenu() {
    return (
        <ul className="flex items-center gap-4">
            <li><DarkMode /></li>
            <li>
                <CartPopover />
            </li>
            <li>
                <SideMenuDropdown />
            </li>
        </ul>

    )
}
