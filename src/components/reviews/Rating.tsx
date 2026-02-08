import { FaRegStar, FaStar } from "react-icons/fa6";

const Rating = ({ rating }: { rating: number }) => {
    const starts = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));

    return (
        <div className="flex items-center gap-x-1">
            {starts.map((filled, index) => {
                const i = index + 1;
                const isFilled = filled;
                const className = `w-3 h-3 ${isFilled ? 'text-primary' : 'text-grey-400'}`;

                return isFilled ? (
                    <FaStar className={className} key={i} />
                ) : (
                    <FaRegStar className={className} key={i} />
                );
            })}
        </div>
    )
}

export default Rating