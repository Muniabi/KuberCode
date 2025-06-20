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
    X,
} from "lucide-react";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LANGUAGES, type Language } from "./data/languages";

const CATEGORIES = [
    { id: "all", label: "Все", icon: Code2, count: 12 },
    { id: "backend", label: "Backend", icon: Database, count: 6 },
    { id: "frontend", label: "Frontend", icon: Globe, count: 4 },
    { id: "mobile", label: "Mobile", icon: Smartphone, count: 2 },
    { id: "devops", label: "DevOps", icon: Cloud, count: 3 },
];

export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [displayedQuery, setDisplayedQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    const placeholders = [
        "Поиск по языкам программирования...",
        "Например: Python для начинающих...",
        "Или: JavaScript разработка...",
    ];

    // Placeholder animation
    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Search suggestions based on input
    const updateSuggestions = (value: string) => {
        if (!value.trim()) {
            setSearchSuggestions([]);
            return;
        }

        const suggestions = LANGUAGES.filter((lang) => {
            const searchStr = value.toLowerCase();
            return (
                lang.name.toLowerCase().includes(searchStr) ||
                lang.desc.toLowerCase().includes(searchStr) ||
                lang.tags.some((tag) => tag.toLowerCase().includes(searchStr))
            );
        })
            .map((lang) => lang.name)
            .slice(0, 5);

        setSearchSuggestions(suggestions);
    };

    // Handle search input
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        updateSuggestions(value);
    };

    // Handle search submission
    const handleSearch = (query: string) => {
        setDisplayedQuery(query);
        setSearchQuery(query);
        setSearchSuggestions([]);
        searchInputRef.current?.focus();
    };

    // Handle keyboard events
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch(searchQuery);
        }
    };

    // Filter languages based on search and category
    const filteredLanguages = LANGUAGES.filter((lang) => {
        const matchesSearch =
            !displayedQuery ||
            lang.name.toLowerCase().includes(displayedQuery.toLowerCase()) ||
            lang.desc.toLowerCase().includes(displayedQuery.toLowerCase()) ||
            lang.tags.some((tag) =>
                tag.toLowerCase().includes(displayedQuery.toLowerCase())
            );

        const matchesCategory =
            selectedCategory === "all" || lang.tags.includes(selectedCategory);

        return matchesSearch && matchesCategory;
    });

    const handleLanguageClick = (langId: string) => {
        router.push(`/courses/${langId}`);
    };

    return (
        <div className="relative min-h-screen w-full bg-white dark:bg-[--bg-color-dark] overflow-x-hidden">
            {/* Dot Pattern Background */}
            <div className="absolute inset-0 opacity-5 dark:opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(var(--dot-color, #000) 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                    }}
                />
            </div>

            {/* Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-[--purple]/20 dark:to-[--button-bg]/20 rounded-full blur-3xl" />
                <div className="absolute top-1/3 -left-40 w-96 h-96 bg-gradient-to-br from-lime-400/10 to-yellow-400/10 dark:from-[--lime]/10 dark:to-[--yellow]/10 rounded-full blur-3xl" />
            </div>

            <Container className="relative z-10 py-6 lg:py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4 lg:gap-6 mb-6 lg:mb-8"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
                        {/* Search */}
                        <div className="flex-1 w-full lg:max-w-md relative order-2 lg:order-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-[--text-secondary] transition-colors group-hover:text-gray-800 dark:group-hover:text-[--text-color] pointer-events-none" />
                                <Input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder={placeholders[placeholderIndex]}
                                    value={searchQuery}
                                    onChange={handleSearchInput}
                                    onKeyDown={handleKeyDown}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => {
                                        setTimeout(
                                            () => setIsFocused(false),
                                            200
                                        );
                                    }}
                                    className="w-full bg-white dark:bg-[--card-bg]/50 hover:bg-gray-50 dark:hover:bg-[--card-bg] focus:bg-white dark:focus:bg-[--card-bg] text-gray-900 dark:text-[--text-color] pl-10 pr-10 py-2 border border-gray-200 dark:border-transparent rounded-lg transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-purple-500 dark:focus-visible:ring-[--purple]/30 placeholder:text-gray-500 dark:placeholder:text-[--text-secondary]"
                                />
                                {searchQuery && (
                                    <button
                                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 dark:text-[--text-secondary] hover:text-gray-900 dark:hover:text-[--text-color] flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
                                        onClick={() => {
                                            setSearchQuery("");
                                            setDisplayedQuery("");
                                            setSearchSuggestions([]);
                                            searchInputRef.current?.focus();
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            {/* Search Suggestions */}
                            {isFocused && searchSuggestions.length > 0 && (
                                <div className="absolute w-full mt-1 rounded-md border border-gray-200 dark:border-[--card-bg] bg-white dark:bg-[--card-bg] shadow-lg z-50">
                                    <Command className="bg-transparent">
                                        <CommandList>
                                            <CommandGroup>
                                                {searchSuggestions.map(
                                                    (suggestion) => (
                                                        <CommandItem
                                                            key={suggestion}
                                                            onSelect={() => {
                                                                handleSearch(
                                                                    suggestion
                                                                );
                                                            }}
                                                            className="py-2 text-gray-600 dark:text-[--text-secondary] hover:bg-gray-100 dark:hover:bg-[--card-hover] hover:text-gray-900 dark:hover:text-[--text-color] cursor-pointer"
                                                        >
                                                            <Search className="w-4 h-4 mr-2 text-gray-400 dark:text-[--text-secondary]" />
                                                            {suggestion}
                                                        </CommandItem>
                                                    )
                                                )}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-row sm:items-center justify-between gap-4 order-1 lg:order-2">
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-[--text-color]">
                                Языки программирования
                            </h1>
                            <button
                                onClick={() =>
                                    setViewMode(
                                        viewMode === "list" ? "grid" : "list"
                                    )
                                }
                                className="p-2 rounded-md text-gray-500 dark:text-[--text-secondary] hover:text-gray-900 dark:hover:text-[--text-color] hover:bg-gray-100 dark:hover:bg-[--card-bg]/50"
                            >
                                {viewMode === "list" ? (
                                    <LayoutGrid className="w-5 h-5" />
                                ) : (
                                    <LayoutList className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-6 lg:-mx-8 px-6 lg:px-8">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                className={cn(
                                    "transition-all duration-300 flex items-center gap-2 shrink-0 text-sm lg:text-base px-4 py-2 rounded-lg font-medium",
                                    selectedCategory === category.id
                                        ? "bg-gradient-to-r from-[--purple] to-[--button-bg] text-white shadow-lg shadow-[--purple]/25"
                                        : "text-gray-600 dark:text-[--text-secondary] hover:text-gray-900 dark:hover:text-[--text-color] bg-gray-100/50 hover:bg-gray-100 dark:bg-transparent dark:hover:bg-[--card-bg]/50"
                                )}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                <category.icon className="w-4 h-4" />
                                <span>{category.label}</span>
                                <span className="px-1.5 py-0.5 rounded-md bg-black/10 dark:bg-black/30 text-xs">
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>

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
                                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
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
                                    <Link
                                        href={`/courses/${lang.id}`}
                                        className="block"
                                    >
                                        <Card className="group bg-white dark:bg-[--card-bg] hover:bg-gray-50/80 dark:hover:bg-[--card-hover] border border-gray-200/80 dark:border-transparent p-4 transition-all duration-300 relative overflow-hidden cursor-pointer">
                                            <div className="absolute inset-0 bg-gradient-to-r from-gray-50/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 relative">
                                                {/* Icon */}
                                                <div
                                                    className={cn(
                                                        "w-full sm:w-48 h-32 rounded-xl flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300",
                                                        lang.color
                                                    )}
                                                >
                                                    <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <span className="text-white text-4xl font-bold relative z-10">
                                                        {lang.icon}
                                                    </span>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0 w-full">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            {lang.status && (
                                                                <div className="relative inline-block">
                                                                    <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-yellow-400 dark:from-[--lime] dark:to-[--yellow] rounded-lg blur opacity-50" />
                                                                    <span className="relative inline-block px-3 py-1 bg-gradient-to-r from-lime-400 to-yellow-400 dark:from-[--lime] dark:to-[--yellow] rounded-lg text-gray-900 dark:text-[--bg-color] text-xs font-medium mb-2">
                                                                        {
                                                                            lang.status
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-[--text-color] mb-1 group-hover:text-purple-600 dark:group-hover:text-[--lime] transition-colors">
                                                                {lang.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 dark:text-[--text-secondary] mb-4 max-w-xl group-hover:text-gray-800 dark:group-hover:text-[--text-color] transition-colors">
                                                                {lang.desc}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Bottom row */}
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                        <div className="flex flex-wrap gap-2">
                                                            {lang.tags.map(
                                                                (tag) => (
                                                                    <span
                                                                        key={
                                                                            tag
                                                                        }
                                                                        className="px-3 py-1 bg-gray-100 dark:bg-black/10 rounded-lg text-gray-600 dark:text-[--text-secondary] text-sm group-hover:bg-gray-200 dark:group-hover:bg-black/20 transition-colors"
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                        <Button
                                                            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-[--purple] dark:hover:bg-[--button-bg] text-white"
                                                            aria-label={`Начать обучение ${lang.name}`}
                                                        >
                                                            <span className="mr-2">
                                                                Начать обучение
                                                            </span>
                                                            <ArrowRight className="w-5 h-5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ) : (
                                    // Grid View
                                    <Link
                                        href={`/courses/${lang.id}`}
                                        className="block"
                                    >
                                        <Card className="group bg-white dark:bg-[--card-bg] hover:bg-gray-50/80 dark:hover:bg-[--card-hover] border border-gray-200/80 dark:border-transparent p-4 lg:p-6 transition-all duration-300 relative overflow-hidden aspect-square flex flex-col cursor-pointer">
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                            {/* Header */}
                                            <div className="flex items-start justify-between mb-4 lg:mb-6">
                                                <div
                                                    className={cn(
                                                        "w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center relative",
                                                        lang.color
                                                    )}
                                                >
                                                    <span className="text-white text-xl lg:text-2xl font-bold">
                                                        {lang.icon}
                                                    </span>
                                                </div>
                                                {lang.status && (
                                                    <span className="px-2 lg:px-3 py-1 bg-gradient-to-r from-lime-400 to-yellow-400 dark:from-[--lime] dark:to-[--yellow] rounded-lg text-gray-900 dark:text-[--bg-color] text-xs font-medium">
                                                        {lang.status}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-[--text-color] mb-2 group-hover:text-purple-600 dark:group-hover:text-[--lime] transition-colors">
                                                    {lang.name}
                                                </h3>
                                                <p className="text-xs lg:text-sm text-gray-600 dark:text-[--text-secondary] mb-4 line-clamp-2 group-hover:text-gray-800 dark:group-hover:text-[--text-color] transition-colors">
                                                    {lang.desc}
                                                </p>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-4 lg:mb-6">
                                                <div className="flex flex-col items-center p-2 rounded-lg bg-gray-100 dark:bg-black/10">
                                                    <Users className="w-3 h-3 lg:w-4 lg:h-4 text-[--yellow] mb-1" />
                                                    <span className="text-[10px] lg:text-xs text-gray-600 dark:text-[--text-secondary]">
                                                        {lang.stats.students}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-center p-2 rounded-lg bg-gray-100 dark:bg-black/10">
                                                    <Timer className="w-3 h-3 lg:w-4 lg:h-4 text-[--lime] mb-1" />
                                                    <span className="text-[10px] lg:text-xs text-gray-600 dark:text-[--text-secondary]">
                                                        {lang.stats.hours}ч
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-center p-2 rounded-lg bg-gray-100 dark:bg-black/10">
                                                    <BookOpen className="w-3 h-3 lg:w-4 lg:h-4 text-[--purple] mb-1" />
                                                    <span className="text-[10px] lg:text-xs text-gray-600 dark:text-[--text-secondary]">
                                                        {lang.stats.modules}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Tags and Button */}
                                            <div className="mt-auto">
                                                <div className="flex flex-wrap gap-1 lg:gap-2 mb-3 lg:mb-4">
                                                    {lang.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-1 bg-gray-100 dark:bg-black/10 rounded-lg text-gray-600 dark:text-[--text-secondary] text-[10px] lg:text-xs"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-[--purple] dark:hover:bg-[--button-bg] text-white text-xs lg:text-sm">
                                                    Начать обучение
                                                    <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 ml-2" />
                                                </Button>
                                            </div>
                                        </Card>
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </Container>
        </div>
    );
}
