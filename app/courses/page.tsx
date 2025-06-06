"use client";

import { Container } from "@/components/shared";
import { Card } from "@/components/ui/card";
import {
    ArrowRight,
    Search,
    Settings2,
    Code2,
    Globe,
    Smartphone,
    Database,
    Cloud,
    LayoutGrid,
    LayoutList,
    Users,
    Timer,
    BookOpen,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface LanguageStats {
    students: number;
    hours: number;
    modules: number;
}

interface Language {
    id: string;
    name: string;
    icon: string;
    desc: string;
    tags: string[];
    color: string;
    status?: string;
    stats: LanguageStats;
}

const CATEGORIES = [
    { id: "all", label: "Все", icon: Code2, count: 12 },
    { id: "backend", label: "Backend", icon: Database, count: 6 },
    { id: "frontend", label: "Frontend", icon: Globe, count: 4 },
    { id: "mobile", label: "Mobile", icon: Smartphone, count: 2 },
    { id: "devops", label: "DevOps", icon: Cloud, count: 3 },
];

const LANGUAGES: Language[] = [
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

export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
    const [placeholderText, setPlaceholderText] = useState("Поиск...");
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");

    // Анимированный placeholder
    const placeholders = [
        "Поиск языка программирования...",
        "Например, Python...",
        "Или JavaScript...",
        "Может быть, React?",
    ];

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % placeholders.length;
            setPlaceholderText(placeholders[currentIndex]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Генерация подсказок на основе поискового запроса
    useEffect(() => {
        if (searchQuery.length > 0) {
            const suggestions = LANGUAGES.filter(
                (lang) =>
                    lang.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    lang.desc
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    lang.tags.some((tag) =>
                        tag.toLowerCase().includes(searchQuery.toLowerCase())
                    )
            ).map((lang) => lang.name);
            setSearchSuggestions(suggestions);
            setIsSearchOpen(true);
        } else {
            setSearchSuggestions([]);
            setIsSearchOpen(false);
        }
    }, [searchQuery]);

    const filteredLanguages = LANGUAGES.filter((lang) => {
        const matchesCategory =
            selectedCategory === "all" || lang.tags.includes(selectedCategory);
        const matchesSearch =
            searchQuery === "" ||
            lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lang.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="relative min-h-screen w-full bg-[--bg-color-dark] overflow-x-hidden">
            {/* Dot Pattern Background */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                    }}
                />
            </div>

            {/* Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[--purple]/20 to-[--button-bg]/20 rounded-full blur-3xl" />
                <div className="absolute top-1/3 -left-40 w-96 h-96 bg-gradient-to-br from-[--lime]/10 to-[--yellow]/10 rounded-full blur-3xl" />
            </div>

            <Container className="relative z-10 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-6 mb-10"
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-white">
                            Языки программирования
                        </h1>
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                    setViewMode(
                                        viewMode === "list" ? "grid" : "list"
                                    )
                                }
                                className="text-gray-400 hover:text-white hover:bg-[--bg-gray]"
                            >
                                {viewMode === "list" ? (
                                    <LayoutGrid className="w-5 h-5" />
                                ) : (
                                    <LayoutList className="w-5 h-5" />
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white hover:bg-[--bg-gray]"
                            >
                                <Settings2 className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="flex w-full max-w-3xl mx-auto">
                        <Popover
                            open={isSearchOpen}
                            onOpenChange={setIsSearchOpen}
                        >
                            <PopoverTrigger asChild>
                                <div className="relative w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <Input
                                        type="text"
                                        placeholder={placeholderText}
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full bg-[--bg-gray] text-white pl-10 pr-4 py-2 border-none focus-visible:ring-[--purple]/50"
                                    />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-full max-w-3xl p-0 bg-[--bg-gray] border-none shadow-lg"
                                align="center"
                            >
                                <Command className="bg-transparent">
                                    <CommandList>
                                        <CommandEmpty className="py-2 text-sm text-gray-400">
                                            Ничего не найдено
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {searchSuggestions.map(
                                                (suggestion) => (
                                                    <CommandItem
                                                        key={suggestion}
                                                        onSelect={() => {
                                                            setSearchQuery(
                                                                suggestion
                                                            );
                                                            setIsSearchOpen(
                                                                false
                                                            );
                                                        }}
                                                        className="py-2 text-gray-300 hover:bg-[--bg-gray] cursor-pointer"
                                                    >
                                                        <Search className="w-4 h-4 mr-2" />
                                                        {suggestion}
                                                    </CommandItem>
                                                )
                                            )}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </motion.div>

                {/* Categories */}
                <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
                    {CATEGORIES.map((category) => (
                        <Button
                            key={category.id}
                            variant={
                                selectedCategory === category.id
                                    ? "default"
                                    : "ghost"
                            }
                            className={cn(
                                "transition-all duration-300 flex items-center gap-2",
                                selectedCategory === category.id
                                    ? "bg-gradient-to-r from-[--purple] to-[--button-bg] text-white shadow-lg shadow-[--purple]/25"
                                    : "text-gray-400 hover:text-white hover:bg-[--bg-gray]"
                            )}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            <category.icon className="w-4 h-4" />
                            <span>{category.label}</span>
                            <span className="px-1.5 py-0.5 rounded-md bg-black/30 text-xs">
                                {category.count}
                            </span>
                        </Button>
                    ))}
                </div>

                {/* Language Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={viewMode}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={cn(
                            viewMode === "list"
                                ? "space-y-4"
                                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        )}
                    >
                        {filteredLanguages.map((lang) => (
                            <motion.div
                                key={lang.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {viewMode === "list" ? (
                                    // List View
                                    <Card className="group bg-[--bg-gray] hover:bg-[#4d4d4d] border-none p-4 transition-all duration-300 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="flex items-start gap-6 relative">
                                            {/* Icon */}
                                            <div
                                                className={cn(
                                                    "w-48 h-32 rounded-xl flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300",
                                                    lang.color
                                                )}
                                            >
                                                <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <span className="text-white text-4xl font-bold relative z-10">
                                                    {lang.icon}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        {lang.status && (
                                                            <div className="relative inline-block">
                                                                <div className="absolute inset-0 bg-gradient-to-r from-[--lime] to-[--yellow] rounded-lg blur opacity-50" />
                                                                <span className="relative inline-block px-3 py-1 bg-gradient-to-r from-[--lime] to-[--yellow] rounded-lg text-[--bg-color-dark] text-xs font-medium mb-2">
                                                                    {
                                                                        lang.status
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-[--lime] transition-colors">
                                                            {lang.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-400 mb-4 max-w-xl group-hover:text-gray-300 transition-colors">
                                                            {lang.desc}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Bottom row */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex gap-2">
                                                        {lang.tags.map(
                                                            (tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="px-3 py-1 bg-black/30 rounded-lg text-gray-300 text-sm group-hover:bg-black/40 transition-colors"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                    <Button
                                                        size="icon"
                                                        className="bg-[--purple] hover:bg-[--button-bg] text-white"
                                                        aria-label={`Выбрать ${lang.name}`}
                                                    >
                                                        <ArrowRight className="w-5 h-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ) : (
                                    // Grid View
                                    <Card className="group bg-[--bg-gray] hover:bg-[#4d4d4d] border-none p-6 transition-all duration-300 relative overflow-hidden aspect-square flex flex-col">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-6">
                                            <div
                                                className={cn(
                                                    "w-16 h-16 rounded-2xl flex items-center justify-center relative",
                                                    lang.color
                                                )}
                                            >
                                                <span className="text-white text-2xl font-bold">
                                                    {lang.icon}
                                                </span>
                                            </div>
                                            {lang.status && (
                                                <span className="px-3 py-1 bg-gradient-to-r from-[--lime] to-[--yellow] rounded-lg text-[--bg-color-dark] text-xs font-medium">
                                                    {lang.status}
                                                </span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[--lime] transition-colors">
                                                {lang.name}
                                            </h3>
                                            <p className="text-sm text-gray-400 mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">
                                                {lang.desc}
                                            </p>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            <div className="flex flex-col items-center p-2 rounded-lg bg-black/20">
                                                <Users className="w-4 h-4 text-[--yellow] mb-1" />
                                                <span className="text-xs text-gray-400">
                                                    {lang.stats.students}
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center p-2 rounded-lg bg-black/20">
                                                <Timer className="w-4 h-4 text-[--lime] mb-1" />
                                                <span className="text-xs text-gray-400">
                                                    {lang.stats.hours}ч
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center p-2 rounded-lg bg-black/20">
                                                <BookOpen className="w-4 h-4 text-[--purple] mb-1" />
                                                <span className="text-xs text-gray-400">
                                                    {lang.stats.modules}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Tags and Button */}
                                        <div className="mt-auto">
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {lang.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-1 bg-black/30 rounded-lg text-gray-300 text-xs"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <Button className="w-full bg-[--purple] hover:bg-[--button-bg] text-white">
                                                Выбрать курс
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </Card>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </Container>
        </div>
    );
}
