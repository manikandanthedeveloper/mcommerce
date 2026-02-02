import CartLink from "./CartLink"
import SideMenuDropdown from "./SideMenuDropdown"
import DarkMode from "./DarkMode"

export function SideMenu() {
    return (
        <ul className="flex items-center gap-4">
            <li><DarkMode /></li>
            <li>
                <CartLink />
            </li>
            <li>
                <SideMenuDropdown />
            </li>
        </ul>

    )
}
