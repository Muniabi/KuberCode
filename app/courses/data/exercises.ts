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
    initialCode: string;
    language: "js" | "python" | "html" | "cpp";
    solution?: string;
    tests?: {
        input: any[];
        expected: any;
    }[];
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

export const EXERCISES: Exercise[] = [
    {
        id: "js-sum-numbers",
        title: "Сумма двух чисел",
        description:
            "Напишите функцию sum, которая возвращает сумму двух чисел",
        initialCode: `function sum(a, b) {
  // Ваш код здесь
}`,
        solution: `function sum(a, b) {
  return a + b;
}`,
        language: "js",
        tests: [
            { input: [1, 2], expected: 3 },
            { input: [-1, 5], expected: 4 },
            { input: [0, 0], expected: 0 },
            { input: [10, -5], expected: 5 },
            { input: [100, 200], expected: 300 },
        ],
    },
    {
        id: "python-hello",
        title: "Привет, мир!",
        description:
            "Напишите функцию `hello`, которая возвращает строку 'Привет, мир!'",
        initialCode: 'def hello():\n  # Ваш код здесь\n  return ""',
        language: "python",
    },
    {
        id: "html-basic",
        title: "Базовая HTML-страница",
        description:
            'Создайте базовую HTML-структуру с заголовком "Моя первая страница" и параграфом "Привет, HTML!".',
        initialCode:
            "<!DOCTYPE html>\n<html>\n<head>\n  <title></title>\n</head>\n<body>\n\n</body>\n</html>",
        language: "html",
    },
];
