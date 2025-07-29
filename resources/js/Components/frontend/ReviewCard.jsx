import { getStars, formatDate, calculateRating } from "@/Utils/helper";

export default function ReviewCard({ review }) {
    return (
        <div>
            <div className="flex gap-5 items-center">
                <img
                    src={review.user.profile_picture || "/assets/profile_placeholder.png"}
                    alt={review.user.name}
                    className="aspect-square rounded-full object-cover max-w-12"
                />
                <p className="font-semibold text-gray-600">{review.user.name}</p>
            </div>
            <div className="flex items-center gap-2 mt-4 text-gray-400 font-medium text-sm">
                <div className="flex items-center gap-1">
                    {getStars(calculateRating(review))}
                </div>
                <span>{formatDate(review.created_at)}</span>
            </div>
            <p className="text-gray-500 mt-4">{review.review}</p>
        </div>
    );
}
