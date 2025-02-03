import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        // В реальном приложении получаем из базы данных
        const achievements = [
            {
                id: "1",
                title: "Первые шаги",
                description: "Завершите первый модуль курса",
                progress: 100,
                isUnlocked: true,
                unlockedAt: "2024-03-15T10:00:00Z",
            },
            // ... другие достижения
        ];

        return NextResponse.json(achievements);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch achievements" },
            { status: 500 }
        );
    }
}
