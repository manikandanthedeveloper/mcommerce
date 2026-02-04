import Container from "@/components/global/Container"
import Link from "next/link"
import { FaMartiniGlassEmpty } from "react-icons/fa6"

const NotFound = () => {
    return (
        <Container className="min-h-screen flex items-center justify-center">
            <div className="text-center text-2xl font-semibold mt-5">
                <FaMartiniGlassEmpty className="inline-block ml-2 text-9xl" />
                <p className="mt-4">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/" className="text-primary underline mt-2 inline-block">
                    Return to Home
                </Link>
            </div>
        </Container>
    )
}

export default NotFound