import { fetchProductReviews } from "@/util/actions"
import SectionTitle from "../global/SectionTitle";
import ReviewCard from "./ReviewCard";

const ProductReviews = async ({ productId }: { productId: string }) => {
    const reviews = await fetchProductReviews(productId);

    return (
        <div className="mt-4">
            <SectionTitle title="Customer Reviews" />
            <p className="text-sm text-primary-dark/50">{reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}</p>
            <div className="grid gap-4 mt-4 md:grid-cols-2">
                {reviews.map((review) => {
                    const { id, rating, comment, createdAt, authorName, authorImageUrl } = review;
                    const reviewInfo = { comment, rating, image: authorImageUrl, name: authorName, createdAt };

                    return <ReviewCard key={id} reviewInfo={reviewInfo} />
                })}
            </div>
        </div>
    )
}

export default ProductReviews