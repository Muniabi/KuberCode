"use client";

import { Container } from "@/components/shared";
import { Card } from "@/components/ui/card";
import { ArrowRight, Search, Settings2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
    "Все",
    "Backend",
    "Frontend",
    "Mobile",
    "Data Science",
    "DevOps",
];

const LANGUAGES = [
    {
        id: "cpp",
        name: "C++",
        icon: "C++",
        desc: "Мощный язык программирования для создания высокопроизводительных приложений",
        tags: ["Backend", "System"],
        color: "bg-[#4361EE]",
        status: "Актуально",
    },
    {
        id: "javascript",
        name: "JavaScript",
        icon: "JS",
        desc: "Разработка современных интерактивных веб-приложений",
        tags: ["Frontend", "Web"],
        color: "bg-[#9C27B0]",
        status: "Актуально",
    },
    {
        id: "python",
        name: "Python",
        icon: "PY",
        desc: "Универсальный язык программирования с широкой областью применения",
        tags: ["Backend", "Data Science"],
        color: "bg-[#00C853]",
        status: "Актуально",
    },
    {
        id: "java",
        name: "Java",
        icon: "JV",
        desc: "Надёжный язык для корпоративной разработки и Android-приложений",
        tags: ["Backend", "Mobile"],
        color: "bg-[#F44336]",
    },
    {
        id: "typescript",
        name: "TypeScript",
        icon: "TS",
        desc: "Типизированный JavaScript для масштабируемых приложений",
        tags: ["Frontend", "Backend"],
        color: "bg-[#007ACC]",
        status: "Актуально",
    },
    {
        id: "go",
        name: "Go",
        icon: "GO",
        desc: "Современный язык для создания быстрых и эффективных серверных приложений",
        tags: ["Backend", "DevOps"],
        color: "bg-[#00ADD8]",
    },
    {
        id: "rust",
        name: "Rust",
        icon: "RS",
        desc: "Системный язык программирования с гарантиями безопасности памяти",
        tags: ["System", "Backend"],
        color: "bg-[#FF4A00]",
    },
    {
        id: "react",
        name: "React",
        icon: "RE",
        desc: "Популярная библиотека для создания пользовательских интерфейсов",
        tags: ["Frontend", "Web"],
        color: "bg-[#61DAFB]",
        status: "Актуально",
    },
    {
        id: "vue",
        name: "Vue.js",
        icon: "VU",
        desc: "Прогрессивный фреймворк для создания современных веб-приложений",
        tags: ["Frontend", "Web"],
        color: "bg-[#42B883]",
    },
    {
        id: "docker",
        name: "Docker",
        icon: "DO",
        desc: "Платформа для разработки, доставки и запуска контейнеризированных приложений",
        tags: ["DevOps", "Tools"],
        color: "bg-[#2496ED]",
        status: "Актуально",
    },
    {
        id: "kubernetes",
        name: "Kubernetes",
        icon: "K8s",
        desc: "Система оркестрации контейнеров для управления распределёнными приложениями",
        tags: ["DevOps", "Cloud"],
        color: "bg-[#326CE5]",
    },
    {
        id: "flutter",
        name: "Flutter",
        icon: "FL",
        desc: "Фреймворк для разработки кроссплатформенных мобильных приложений",
        tags: ["Mobile", "Frontend"],
        color: "bg-[#02569B]",
        status: "Актуально",
    },
];

export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = useState("Все");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredLanguages = LANGUAGES.filter((lang) => {
        const matchesCategory =
            selectedCategory === "Все" || lang.tags.includes(selectedCategory);
        const matchesSearch =
            searchQuery === "" ||
            lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lang.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen w-full bg-[#121212]">
            <Container className="py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-white">
                        Языки программирования
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Поиск"
                                className="bg-[#1E1E1E] text-white pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#4361EE]/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="p-2 hover:bg-[#1E1E1E] rounded-lg transition-colors">
                            <Settings2 className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                                selectedCategory === category
                                    ? "bg-[#4361EE] text-white"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Language Cards */}
                <div className="space-y-4">
                    {filteredLanguages.map((lang) => (
                        <Card
                            key={lang.id}
                            className="bg-[#1E1E1E] border-none p-4 hover:bg-[#252525] transition-colors"
                        >
                            <div className="flex items-start gap-6">
                                {/* Icon */}
                                <div
                                    className={cn(
                                        "w-48 h-32 rounded-xl flex items-center justify-center",
                                        lang.color
                                    )}
                                >
                                    <span className="text-white text-4xl font-bold">
                                        {lang.icon}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            {lang.status && (
                                                <span className="inline-block px-3 py-1 bg-black/30 rounded-lg text-white text-xs mb-2">
                                                    {lang.status}
                                                </span>
                                            )}
                                            <h3 className="text-xl font-semibold text-white mb-1">
                                                {lang.name}
                                            </h3>
                                            <p className="text-sm text-gray-400 mb-4 max-w-xl">
                                                {lang.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom row */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {lang.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-black/30 rounded-lg text-gray-300 text-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <button
                                            className="w-10 h-10 bg-[#4361EE] rounded-lg flex items-center justify-center hover:bg-[#3651DE] transition-colors"
                                            aria-label={`Выбрать ${lang.name}`}
                                        >
                                            <ArrowRight className="w-5 h-5 text-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Container>
        </div>
    );
}
