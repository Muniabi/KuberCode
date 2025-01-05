"use client";

import { Container } from "@/components/shared";
import { Button, Input } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Search, Sparkles, Users, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { CoursesList } from "@/components/sections/courses-list";

const directions = [
    {
        name: "Все направления",
        count: 156,
    },
    {
        name: "Программирование",
        count: 42,
        isPopular: true,
    },
    {
        name: "Дизайн",
        count: 28,
        isPopular: true,
    },
    {
        name: "Маркетинг",
        count: 23,
        isPopular: true,
    },
    {
        name: "Управление",
        count: 15,
    },
    {
        name: "Аналитика",
        count: 19,
        isNew: true,
    },
    {
        name: "Тестирование",
        count: 12,
    },
    {
        name: "Безопасность",
        count: 8,
        isNew: true,
    },
    {
        name: "Игры",
        count: 9,
    },
    {
        name: "Мобильная разработка",
        count: 11,
    },
];

const stats = [
    {
        icon: <Users className="w-5 h-5" />,
        label: "Активных студентов",
        value: "12,000+",
    },
    {
        icon: <Clock className="w-5 h-5" />,
        label: "Часов контента",
        value: "2,400+",
    },
    {
        icon: <TrendingUp className="w-5 h-5" />,
        label: "Трудоустроено",
        value: "82%",
    },
];

const CoursesContent = () => {
    const [activeFilter, setActiveFilter] = useState("Все направления");
    const [searchQuery, setSearchQuery] = useState("");

    const handleButtonClick = (direction: string) => {
        localStorage.setItem("direction", direction);
        setActiveFilter(direction);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-black">
            <Container className="px-4 sm:px-9 py-8 sm:py-16">
                {/* Хлебные крошки и заголовок */}
                <div className="flex flex-col gap-4 sm:gap-6 max-w-3xl mb-8 sm:mb-12">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink
                                    href="/"
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                >
                                    Главная
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-gray-900 dark:text-white">
                                    Все курсы
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        Выберите направление <br className="hidden sm:block" />
                        для развития
                    </h1>
                </div>

                {/* Поиск и создание курса */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="relative flex-1 max-w-2xl">
                        <Input
                            placeholder="Какой курс вы ищете?"
                            className="pl-12 py-5 sm:py-6 text-base bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <Link href="/create" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
                        >
                            Создать курс
                        </Button>
                    </Link>
                </div>

                {/* Фильтры по направлениям */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {directions.map((direction) => (
                        <Button
                            variant={
                                activeFilter === direction.name
                                    ? "default"
                                    : "outline"
                            }
                            key={direction.name}
                            onClick={() => handleButtonClick(direction.name)}
                            className={`
                                rounded-full group relative text-sm sm:text-base py-2 px-4
                                ${
                                    activeFilter === direction.name
                                        ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
                                        : "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-800 border-gray-200 dark:border-zinc-700"
                                }
                            `}
                        >
                            <span>{direction.name}</span>
                            <span
                                className={`ml-2 text-xs sm:text-sm ${
                                    activeFilter === direction.name
                                        ? "text-purple-100"
                                        : "text-gray-500 dark:text-gray-400"
                                }`}
                            >
                                {direction.count}
                            </span>
                            {direction.isPopular && (
                                <Badge
                                    variant="secondary"
                                    className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700"
                                >
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Популярно
                                </Badge>
                            )}
                            {direction.isNew && (
                                <Badge
                                    variant="secondary"
                                    className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700"
                                >
                                    Новое
                                </Badge>
                            )}
                        </Button>
                    ))}
                </div>

                {/* Список курсов */}
                <div className="mt-8">
                    <CoursesList
                        direction={
                            activeFilter !== "Все направления"
                                ? activeFilter
                                : undefined
                        }
                        searchQuery={searchQuery}
                    />
                </div>
            </Container>
        </div>
    );
};

export default CoursesContent;
