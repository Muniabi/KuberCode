export interface Author {
    id: string;
    name: string;
    role: string;
    avatar: string;
    bio: string;
}

export interface Resource {
    id: string;
    title: string;
    type: "article" | "video" | "documentation";
    url: string;
    duration?: number;
}

export interface Hint {
    id: string;
    content: string;
    unlockAfter?: number; // minutes after starting
}

export interface Exercise {
    id: string;
    title: string;
    description: string;
    type: "tutorial" | "practice";
    status: "completed" | "available" | "locked" | "in_progress";
    duration: number;
    dependencies: string[]; // IDs of exercises that must be completed first
    hints: Hint[];
    resources: Resource[];
    author: Author;
    theory: string;
}

export const AUTHORS: Record<string, Author> = {
    "john-doe": {
        id: "john-doe",
        name: "Джон Доу",
        role: "Senior Developer",
        avatar: "JD",
        bio: "10+ лет опыта в разработке. Специализация на алгоритмах и структурах данных.",
    },
    "jane-smith": {
        id: "jane-smith",
        name: "Джейн Смит",
        role: "Tech Lead",
        avatar: "JS",
        bio: "Full-stack разработчик с фокусом на архитектуре приложений.",
    },
};

export const EXERCISES: Record<string, Exercise[]> = {
    basics: [
        {
            id: "hello-world",
            title: "Hello World",
            description:
                "Классическое введение в программирование. Напишите свою первую программу!",
            type: "tutorial",
            status: "available",
            duration: 15,
            dependencies: [],
            hints: [
                {
                    id: "h1",
                    content: "Не забудьте про точку с запятой в конце строки",
                    unlockAfter: 5,
                },
                {
                    id: "h2",
                    content: "Функция print используется для вывода в консоль",
                    unlockAfter: 10,
                },
            ],
            resources: [
                {
                    id: "r1",
                    title: "Введение в программирование",
                    type: "article",
                    url: "#",
                    duration: 10,
                },
                {
                    id: "r2",
                    title: "Видео урок: Первая программа",
                    type: "video",
                    url: "#",
                    duration: 15,
                },
            ],
            author: AUTHORS["john-doe"],
            theory: `# Введение в программирование

Программирование начинается с простых шагов. Традиционно, первой программой, которую пишет каждый программист, является "Hello, World!".

## Что такое "Hello, World!"?
"Hello, World!" - это простая программа, которая выводит текст на экран. Она служит для:
- Проверки работоспособности среды разработки
- Знакомства с базовым синтаксисом языка
- Понимания концепции вывода данных

## Почему это важно?
1. Простота: минимум кода для получения результата
2. Универсальность: работает на всех языках программирования
3. Традиция: объединяет программистов по всему миру

## Базовые концепции
- **Функции вывода**: команды для отображения текста
- **Строки**: последовательности символов в кавычках
- **Синтаксис**: правила написания кода`,
        },
        // ... другие упражнения ...
    ],
};
