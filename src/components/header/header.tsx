import Container from "../global/Container"
import Logo from "./Logo"
import { Navbar } from "./navbar/Navbar"
import NavSearch from "./navbar/NavSearch"
import { SideMenu } from "./sidemenu/SideMenu"

function Header() {
    return <header className="fixed top-0 left-0 w-full border-b bg-background z-50 shadow-sm">
        <nav>
            <Container>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-4 gap-4">
                    <Logo />
                    <Navbar />
                    <NavSearch />
                    <SideMenu />
                </div>

            </Container>
        </nav>
    </header>
}

export default Header