"use client";

import { useState } from "react";
import { Button } from "../ui/button";

const Comment = ({ comment }: { comment: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => {
        setIsExpanded((prev) => !prev);
    };

    const longCommentThreshold = 130;
    const isLongComment = comment.length > longCommentThreshold;
    const displayedComment = isExpanded || !isLongComment ? comment : `${comment.slice(0, longCommentThreshold)}...`;

    return (
        <div>
            <p className="text-sm text-primary-dark">{displayedComment}</p>
            {isLongComment && (
                <Button variant="link" size="sm" onClick={toggleExpanded} className="p-0 mt-1 text-muted-foreground cursor-pointer">
                    {isExpanded ? "Show Less" : "Read More"}
                </Button>
            )}
        </div>
    )
}

export default Comment