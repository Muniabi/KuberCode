"use client";

import React, { useEffect, useState } from "react";
import { Container } from "../container";
import { Input } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Sparkles, Users, BookOpen, Trophy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Hero3D } from "./hero-3d";

interface Props {
    className?: string;
}

export const MainInfoBlock: React.FC<Props> = ({ className }) => {
    const [rating, setRating] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");

    const features = [
        {
            icon: <Users className="w-6 h-6" />,
            title: "300+ Экспертов",
            description: "Опытные преподаватели из ведущих компаний",
        },
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: "5000+ Курсов",
            description: "Актуальные программы обучения",
        },
        {
            icon: <Trophy className="w-6 h-6" />,
            title: "92% Выпускников",
            description: "Успешно трудоустраиваются",
        },
    ];

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleClick = () => {
        if (!search) {
            toast.error("Поле поиска пустое");
        } else {
            toast.success(`Выполнен поиск с запросом ${search}`);
        }
    };

    useEffect(() => {
        localStorage.setItem("rating", "5.0");
        const storedRating = localStorage.getItem("rating");
        setRating(storedRating);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center py-12 sm:py-16 lg:py-20">
            {/* Фоновые элементы */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 -left-4 w-60 h-60 bg-purple-500/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/30 rounded-full blur-[100px]" />
            </div>

            <Container className={cn("relative", className)}>
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Левая часть */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
                    >
                        <Badge
                            variant="outline"
                            className="px-4 py-2 text-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                        >
                            <Sparkles className="w-4 h-4 mr-2 text-[--purple]" />
                            Открыт набор на новые курсы
                        </Badge>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Начни карьеру в
                            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                                {" "}
                                IT{" "}
                            </span>
                            вместе с нами
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl">
                            Мы поможем вам освоить востребованные навыки и найти
                            работу мечты в технологической сфере
                        </p>

                        <div className="flex w-full max-w-md items-center gap-4 relative">
                            <Input
                                className="bg-white/80 dark:bg-white/10 backdrop-blur-sm 
                                         border-gray-200 dark:border-white/20 
                                         p-6 pr-12 
                                         text-base text-gray-900 dark:text-white 
                                         placeholder:text-gray-500 dark:placeholder:text-gray-400
                                         shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
                                         dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2)]
                                         focus:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.1),0_10px_20px_-2px_rgba(0,0,0,0.06)]
                                         dark:focus:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.3)]
                                         transition-shadow"
                                placeholder="Какую профессию хотите освоить?"
                                value={search}
                                onChange={handleSearchChange}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleClick()
                                }
                            />
                            <Search
                                className="absolute right-4 cursor-pointer hover:opacity-70 transition-opacity text-gray-500 dark:text-white"
                                onClick={handleClick}
                            />
                        </div>

                        {/* Features grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl mt-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.2,
                                    }}
                                    className="flex flex-col items-center lg:items-start gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                                >
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-semibold">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Правая часть */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-square w-full max-w-xl mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl transform rotate-6" />
                        <div className="relative z-10 w-full h-full">
                            <Hero3D />
                        </div>

                        {/* Floating rating card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="absolute -bottom-6 -right-6 flex items-center gap-3 px-5 py-3 bg-white dark:bg-zinc-800 rounded-xl shadow-xl z-50"
                        >
                            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" />
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">
                                    {rating}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Рейтинг школы
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};
