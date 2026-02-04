import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BsMinecartLoaded } from "react-icons/bs"

function CartLink() {
    return <Link href="/cart"><Button variant='outline' size='icon' className='rounded-none cursor-pointer'><BsMinecartLoaded size={24} /></Button></Link>
}

export default CartLink