"use client";

import { Container } from "@/components/shared";
import { directions } from "@/store/courses";
import { useState } from "react";
import { CoursesList } from "@/components/sections/courses-list";
import { Filters } from "@/components/filters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const CoursesContent = () => {
    const [activeFilter, setActiveFilter] = useState<string>("Все направления");
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        level: [] as string[],
        duration: [] as string[],
        price: [] as string[],
    });

    const handleButtonClick = (directionName: string) => {
        setActiveFilter(directionName);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-black">
            <Container className="px-4 sm:px-9 py-8 sm:py-16">
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

                {/* Основной контент */}
                <div className="flex gap-8 mt-8">
                    {/* Список курсов */}
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
            </Container>
        </div>
    );
};

export default CoursesContent;
