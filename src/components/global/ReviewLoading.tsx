import { Card, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const ReviewLoading = () => {
    return (
        <Card className='rounded-none'>
            <CardHeader>
                <div className='flex items-center'>
                    <Skeleton className='w-12 h-12 rounded-none' />
                    <div className='ml-4'>
                        <Skeleton className='w-37.5 h-4 mb-2' />
                        <Skeleton className='w-37.5 h-4 ' />
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}

export default ReviewLoading