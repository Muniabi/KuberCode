"use client";

import { CourseCard } from "@/components/cards/course-card";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import { MOCK_COURSES, LEVEL_MAPPING, DIRECTIONS } from "@/store/courses";

interface CoursesListProps {
    direction?: (typeof DIRECTIONS)[number];
    searchQuery?: string;
    filters: {
        level: string[];
        duration: string[];
        price: {
            min: number;
            max: number;
        };
    };
}

const ITEMS_PER_PAGE = 9;

export const CoursesList = ({
    direction,
    searchQuery,
    filters,
}: CoursesListProps) => {
    const [displayedCourses, setDisplayedCourses] = useState<
        typeof MOCK_COURSES
    >([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: "100px",
    });

    // Фильтруем курсы
    const filteredCourses = MOCK_COURSES.filter((course) => {
        // Фильтр по направлению
        if (
            direction &&
            direction !== "Все направления" &&
            course.direction !== direction
        ) {
            return false;
        }

        // Фильтр по поиску
        if (
            searchQuery &&
            !course.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
            return false;
        }

        // Фильтр по уровню
        if (filters.level.length > 0) {
            const mappedLevels = filters.level.map(
                (level) => LEVEL_MAPPING[level]
            );
            if (!mappedLevels.includes(course.level)) {
                return false;
            }
        }

        // Фильтр по длительности
        if (filters.duration.length > 0) {
            const duration = parseInt(course.duration);
            const matchesDuration = filters.duration.some((filter) => {
                if (filter === "До 5 часов") return duration < 5;
                if (filter === "5-20 часов")
                    return duration >= 5 && duration <= 20;
                if (filter === "Более 20 часов") return duration > 20;
                return false;
            });
            if (!matchesDuration) return false;
        }

        // Обновленный фильтр по цене
        const price = course.price.current;
        if (filters.price.min === 0 && filters.price.max === 0) {
            if (!course.isFree) return false;
        } else {
            if (price < filters.price.min || price > filters.price.max)
                return false;
        }

        return true;
    });

    const loadMoreCourses = async () => {
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500)); // Имитация задержки

            const startIndex = (page - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const newCourses = filteredCourses.slice(startIndex, endIndex);

            if (newCourses.length === 0) {
                setHasMore(false);
                return;
            }

            setDisplayedCourses((prev) => [...prev, ...newCourses]);
            setPage((prev) => prev + 1);
        } catch (error) {
            console.error("Failed to load courses:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Сброс при изменении фильтров
    useEffect(() => {
        setDisplayedCourses([]);
        setPage(1);
        setHasMore(true);
    }, [direction, searchQuery, filters]);

    // Загрузка первой порции данных при сбросе
    useEffect(() => {
        if (page === 1 && displayedCourses.length === 0) {
            loadMoreCourses();
        }
    }, [page, displayedCourses.length]);

    // Подгрузка следующей порции при скролле
    useEffect(() => {
        if (inView && hasMore && !isLoading) {
            loadMoreCourses();
        }
    }, [inView, hasMore, isLoading]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>

            {hasMore && (
                <div ref={ref} className="flex justify-center py-8">
                    {isLoading && (
                        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    )}
                </div>
            )}

            {!hasMore && displayedCourses.length > 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Больше курсов нет
                </div>
            )}

            {!hasMore && displayedCourses.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Курсы не найдены
                </div>
            )}
        </div>
    );
};
