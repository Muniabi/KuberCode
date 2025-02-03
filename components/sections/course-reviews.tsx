"use client";

import { useReviews } from "@/hooks/useReviews";
import { Star, ThumbsUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface CourseReviewsProps {
    courseId: string;
}

export const CourseReviews = ({ courseId }: CourseReviewsProps) => {
    const { reviews, isLoading, averageRating, totalReviews, addReview } =
        useReviews(courseId);
    const [isAddingReview, setIsAddingReview] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
    const { toast } = useToast();

    // Распределение рейтингов
    const ratingDistribution = reviews.reduce(
        (acc, review) => {
            acc[review.rating - 1]++;
            return acc;
        },
        [0, 0, 0, 0, 0]
    );

    const handleAddReview = async () => {
        try {
            setIsAddingReview(true);
            await addReview(newReview);
            toast({
                title: "Отзыв добавлен",
                description: "Спасибо за ваш отзыв!",
            });
            setNewReview({ rating: 5, comment: "" });
        } catch (error) {
            toast({
                title: "Ошибка",
                description: "Не удалось добавить отзыв",
                variant: "destructive",
            });
        } finally {
            setIsAddingReview(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Общая статистика */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">
                            {averageRating.toFixed(1)}
                        </span>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${
                                        i < Math.round(averageRating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                        На основе {totalReviews} отзывов
                    </p>
                </div>

                {/* Распределение рейтингов */}
                <div className="space-y-2">
                    {ratingDistribution
                        .map((count, index) => ({
                            stars: 5 - index,
                            count,
                            percentage: (count / totalReviews) * 100,
                        }))
                        .reverse()
                        .map((rating) => (
                            <div
                                key={rating.stars}
                                className="flex items-center gap-4"
                            >
                                <div className="w-20 text-sm text-gray-600">
                                    {rating.stars} звезд
                                </div>
                                <Progress
                                    value={rating.percentage}
                                    className="h-2"
                                />
                                <div className="w-12 text-sm text-gray-600">
                                    {rating.count}
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Кнопка добавления отзыва */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Написать отзыв</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Написать отзыв</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() =>
                                        setNewReview({
                                            ...newReview,
                                            rating: i + 1,
                                        })
                                    }
                                >
                                    <Star
                                        className={`w-6 h-6 ${
                                            i < newReview.rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <Textarea
                            placeholder="Поделитесь своим мнением о курсе..."
                            value={newReview.comment}
                            onChange={(e) =>
                                setNewReview({
                                    ...newReview,
                                    comment: e.target.value,
                                })
                            }
                        />
                        <Button
                            onClick={handleAddReview}
                            disabled={isAddingReview}
                        >
                            {isAddingReview && (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            )}
                            Отправить отзыв
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Список отзывов */}
            <div className="space-y-6">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="p-6 rounded-xl border border-gray-200 dark:border-gray-800"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <img
                                    src={review.user.avatar}
                                    alt={review.user.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <h4 className="font-medium">
                                        {review.user.name}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${
                                                        i < review.rating
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {new Date(
                                                review.createdAt
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">
                                <ThumbsUp className="w-4 h-4 mr-2" />
                                {review.helpful}
                            </Button>
                        </div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                            {review.comment}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
