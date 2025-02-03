import { useState, useEffect } from "react";
import { CourseProgress, CourseModule, CourseLesson } from "@/types/course";

interface UseCourseProgressReturn {
    progress: CourseProgress | null;
    isLoading: boolean;
    error: string | null;
    markLessonComplete: (lessonId: string) => Promise<void>;
    markModuleComplete: (moduleId: string) => Promise<void>;
    updateLastAccessed: (lessonId: string) => Promise<void>;
}

export function useCourseProgress(
    courseId: string,
    userId: string
): UseCourseProgressReturn {
    const [progress, setProgress] = useState<CourseProgress | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProgress();
    }, [courseId, userId]);

    const fetchProgress = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `/api/courses/${courseId}/progress/${userId}`
            );
            const data = await response.json();

            if (!response.ok) throw new Error(data.error);

            setProgress(data);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to fetch progress"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const markLessonComplete = async (lessonId: string) => {
        try {
            const response = await fetch(
                `/api/courses/${courseId}/progress/${userId}/lessons/${lessonId}`,
                {
                    method: "POST",
                }
            );

            if (!response.ok)
                throw new Error("Failed to update lesson progress");

            await fetchProgress(); // Обновляем прогресс
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to mark lesson as complete"
            );
            throw err;
        }
    };

    const markModuleComplete = async (moduleId: string) => {
        try {
            const response = await fetch(
                `/api/courses/${courseId}/progress/${userId}/modules/${moduleId}`,
                {
                    method: "POST",
                }
            );

            if (!response.ok)
                throw new Error("Failed to update module progress");

            await fetchProgress();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to mark module as complete"
            );
            throw err;
        }
    };

    const updateLastAccessed = async (lessonId: string) => {
        try {
            const response = await fetch(
                `/api/courses/${courseId}/progress/${userId}/last-accessed`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ lessonId }),
                }
            );

            if (!response.ok) throw new Error("Failed to update last accessed");

            await fetchProgress();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update last accessed lesson"
            );
            throw err;
        }
    };

    return {
        progress,
        isLoading,
        error,
        markLessonComplete,
        markModuleComplete,
        updateLastAccessed,
    };
}
