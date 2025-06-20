export interface Concept {
    id: string;
    languageId: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    exercises: string[];
}

export const CONCEPTS: Concept[] = [
    // JavaScript Concepts
    {
        id: "basics",
        languageId: "js",
        title: "Основы JavaScript",
        description:
            "Изучите базовые концепции JavaScript: переменные, функции, типы данных",
        icon: "🔤",
        color: "bg-gradient-to-br from-[#f7df1e] to-[#e6c300]",
        exercises: ["js-sum-numbers"],
    },
    {
        id: "functions",
        languageId: "js",
        title: "Функции",
        description:
            "Углубленное изучение функций: параметры, возвращаемые значения, области видимости",
        icon: "⚙️",
        color: "bg-gradient-to-br from-[#f7df1e] to-[#e6c300]",
        exercises: [],
    },
    {
        id: "arrays",
        languageId: "js",
        title: "Массивы",
        description: "Работа с массивами: создание, методы, итерация",
        icon: "📋",
        color: "bg-gradient-to-br from-[#f7df1e] to-[#e6c300]",
        exercises: [],
    },

    // Python Concepts
    {
        id: "basics",
        languageId: "python",
        title: "Основы Python",
        description:
            "Изучите базовые концепции Python: переменные, функции, типы данных",
        icon: "🐍",
        color: "bg-gradient-to-br from-[#3776ab] to-[#2d5f8e]",
        exercises: ["python-hello"],
    },

    // HTML Concepts
    {
        id: "basics",
        languageId: "html",
        title: "Основы HTML",
        description: "Изучите базовые теги и структуру HTML-документов",
        icon: "🌐",
        color: "bg-gradient-to-br from-[#e34f26] to-[#c73e1d]",
        exercises: ["html-basic"],
    },

    // C++ Concepts
    {
        id: "basics",
        languageId: "cpp",
        title: "Основы C++",
        description:
            "Изучите базовые концепции C++: переменные, функции, типы данных",
        icon: "⚡",
        color: "bg-gradient-to-br from-[#8948ff] to-[#6b24ff]",
        exercises: [],
    },
];
