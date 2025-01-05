"use client";

import { CourseCard } from "@/components/cards/course-card";
import { useEffect, useState } from "react";

// Временные тестовые данные
const MOCK_COURSES = [
    {
        id: "1",
        title: "React разработчик",
        company: "KuberCode",
        level: "junior",
        type: "full-time",
        location: "Удаленно",
        salary: 1500,
        tags: ["React", "TypeScript", "Next.js"],
        logo: "/logos/react.svg",
        date: "2024-03-10",
        isBookmarked: false,
    },
    {
        id: "2",
        title: "Python Backend Developer",
        company: "KuberCode",
        level: "middle",
        type: "part-time",
        location: "Удаленно",
        salary: 2000,
        tags: ["Python", "Django", "PostgreSQL"],
        logo: "/logos/python.svg",
        date: "2024-03-09",
        isBookmarked: true,
    },
    // Добавьте больше тестовых курсов...
] as const;

interface CoursesListProps {
    direction?: string;
    searchQuery?: string;
}

export const CoursesList = ({ direction, searchQuery }: CoursesListProps) => {
    const [courses, setCourses] = useState(MOCK_COURSES);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                // TODO: Реализовать API запрос
                // const response = await fetch('/api/courses?' + new URLSearchParams({
                //     direction: direction || '',
                //     search: searchQuery || '',
                // }));
                // const data = await response.json();
                // setCourses(data);

                // Имитация загрузки данных
                await new Promise((resolve) => setTimeout(resolve, 500));
                setCourses(MOCK_COURSES);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                // TODO: Добавить обработку ошибок
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [direction, searchQuery]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* TODO: Добавить скелетон загрузки */}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
            ))}
        </div>
    );
};
