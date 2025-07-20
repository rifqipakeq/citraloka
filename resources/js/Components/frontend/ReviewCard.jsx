import { getStars, formatDate } from "@/Utils/helper";

export default function ReviewCard({ user }) {
    return (
        <div>
            <div className="flex gap-5 items-center">
                <img
                    src={user.profile_picture}
                    alt={user.name}
                    className="aspect-square rounded-full object-cover max-w-12"
                />
                <p className="font-semibold text-gray-600">{user.name}</p>
            </div>
            <div className="flex items-center gap-2 mt-4 text-gray-400 font-medium text-sm">
                <div className="flex items-center gap-1">
                    {getStars(user.rating)}
                </div>
                <span>{formatDate(user.created_at)}</span>
            </div>
            <p className="text-gray-500 mt-4">{user.review}</p>
        </div>
    );
}
