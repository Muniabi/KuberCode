import { useState, useEffect } from "react";
import { CourseReview } from "@/types/course";

interface UseReviewsReturn {
    reviews: CourseReview[];
    isLoading: boolean;
    error: string | null;
    averageRating: number;
    totalReviews: number;
    addReview: (review: Partial<CourseReview>) => Promise<void>;
}

export function useReviews(courseId: string): UseReviewsReturn {
    const [reviews, setReviews] = useState<CourseReview[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
        fetchReviews();
    }, [courseId]);

    const fetchReviews = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/courses/${courseId}/reviews`);
            const data = await response.json();

            if (!response.ok) throw new Error(data.error);

            setReviews(data.reviews);
            setAverageRating(data.averageRating);
            setTotalReviews(data.total);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to fetch reviews"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const addReview = async (review: Partial<CourseReview>) => {
        try {
            const response = await fetch(`/api/courses/${courseId}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(review),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            // Обновляем список отзывов
            await fetchReviews();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to add review"
            );
            throw err;
        }
    };

    return {
        reviews,
        isLoading,
        error,
        averageRating,
        totalReviews,
        addReview,
    };
}
