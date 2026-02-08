import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare } from "lucide-react";
import { deleteReviewAction, fetchProductReviewsByUser } from "@/util/actions";
import ReviewCard from "@/components/reviews/ReviewCard";
import FormContainer from "@/components/form/FormContainer";
import IconButton from "@/components/form/IconButton";
import { Suspense } from "react";
import ReviewLoading from "@/components/global/ReviewLoading";

async function ReviewsPage() {
  const reviews = await fetchProductReviewsByUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Reviews</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage and view all your product reviews</p>
      </div>

      <Suspense fallback={<ReviewLoading />}>
        {reviews.length === 0 ? (
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Your Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
                  <MessageSquare className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No reviews yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">You haven&apos;t written any reviews yet. Share your thoughts on products you&apos;ve purchased</p>
                <Button variant="default" className="rounded-none">
                  <Star className="w-4 h-4 mr-2" />
                  Write a Review
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => {
              const { id, comment, rating } = review;
              const { name, image } = review.product;
              const reviewInfo = { comment, rating, name, image };

              return (
                <ReviewCard key={id} reviewInfo={reviewInfo}>
                  <DeleteReview reviewId={id} />
                </ReviewCard>
              )
            })}
          </div>
        )}
      </Suspense>
    </div>
  );
}

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });

  return (
    <FormContainer action={deleteReview}>
      <IconButton action='delete' />
    </FormContainer>
  );
};

export default ReviewsPage;
