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
        title: "Фронтенд-разработчик",
        description:
            "Научитесь создавать современные веб-приложения с нуля. В программе: HTML5, CSS3, JavaScript, React, TypeScript и многое другое. Вы освоите актуальные инструменты разработки и научитесь создавать адаптивные интерфейсы.",
        duration: "9 месяцев",
        hasEmployment: true,
        image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4",
        author: {
            id: "a1",
            name: "Топчей Лев",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            position: "Senior Frontend Developer",
        },
        price: 60000,
        rating: 4.8,
        studentsCount: 2400,
    },
    {
        id: "2",
        title: "Финансовый аналитик",
        description: "Освойте анализ данных и финансовое моделирование",
        duration: "7 месяцев",
        hasEmployment: true,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        author: {
            id: "a2",
            name: "Сергей Иванов",
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
            position: "Financial Analyst",
        },
        price: 55000,
        rating: 4.9,
        studentsCount: 1800,
    },
    {
        id: "3",
        title: "Python разработчик",
        description: "Станьте профессиональным Python разработчиком",
        duration: "8 месяцев",
        hasEmployment: true,
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        author: {
            id: "a3",
            name: "Анна Петрова",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            position: "Lead Python Developer",
        },
        price: 58000,
        rating: 4.7,
        studentsCount: 2100,
    },
    {
        id: "4",
        title: "Data Science специалист",
        description: "Изучите анализ данных и машинное обучение",
        duration: "10 месяцев",
        hasEmployment: true,
        image: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2",
        author: {
            id: "a4",
            name: "Михаил Смирнов",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            position: "Data Science Expert",
        },
        price: 65000,
        rating: 4.9,
        studentsCount: 1500,
    },
    {
        id: "5",
        title: "UI/UX дизайнер",
        description: "Создавайте привлекательные и удобные интерфейсы",
        duration: "6 месяцев",
        hasEmployment: true,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
        author: {
            id: "a5",
            name: "Елена Козлова",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            position: "Senior UI/UX Designer",
        },
        price: 52000,
        rating: 4.8,
        studentsCount: 2200,
    },
    {
        id: "6",
        title: "DevOps инженер",
        description: "Автоматизируйте процессы разработки и развертывания",
        duration: "8 месяцев",
        hasEmployment: true,
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9",
        author: {
            id: "a6",
            name: "Дмитрий Волков",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            position: "DevOps Engineer",
        },
        price: 62000,
        rating: 4.7,
        studentsCount: 1700,
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
