import { ReviewCardProps } from "@/types/ReviewCardProps"
import { Card, CardContent, CardHeader } from "../ui/card"
import Image from "next/image"
import Rating from "./Rating"
import Comment from "./Comment"

const ReviewCard = ({ reviewInfo, children }: ReviewCardProps) => {
    return (
        <Card className="p-4 relative rounded-none">
            <CardHeader className="flex items-center gap-x-4 mb-2">
                <div className="flex items-center">
                    <Image src={reviewInfo.image || '/placeholder.png'} alt={`${reviewInfo.name}'s profile picture`} width={40} height={40} className="rounded-none object-cover" />
                    <div className="ml-4">
                        <h3 className="text-sm font-semibold text-primary-dark">{reviewInfo.name}</h3>
                        <Rating rating={reviewInfo.rating} />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <Comment comment={reviewInfo.comment} />
            </CardContent>
            <div className="absolute top-2 right-2 text-xs text-primary-dark/50">{children}</div>
        </Card>
    )
}

export default ReviewCard