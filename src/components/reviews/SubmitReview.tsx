"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react"
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/util/actions";
import { Card } from "../ui/card";
import RatingInput from "./RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import SubmitButton from "../form/SubmitButton";

const SubmitReview = ({ productId }: { productId: string }) => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const { user } = useUser();

    return (
        <div>
            <Button onClick={() => setShowReviewForm((prev) => !prev)} variant="outline" className="w-full rounded-none cursor-pointer">
                {showReviewForm ? "Cancel Review" : "Write a Review"}
            </Button>
            {showReviewForm && (
                <div className="mt-4 p-4 border rounded-none">
                    {user ? (
                        <FormContainer action={createReviewAction}>
                            <input type="hidden" name="productId" value={productId} />
                            <input type="hidden" name="authorName" value={user.firstName || user.username || ""} />
                            <input type="hidden" name="authorImageUrl" value={user.imageUrl || ""} />
                            <RatingInput name="rating" labelText="Your Rating" />
                            <TextAreaInput name="comment" labelText="Your Review" defaultValue="Outstanding product!!!" />
                            <SubmitButton className="mt-4 cursor-pointer rounded-none" />
                        </FormContainer>
                    ) : (
                        <p>Please sign in to write a review.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default SubmitReview