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
    "Cybersecurity",
    "3D Modeling",
    "Databases",
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
    {
        id: "8",
        title: "Node.js Backend Разработка",
        author: "Максим Чернов",
        level: "intermediate",
        direction: "Backend",
        duration: "52h",
        description:
            "Создавайте масштабируемые веб-приложения с использованием Node.js, Express и MongoDB.",
        price: {
            current: 6900,
            old: 8900,
        },
        tags: ["Node.js", "Express", "Backend"],
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        isFree: false,
    },
    {
        id: "9",
        title: "Django для веб-разработки",
        author: "Елена Васильева",
        level: "intermediate",
        direction: "Backend",
        duration: "48h",
        description:
            "Разработка веб-приложений на Python с использованием Django framework.",
        price: {
            current: 5900,
        },
        tags: ["Python", "Django", "Backend"],
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
        isFree: false,
    },
    {
        id: "10",
        title: "Flutter Mobile Development",
        author: "Андрей Козлов",
        level: "intermediate",
        direction: "Mobile",
        duration: "60h",
        description:
            "Создавайте кроссплатформенные мобильные приложения с Flutter и Dart.",
        price: {
            current: 7900,
        },
        tags: ["Flutter", "Dart", "Mobile"],
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
        isFree: false,
    },
    {
        id: "11",
        title: "PostgreSQL Мастер-класс",
        author: "Ольга Новикова",
        level: "advanced",
        direction: "Databases",
        duration: "36h",
        description:
            "Глубокое погружение в PostgreSQL: оптимизация, масштабирование и администрирование.",
        price: {
            current: 5900,
        },
        tags: ["PostgreSQL", "Databases", "SQL"],
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        isFree: false,
    },
    {
        id: "12",
        title: "Автоматизация тестирования",
        author: "Сергей Белов",
        level: "intermediate",
        direction: "QA",
        duration: "44h",
        description:
            "Изучите автоматизированное тестирование с Selenium, TestNG и Jenkins.",
        price: {
            current: 4900,
        },
        tags: ["QA", "Selenium", "Testing"],
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
        isFree: false,
    },
    {
        id: "13",
        title: "Кибербезопасность: Основы",
        author: "Николай Морозов",
        level: "beginner",
        direction: "Cybersecurity",
        duration: "50h",
        description:
            "Изучите основы информационной безопасности и этичного хакинга.",
        price: {
            current: 6900,
        },
        tags: ["Security", "Ethical Hacking", "Network"],
        logo: "/icons/security.svg",
        isFree: false,
    },
    {
        id: "14",
        title: "3D моделирование в Blender",
        author: "Марина Светлова",
        level: "beginner",
        direction: "3D Modeling",
        duration: "56h",
        description: "Создавайте 3D модели и анимации с нуля в Blender.",
        price: {
            current: 5900,
        },
        tags: ["3D", "Blender", "Animation"],
        logo: "/icons/blender.svg",
        isFree: false,
    },
    {
        id: "15",
        title: "Unreal Engine Game Development",
        author: "Виктор Громов",
        level: "intermediate",
        direction: "Game Dev",
        duration: "70h",
        description:
            "Разработка игр на Unreal Engine 5 с использованием Blueprint и C++.",
        price: {
            current: 8900,
        },
        tags: ["Game Dev", "Unreal Engine", "C++"],
        logo: "/icons/unreal.svg",
        isFree: false,
    },
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
