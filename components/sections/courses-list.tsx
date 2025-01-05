"use client";

import { CourseCard } from "@/components/cards/course-card";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

// Временные тестовые данные
const MOCK_COURSES = [
    {
        id: "1",
        title: "Mastering Interaction Design: From Principles to Practice",
        author: "Алексей Петров",
        level: "beginner",
        duration: "4h",
        description:
            "Погрузитесь в основы интерактивного дизайна и изучите практические приемы создания удобных интерфейсов.",
        price: {
            current: 3900,
            old: 5900,
        },
        tags: ["UI/UX", "Design", "Interaction"],
        logo: "/icons/figma.png",
        isFree: false,
    },
    {
        id: "2",
        title: "Python для начинающих: основы программирования",
        author: "Мария Иванова",
        level: "beginner",
        duration: "32h",
        description:
            "Изучите основы Python с нуля и создайте свои первые программы под руководством опытного преподавателя.",
        price: {
            current: 4900,
        },
        tags: ["Python", "Programming", "Beginner"],
        logo: "/icons/python.png",
        isFree: false,
    },
    {
        id: "3",
        title: "Введение в веб-разработку",
        author: "Дмитрий Сидоров",
        level: "beginner",
        duration: "2h",
        description:
            "Бесплатный вводный курс по веб-разработке. Узнайте, с чего начать путь веб-разработчика.",
        price: {
            current: 0,
        },
        tags: ["Web", "HTML", "CSS"],
        logo: "/icons/react.png",
        isFree: true,
    },
    {
        id: "4",
        title: "JavaScript Advanced Concepts",
        author: "Игорь Смирнов",
        level: "advanced",
        duration: "20h",
        description:
            "Углубленное изучение JavaScript: прототипы, замыкания, асинхронность и паттерны проектирования.",
        price: {
            current: 5900,
            old: 7900,
        },
        tags: ["JavaScript", "ES6+", "Advanced"],
        logo: "/icons/javascript.png",
        isFree: false,
    },
    {
        id: "5",
        title: "UI/UX Design в Figma",
        author: "Анна Королева",
        level: "intermediate",
        duration: "16h",
        description:
            "Создавайте современные интерфейсы в Figma: от прототипа до анимации.",
        price: {
            current: 4900,
            old: 6900,
        },
        tags: ["Figma", "UI", "UX", "Design"],
        logo: "/icons/figma.png",
        isFree: false,
    },
    {
        id: "6",
        title: "Swift для iOS разработки",
        author: "Павел Волков",
        level: "beginner",
        duration: "28h",
        description:
            "Научитесь создавать приложения для iOS с использованием языка Swift и SwiftUI.",
        price: {
            current: 5900,
        },
        tags: ["iOS", "Swift", "Mobile"],
        logo: "/icons/swift.png",
        isFree: false,
    },
    {
        id: "7",
        title: "Основы машинного обучения",
        author: "Светлана Кузнецова",
        level: "intermediate",
        duration: "30h",
        description:
            "Изучите основные концепции машинного обучения и создайте свои первые модели.",
        price: {
            current: 7500,
            old: 9500,
        },
        tags: ["Machine Learning", "AI", "Data Science"],
        logo: "https://cdn.iconscout.com/icon/free/png-256/free-machine-learning-2821811-2341230.png",
        isFree: false,
    },
    {
        id: "8",
        title: "Разработка мобильных приложений на React Native",
        author: "Андрей Смирнов",
        level: "intermediate",
        duration: "40h",
        description:
            "Создавайте кроссплатформенные мобильные приложения с использованием React Native.",
        price: {
            current: 8000,
            old: 10000,
        },
        tags: ["React Native", "Mobile", "Development"],
        logo: "https://cdn.iconscout.com/icon/free/png-256/free-react-native-2821812-2341231.png",
        isFree: false,
    },
    {
        id: "9",
        title: "Курс по SQL для начинающих",
        author: "Екатерина Петрова",
        level: "beginner",
        duration: "20h",
        description:
            "Научитесь работать с базами данных и писать запросы на SQL.",
        price: {
            current: 4000,
        },
        tags: ["SQL", "Databases", "Beginner"],
        logo: "https://cdn.iconscout.com/icon/free/png-256/free-sql-2821813-2341232.png",
        isFree: false,
    },
    {
        id: "10",
        title: "Основы кибербезопасности",
        author: "Игорь Сидоров",
        level: "advanced",
        duration: "25h",
        description:
            "Изучите основные принципы кибербезопасности и защитите свои данные.",
        price: {
            current: 6000,
            old: 8000,
        },
        tags: ["Cybersecurity", "Security", "Advanced"],
        logo: "https://cdn.iconscout.com/icon/free/png-256/free-cybersecurity-2821814-2341233.png",
        isFree: false,
    },
    {
        id: "11",
        title: "Введение в DevOps",
        author: "Александр Иванов",
        level: "intermediate",
        duration: "15h",
        description:
            "Научитесь основам DevOps и автоматизации процессов разработки.",
        price: {
            current: 5000,
            old: 7000,
        },
        tags: ["DevOps", "Automation", "Intermediate"],
        logo: "https://cdn.iconscout.com/icon/free/png-256/free-devops-2821815-2341234.png",
        isFree: false,
    },
    {
        id: "12",
        title: "Курс по графическому дизайну",
        author: "Мария Соколова",
        level: "beginner",
        duration: "18h",
        description:
            "Изучите основы графического дизайна и создайте свои первые проекты.",
        price: {
            current: 4500,
        },
        tags: ["Graphic Design", "Design", "Beginner"],
        logo: "https://cdn.iconscout.com/icon/free/png-256/free-graphic-design-2821816-2341235.png",
        isFree: false,
    },
    {
        id: "13",
        title: "Основы работы с Git",
        author: "Дмитрий Ковалев",
        level: "beginner",
        duration: "10h",
        description:
            "Научитесь использовать Git для управления версиями вашего кода.",
        price: {
            current: 3000,
        },
        tags: ["Git", "Version Control", "Beginner"],
        logo: "https://cdn.iconscout.com/icon/free/png-256/free-git-2821817-2341236.png",
        isFree: false,
    },
] as const;

interface CoursesListProps {
    direction?: string;
    searchQuery?: string;
}

const ITEMS_PER_PAGE = 6;

export const CoursesList = ({ direction, searchQuery }: CoursesListProps) => {
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

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
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
