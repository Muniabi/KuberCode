export interface Author {
    id: string;
    name: string;
    avatar: string;
    position: string;
}

export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseStatus = "not_started" | "in_progress" | "completed";

// Тип для модуля курса
export interface CourseModule {
    id: string;
    title: string;
    description: string;
    duration: string;
    lessons: CourseLesson[];
    isCompleted?: boolean;
}

// Тип для урока
export interface CourseLesson {
    id: string;
    title: string;
    duration: string;
    type: "video" | "article" | "quiz";
    isCompleted?: boolean;
}

// Тип для отзыва
export interface CourseReview {
    id: string;
    userId: string;
    courseId: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
        name: string;
        avatar: string;
    };
    helpful: number;
}

// Тип для прогресса обучения
export interface CourseProgress {
    courseId: string;
    userId: string;
    status: CourseStatus;
    completedLessons: string[]; // ID завершенных уроков
    completedModules: string[]; // ID завершенных модулей
    lastAccessedLesson: string;
    totalProgress: number; // Процент завершения
    startedAt: string;
    lastAccessedAt: string;
    completed?: number; // Добавлено свойство для количества завершенных уроков
    total: number;
}

// Расширенный тип курса
export interface Course {
    id: string;
    title: string;
    author: {
        name: string;
        role: string;
        avatar: string;
        bio?: string;
        socialLinks?: {
            website?: string;
            github?: string;
            twitter?: string;
            linkedin?: string;
        };
    };
    level: CourseLevel;
    direction: string;
    duration: string;
    description: string;
    price: {
        current: number;
        old?: number;
    };
    tags: string[];
    logo?: string;
    image: string;
    isFree: boolean;
    hasEmployment: boolean;
    rating: {
        value: number; // Рейтинг
        count: number; // Количество отзывов
    };
    studentsCount: number;
    completionRate: number;
    isPopular: boolean;
    modules?: CourseModule[];
    skills?: string[];
    requirements?: string[];
    features?: string[];
    certificate?: {
        available: boolean;
        previewUrl?: string;
    };
    updatedAt: string;
    language: string;
}

export interface CourseResponse {
    courses: Course[];
    total: number;
}

export interface Exercise {
    id: string;
    conceptId: string;
    languageId: string;
    title: string;
    description: string;
    type: "practice" | "theory";
    theory?: string;
    solution?: string;
    hints?: string[];
    initialCode?: string;
    tests?: {
        input: any[];
        expected: any;
    }[];
}
