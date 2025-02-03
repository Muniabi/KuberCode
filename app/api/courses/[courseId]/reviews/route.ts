import { NextResponse } from "next/server";
import { CourseReview } from "@/types/course";

// Моковые данные для отзывов
const MOCK_REVIEWS: CourseReview[] = [
    {
        id: "1",
        userId: "user1",
        courseId: "1",
        rating: 5,
        comment:
            "Отличный курс! Материал подается очень понятно и структурировано.",
        createdAt: "2024-03-15T10:00:00Z",
        user: {
            name: "Александр М.",
            avatar: "/avatars/user1.jpg",
        },
        helpful: 12,
    },
    // Добавьте больше моковых отзывов
];

export async function GET(
    request: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const courseReviews = MOCK_REVIEWS.filter(
            (review) => review.courseId === params.courseId
        );

        return NextResponse.json({
            reviews: courseReviews,
            total: courseReviews.length,
            averageRating:
                courseReviews.reduce((acc, review) => acc + review.rating, 0) /
                courseReviews.length,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}

export async function POST(
    request: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const body = await request.json();
        const { rating, comment, userId } = body;

        // В реальном приложении здесь была бы валидация и сохранение в БД
        const newReview: CourseReview = {
            id: `review-${Date.now()}`,
            userId,
            courseId: params.courseId,
            rating,
            comment,
            createdAt: new Date().toISOString(),
            user: {
                name: "Текущий пользователь",
                avatar: "/avatars/default.jpg",
            },
            helpful: 0,
        };

        return NextResponse.json(newReview);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create review" },
            { status: 500 }
        );
    }
}
