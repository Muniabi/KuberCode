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
import {
    Search,
    Sparkles,
    Users,
    Clock,
    TrendingUp,
    Filter,
    SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { CoursesList } from "@/components/sections/courses-list";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MOCK_COURSES, DIRECTIONS } from "@/store/courses";
import { Slider } from "@/components/ui/slider";

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

const SortOptions = () => (
    <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-gray-500" />
        <select className="text-sm border-0 bg-transparent focus:ring-0">
            <option value="popular">По популярности</option>
            <option value="newest">Сначала новые</option>
            <option value="price-asc">По возрастанию цены</option>
            <option value="price-desc">По убыванию цены</option>
        </select>
    </div>
);

const Filters = ({ filters, setFilters, maxPrice }: any) => {
    const handleFilterChange = (category: string, value: string) => {
        setFilters((prev: any) => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter((item: any) => item !== value)
                : [...prev[category], value],
        }));
    };

    const handlePriceChange = (values: number[]) => {
        setFilters((prev: any) => ({
            ...prev,
            price: {
                min: values[0],
                max: values[1],
            },
        }));
    };

    return (
        <div className="space-y-6">
            {/* Уровень сложности */}
            <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">
                    Уровень сложности
                </h4>
                <div className="space-y-2">
                    {["Начинающий", "Средний", "Продвинутый"].map((level) => (
                        <label key={level} className="flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox rounded text-purple-600"
                                checked={filters.level.includes(level)}
                                onChange={() =>
                                    handleFilterChange("level", level)
                                }
                            />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                {level}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Длительность */}
            <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">
                    Длительность
                </h4>
                <div className="space-y-2">
                    {["До 5 часов", "5-20 часов", "Более 20 часов"].map(
                        (duration) => (
                            <label key={duration} className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox rounded text-purple-600"
                                    checked={filters.duration.includes(
                                        duration
                                    )}
                                    onChange={() =>
                                        handleFilterChange("duration", duration)
                                    }
                                />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                    {duration}
                                </span>
                            </label>
                        )
                    )}
                </div>
            </div>

            {/* Стоимость */}
            <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">
                    Стоимость
                </h4>
                <div className="space-y-5">
                    <Slider
                        defaultValue={[filters.price.min, filters.price.max]}
                        max={maxPrice}
                        step={100}
                        minStepsBetweenThumbs={1}
                        onValueChange={handlePriceChange}
                        className="mt-2"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span>
                            {filters.price.min.toLocaleString("ru-RU")} ₽
                        </span>
                        <span>
                            {filters.price.max.toLocaleString("ru-RU")} ₽
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="form-checkbox rounded text-purple-600"
                            checked={
                                filters.price.min === 0 &&
                                filters.price.max === 0
                            }
                            onChange={(e) => {
                                if (e.target.checked) {
                                    handlePriceChange([0, 0]);
                                } else {
                                    handlePriceChange([0, maxPrice]);
                                }
                            }}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            Только бесплатные
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CoursesContent = () => {
    const [activeFilter, setActiveFilter] =
        useState<(typeof DIRECTIONS)[number]>("Все направления");
    const [searchQuery, setSearchQuery] = useState("");
    const maxCoursePrice = Math.max(
        ...MOCK_COURSES.map((course) => course.price.current)
    );
    const [filters, setFilters] = useState({
        level: [] as string[],
        duration: [] as string[],
        price: {
            min: 0,
            max: maxCoursePrice,
        },
    });

    const handleButtonClick = (direction: string) => {
        localStorage.setItem("direction", direction);
        setActiveFilter(direction as any);
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
                    {/* <Link href="/create" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
                        >
                            Создать курс
                        </Button>
                    </Link> */}
                </div>

                {/* Фильтры по направлениям */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => handleButtonClick("Все направления")}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                            ${
                                activeFilter === "Все направления"
                                    ? "bg-purple-600 text-white"
                                    : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                            }
                        `}
                    >
                        Все направления
                        <span className="px-2 py-0.5 rounded-full text-xs bg-white/20 dark:bg-black/20">
                            156
                        </span>
                    </button>

                    <button
                        onClick={() => handleButtonClick("Программирование")}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                            ${
                                activeFilter === "Программирование"
                                    ? "bg-purple-600 text-white"
                                    : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                            }
                        `}
                    >
                        <span>Программирование</span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-white/20 dark:bg-black/20">
                            42
                        </span>
                        {activeFilter === "Программирование" && (
                            <span className="ml-1 text-xs text-purple-200">
                                Популярно
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => handleButtonClick("Дизайн")}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                            ${
                                activeFilter === "Дизайн"
                                    ? "bg-purple-600 text-white"
                                    : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                            }
                        `}
                    >
                        <span>Дизайн</span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-white/20 dark:bg-black/20">
                            28
                        </span>
                        {activeFilter === "Дизайн" && (
                            <span className="ml-1 text-xs text-purple-200">
                                Популярно
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => handleButtonClick("Маркетинг")}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                            ${
                                activeFilter === "Маркетинг"
                                    ? "bg-purple-600 text-white"
                                    : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                            }
                        `}
                    >
                        <span>Маркетинг</span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-white/20 dark:bg-black/20">
                            23
                        </span>
                        {activeFilter === "Маркетинг" && (
                            <span className="ml-1 text-xs text-purple-200">
                                Популярно
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => handleButtonClick("Управление")}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                            ${
                                activeFilter === "Управление"
                                    ? "bg-purple-600 text-white"
                                    : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                            }
                        `}
                    >
                        <span>Управление</span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-white/20 dark:bg-black/20">
                            15
                        </span>
                    </button>

                    <button
                        onClick={() => handleButtonClick("Аналитика")}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                            ${
                                activeFilter === "Аналитика"
                                    ? "bg-purple-600 text-white"
                                    : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                            }
                        `}
                    >
                        <span>Аналитика</span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-white/20 dark:bg-black/20">
                            19
                        </span>
                        <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">
                            Новое
                        </span>
                    </button>

                    {/* Остальные направления */}
                </div>

                {/* Фильтры и список курсов */}
                <div className="flex gap-8 mt-8">
                    {/* Десктопные фильтры */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-medium text-lg">Фильтры</h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setFilters({
                                            level: [],
                                            duration: [],
                                            price: {
                                                min: 0,
                                                max: maxCoursePrice,
                                            },
                                        })
                                    }
                                >
                                    Сбросить
                                </Button>
                            </div>
                            <Filters
                                filters={filters}
                                setFilters={setFilters}
                                maxPrice={maxCoursePrice}
                            />
                        </div>
                    </div>

                    {/* Мобильные фильтры */}
                    <div className="lg:hidden mb-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="w-full">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Фильтры
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px]">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-medium text-lg">
                                        Фильтры
                                    </h3>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            setFilters({
                                                level: [],
                                                duration: [],
                                                price: {
                                                    min: 0,
                                                    max: maxCoursePrice,
                                                },
                                            })
                                        }
                                    >
                                        Сбросить
                                    </Button>
                                </div>
                                <Filters
                                    filters={filters}
                                    setFilters={setFilters}
                                    maxPrice={maxCoursePrice}
                                />
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Основной контент */}
                    <div className="flex-grow">
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-sm text-gray-500">
                                Найдено: {MOCK_COURSES.length} курсов
                            </div>
                            <SortOptions />
                        </div>
                        <CoursesList
                            direction={
                                activeFilter !== "Все направления"
                                    ? activeFilter
                                    : undefined
                            }
                            searchQuery={searchQuery}
                            filters={filters}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CoursesContent;
