import { create } from "zustand";
import { Course } from "@/types/course";

interface CoursesStore {
    popularCourses: Course[];
    isLoading: boolean;
    error: string | null;
    setPopularCourses: (courses: Course[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

// Определим доступные направления
export const DIRECTIONS = [
    "Все направления",
    "Frontend",
    "Backend",
    "Mobile",
    "Design",
    "DevOps",
    "Data Science",
    "Game Dev",
    "QA",
] as const;

export type Direction = (typeof DIRECTIONS)[number];

// Обновляем моковые данные с добавлением direction
export const MOCK_COURSES = [
    {
        id: "1",
        title: "Mastering Interaction Design",
        author: "Алексей Петров",
        level: "beginner",
        direction: "Design",
        duration: "32h",
        description:
            "Погрузитесь в основы интерактивного дизайна и изучите практические приемы создания удобных интерфейсов.",
        price: {
            current: 3900,
            old: 5900,
        },
        tags: ["UI/UX", "Design", "Interaction"],
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        isFree: false,
    },
    {
        id: "2",
        title: "Python для Data Science",
        author: "Мария Иванова",
        level: "intermediate",
        direction: "Data Science",
        duration: "48h",
        description:
            "Изучите Python для анализа данных, машинного обучения и визуализации.",
        price: {
            current: 4900,
        },
        tags: ["Python", "Data Science", "ML"],
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        isFree: false,
    },
    {
        id: "3",
        title: "Основы JavaScript",
        author: "Дмитрий Сидоров",
        level: "beginner",
        duration: "24h",
        description:
            "Изучите основы JavaScript с нуля и создайте свои первые веб-приложения.",
        price: {
            current: 0,
        },
        tags: ["JavaScript", "Web", "Frontend"],
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        isFree: true,
    },
    {
        id: "4",
        title: "React Advanced",
        author: "Игорь Смирнов",
        level: "advanced",
        duration: "40h",
        description:
            "Продвинутый курс по React, Redux, TypeScript и оптимизации производительности.",
        price: {
            current: 7900,
            old: 9900,
        },
        tags: ["React", "Redux", "TypeScript"],
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        isFree: false,
    },
    {
        id: "5",
        title: "Adobe Photoshop Mastery",
        author: "Анна Королева",
        level: "intermediate",
        duration: "28h",
        description:
            "Освойте профессиональные техники работы в Photoshop для создания впечатляющих изображений.",
        price: {
            current: 4900,
        },
        tags: ["Design", "Photoshop"],
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
        isFree: false,
    },
    {
        id: "6",
        title: "iOS Development with Swift",
        author: "Павел Волков",
        level: "intermediate",
        duration: "56h",
        description:
            "Создавайте приложения для iOS с использованием Swift и SwiftUI.",
        price: {
            current: 8900,
        },
        tags: ["iOS", "Swift", "Mobile"],
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
        isFree: false,
    },
    {
        id: "7",
        title: "DevOps Essential",
        author: "Артем Соколов",
        level: "intermediate",
        duration: "44h",
        description:
            "Изучите основные инструменты и практики DevOps: Docker, Kubernetes, CI/CD.",
        price: {
            current: 6900,
            old: 8900,
        },
        tags: ["DevOps", "Docker", "Kubernetes"],
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        isFree: false,
    },
    // ... добавляю еще 15 курсов с разными технологиями
] as const;

// Определим типы для уровней сложности
export type CourseLevel = "beginner" | "intermediate" | "advanced";

// Создадим маппинг для перевода
export const LEVEL_MAPPING = {
    Начинающий: "beginner",
    Средний: "intermediate",
    Продвинутый: "advanced",
} as const;

// Обратный маппинг для отображения
export const LEVEL_DISPLAY = {
    beginner: "Начинающий",
    intermediate: "Средний",
    advanced: "Продвинутый",
} as const;

export const useCoursesStore = create<CoursesStore>((set) => ({
    popularCourses: MOCK_COURSES, // Инициализируем store моковыми данными
    isLoading: false,
    error: null,
    setPopularCourses: (courses) => set({ popularCourses: courses }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
}));
