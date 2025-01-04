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

// Моковые данные для тестирования
const mockCourses: Course[] = [
    {
        id: "1",
        title: "Frontend разработчик",
        description:
            "Научитесь создавать современные веб-приложения с использованием React, Next.js и других современных технологий. Курс включает практические проекты и работу с реальными задачами.",
        duration: "6 месяцев",
        hasEmployment: true,
        image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613",
        author: {
            name: "Иван Иванов",
            role: "Senior Frontend Developer",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        },
        rating: 4.8,
        studentsCount: 2500,
        completionRate: 94,
        price: 45000,
    },
    {
        id: "2",
        title: "Backend разработчик",
        description:
            "Освойте серверную разработку с использованием Node.js, Express и базами данных. Научитесь создавать масштабируемые и безопасные API для веб-приложений.",
        duration: "7 месяцев",
        hasEmployment: true,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        author: {
            name: "Мария Сидорова",
            role: "Lead Backend Developer",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        },
        rating: 4.9,
        studentsCount: 1800,
        completionRate: 91,
        price: 50000,
    },
    {
        id: "3",
        title: "Python разработчик",
        description:
            "Изучите Python с нуля до профессионального уровня. Курс охватывает основы языка, ООП, работу с данными, веб-разработку на Django и автоматизацию.",
        duration: "8 месяцев",
        hasEmployment: true,
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        author: {
            name: "Анна Петрова",
            role: "Lead Python Developer",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        },
        rating: 4.7,
        studentsCount: 2100,
        completionRate: 89,
        price: 58000,
    },
    {
        id: "4",
        title: "Data Science специалист",
        description:
            "Погрузитесь в мир анализа данных и машинного обучения. Изучите Python, статистику, SQL, библиотеки для анализа данных и построения ML моделей.",
        duration: "10 месяцев",
        hasEmployment: true,
        image: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2",
        author: {
            name: "Михаил Смирнов",
            role: "Data Science Expert",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        },
        rating: 4.9,
        studentsCount: 1500,
        completionRate: 86,
        price: 65000,
    },
    {
        id: "5",
        title: "UI/UX дизайнер",
        description:
            "Научитесь создавать привлекательные и удобные интерфейсы. Освойте принципы дизайна, работу с Figma, прототипирование и пользовательские исследования.",
        duration: "6 месяцев",
        hasEmployment: true,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
        author: {
            name: "Елена Козлова",
            role: "Senior UI/UX Designer",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        },
        rating: 4.8,
        studentsCount: 2200,
        completionRate: 92,
        price: 52000,
    },
];

export const useCoursesStore = create<CoursesStore>((set) => ({
    popularCourses: mockCourses, // Инициализируем store моковыми данными
    isLoading: false,
    error: null,
    setPopularCourses: (courses) => set({ popularCourses: courses }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
}));
