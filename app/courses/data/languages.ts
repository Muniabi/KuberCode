export interface Language {
    id: string;
    name: string;
    icon: string;
    desc: string;
    tags: string[];
    color: string;
    status?: string;
    stats: {
        students: number;
        hours: number;
        modules: number;
    };
}

export const LANGUAGES: Language[] = [
    {
        id: "cpp",
        name: "C++",
        icon: "C++",
        desc: "Мощный язык программирования для создания высокопроизводительных приложений",
        tags: ["Backend", "System"],
        color: "bg-gradient-to-br from-[#8948ff] to-[#6b24ff]",
        status: "Актуально",
        stats: {
            students: 12500,
            hours: 120,
            modules: 24,
        },
    },
    {
        id: "js",
        name: "JavaScript",
        icon: "JS",
        desc: "Популярный язык для веб-разработки и создания интерактивных приложений",
        tags: ["Frontend", "Backend"],
        color: "bg-gradient-to-br from-[#f7df1e] to-[#e6c300]",
        status: "Популярный",
        stats: {
            students: 15000,
            hours: 100,
            modules: 20,
        },
    },
    {
        id: "python",
        name: "Python",
        icon: "PY",
        desc: "Универсальный язык для веб-разработки, анализа данных и машинного обучения",
        tags: ["Backend", "Data Science"],
        color: "bg-gradient-to-br from-[#3776ab] to-[#2d5f8e]",
        stats: {
            students: 18000,
            hours: 110,
            modules: 22,
        },
    },
    {
        id: "java",
        name: "Java",
        icon: "JV",
        desc: "Надежный язык для создания корпоративных и Android приложений",
        tags: ["Backend", "Mobile"],
        color: "bg-gradient-to-br from-[#f89820] to-[#e76f00]",
        status: "Проверенный",
        stats: {
            students: 11000,
            hours: 130,
            modules: 26,
        },
    },
    {
        id: "typescript",
        name: "TypeScript",
        icon: "TS",
        desc: "Типизированный JavaScript для создания масштабируемых приложений",
        tags: ["Frontend", "Backend"],
        color: "bg-gradient-to-br from-[#3178c6] to-[#235a97]",
        stats: {
            students: 9000,
            hours: 90,
            modules: 18,
        },
    },
    {
        id: "go",
        name: "Go",
        icon: "GO",
        desc: "Современный язык для создания быстрых и эффективных серверных приложений",
        tags: ["Backend", "System"],
        color: "bg-gradient-to-br from-[#00add8] to-[#007d9c]",
        stats: {
            students: 7500,
            hours: 85,
            modules: 17,
        },
    },
    {
        id: "rust",
        name: "Rust",
        icon: "RS",
        desc: "Системный язык программирования с гарантиями безопасности памяти",
        tags: ["System", "Backend"],
        color: "bg-gradient-to-br from-[#b7410e] to-[#8e3200]",
        status: "Набирающий популярность",
        stats: {
            students: 5000,
            hours: 140,
            modules: 28,
        },
    },
    {
        id: "react",
        name: "React",
        icon: "RE",
        desc: "Популярная библиотека для создания пользовательских интерфейсов",
        tags: ["Frontend", "Mobile"],
        color: "bg-gradient-to-br from-[#61dafb] to-[#00b4d8]",
        stats: {
            students: 14000,
            hours: 80,
            modules: 16,
        },
    },
    {
        id: "vue",
        name: "Vue.js",
        icon: "VU",
        desc: "Прогрессивный фреймворк для создания пользовательских интерфейсов",
        tags: ["Frontend"],
        color: "bg-gradient-to-br from-[#42b883] to-[#347474]",
        status: "Растущий",
        stats: {
            students: 8000,
            hours: 75,
            modules: 15,
        },
    },
    {
        id: "flutter",
        name: "Flutter",
        icon: "FL",
        desc: "Фреймворк от Google для создания кроссплатформенных приложений",
        tags: ["Mobile", "Frontend"],
        color: "bg-gradient-to-br from-[#54c5f8] to-[#0468d7]",
        stats: {
            students: 6500,
            hours: 95,
            modules: 19,
        },
    },
];
