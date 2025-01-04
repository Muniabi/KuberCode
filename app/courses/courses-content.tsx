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

    const handleButtonClick = (direction: string) => {
        localStorage.setItem("direction", direction);
        setActiveFilter(direction);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-black">
            <Container className="px-4 sm:px-9 py-16">
                {/* Хлебные крошки и заголовок */}
                <div className="flex flex-col gap-6 max-w-3xl mb-12">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/">
                                    Главная
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Все курсы</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <h1 className="text-4xl sm:text-5xl font-bold">
                        Выберите направление <br />
                        для развития
                    </h1>
                </div>

                {/* Поиск и создание курса */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
                    <div className="relative flex-1 max-w-2xl">
                        <Input
                            placeholder="Какой курс вы ищете?"
                            className="pl-12 py-6 text-base bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <Link href="/create">
                        <Button size="lg" className="w-full sm:w-auto">
                            Создать курс
                        </Button>
                    </Link>
                </div>

                {/* Фильтры по направлениям */}
                <div className="flex flex-wrap gap-3">
                    {directions.map((direction) => (
                        <Button
                            variant={
                                activeFilter === direction.name
                                    ? "default"
                                    : "outline"
                            }
                            key={direction.name}
                            onClick={() => handleButtonClick(direction.name)}
                            className="rounded-full group relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-800"
                        >
                            <span>{direction.name}</span>
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                {direction.count}
                            </span>
                            {direction.isPopular && (
                                <Badge
                                    variant="secondary"
                                    className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-white dark:bg-zinc-800"
                                >
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Популярно
                                </Badge>
                            )}
                            {direction.isNew && (
                                <Badge
                                    variant="secondary"
                                    className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-white dark:bg-zinc-800"
                                >
                                    Новое
                                </Badge>
                            )}
                        </Button>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default CoursesContent;
