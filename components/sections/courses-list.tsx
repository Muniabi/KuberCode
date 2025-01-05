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
        price: string[];
    };
}

const ITEMS_PER_PAGE = 6;

export const CoursesList = ({
    direction,
    searchQuery,
    filters,
}: CoursesListProps) => {
    const [courses, setCourses] = useState(
        MOCK_COURSES.slice(0, ITEMS_PER_PAGE)
    );
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: "100px",
    });

    const loadMoreCourses = async () => {
        setIsLoading(true);
        try {
            // Имитация загрузки с задержкой
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const start = page * ITEMS_PER_PAGE;
            const end = start + ITEMS_PER_PAGE;
            const newCourses = MOCK_COURSES.slice(start, end);

            if (newCourses.length === 0) {
                setHasMore(false);
                return;
            }

            setCourses((prev) => [...prev, ...newCourses]);
            setPage((prev) => prev + 1);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (inView && hasMore && !isLoading) {
            loadMoreCourses();
        }
    }, [inView, hasMore, isLoading]);

    const filterCourses = (courses: typeof MOCK_COURSES) => {
        return courses.filter((course) => {
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

            // Фильтр по цене
            if (filters.price.length > 0) {
                const price = course.price.current;
                const matchesPrice = filters.price.some((filter) => {
                    if (filter === "Бесплатные") return course.isFree;
                    if (filter === "До 5000 ₽") return price <= 5000;
                    if (filter === "5000-10000 ₽")
                        return price > 5000 && price <= 10000;
                    if (filter === "Более 10000 ₽") return price > 10000;
                    return false;
                });
                if (!matchesPrice) return false;
            }

            return true;
        });
    };

    // Применяем фильтры к курсам
    const filteredCourses = filterCourses(MOCK_COURSES);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>

            {/* Loader */}
            {hasMore && (
                <div ref={ref} className="flex justify-center py-8">
                    {isLoading && (
                        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    )}
                </div>
            )}

            {/* No more courses message */}
            {!hasMore && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Больше курсов нет
                </div>
            )}
        </div>
    );
};
