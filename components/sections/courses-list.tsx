"use client";

import { CourseCard } from "@/components/cards/course-card";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import {
    MOCK_COURSES,
    Direction,
    LEVEL_MAPPING,
    CourseLevel,
} from "@/store/courses";
import { Course } from "@/types/course";

const ITEMS_PER_PAGE = 6;

const isCourse = (course: any): course is Course => {
    return (
        typeof course.id === "string" &&
        typeof course.title === "string" &&
        typeof course.description === "string" &&
        typeof course.image === "string" &&
        typeof course.duration === "string" &&
        typeof course.hasEmployment === "boolean" &&
        typeof course.rating === "number" &&
        typeof course.studentsCount === "number" &&
        typeof course.completionRate === "number" &&
        typeof course.price === "object" &&
        typeof course.price.current === "number" &&
        typeof course.author === "object" &&
        typeof course.author.name === "string" &&
        typeof course.author.role === "string" &&
        typeof course.author.avatar === "string" &&
        typeof course.level === "string" &&
        typeof course.direction === "string" &&
        Array.isArray(course.tags) &&
        typeof course.logo === "string" &&
        typeof course.isFree === "boolean"
    );
};

export const CoursesList = ({
    direction,
    searchQuery,
    filters,
}: {
    direction?: Direction;
    searchQuery?: string;
    filters: {
        level: CourseLevel[];
        duration: string[];
        price: {
            min: number;
            max: number;
        };
    };
}) => {
    const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: "100px",
    });

    // Фильтрация курсов
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
            await new Promise((resolve) => setTimeout(resolve, 500));

            const startIndex = displayedCourses.length;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const newCourses = filteredCourses.slice(startIndex, endIndex);

            // Используйте функцию для проверки типа
            const validCourses = newCourses.filter(isCourse);

            if (validCourses.length === 0) {
                setHasMore(false);
                return;
            }

            setDisplayedCourses((prev) => [...prev, ...validCourses]);
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

    // Загрузка при скролле
    useEffect(() => {
        if (inView && !isLoading && hasMore) {
            loadMoreCourses();
        }
    }, [inView, isLoading, hasMore]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {displayedCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        {...{
                            ...course,
                            rating: { value: course.rating, count: 0 },
                        }}
                    />
                ))}
            </div>
            {hasMore && filteredCourses.length > displayedCourses.length && (
                <div ref={ref} className="flex justify-center py-6 sm:py-8">
                    {isLoading && (
                        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-purple-500" />
                    )}
                </div>
            )}

            {/* Сообщения о статусе */}
            {!hasMore && displayedCourses.length === 0 && (
                <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                    Курсы не найдены
                </div>
            )}

            {!hasMore &&
                displayedCourses.length > 0 &&
                filteredCourses.length === displayedCourses.length && (
                    <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                        Больше курсов нет
                    </div>
                )}
        </div>
    );
};
