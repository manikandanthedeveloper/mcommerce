import Link from "next/link"
import { BsMinecartLoaded } from "react-icons/bs"

function CartLink() {
    return <Link href="/cart"><BsMinecartLoaded size={24} /></Link>
}

export default CartLink