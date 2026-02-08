import { currentUser } from "@clerk/nextjs/server"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Avatar } from "@/components/ui/avatar"
import { LuUser } from "react-icons/lu"

const UserIcon = async () => {
    const user = await currentUser();
    const profileImage = user?.imageUrl;

    if (profileImage) {
        return (
            <Avatar>
                <AvatarImage src={profileImage} alt={user?.firstName || "User"} />
                <AvatarFallback className="flex group/avatar items-center justify-center rounded-full">{user?.firstName ? user.firstName.charAt(0) : <LuUser className="w-6 h-6 flex items-center justify-center" />}</AvatarFallback>
            </Avatar>
        )
    }

    return (
        <LuUser className="w-6 h-6 flex items-center justify-center" />
    )
}

export default UserIcon