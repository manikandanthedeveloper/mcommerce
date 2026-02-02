import Link from "next/link"
import { GiFoodChain } from "react-icons/gi"

function Logo() {
    return <h1><Link href="/" className="font-bold text-lg"><GiFoodChain size={40} /></Link></h1>
}

export default Logo