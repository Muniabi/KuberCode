"use client";

import React, { useState, useEffect, Suspense, lazy } from "react";
import { Container } from "../container";
import { Input } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles, Users, BookOpen, Trophy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Props {
    className?: string;
}

const Hero3D = lazy(() =>
    import("./hero-3d").then((mod) => ({ default: mod.Hero3D }))
);

export const MainInfoBlock: React.FC<Props> = ({ className }) => {
    const [search, setSearch] = useState<string>("");
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const animationConfig = {
        initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: "easeOut" },
    };

    const scaleAnimationConfig = {
        initial: prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: "easeOut" },
    };

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

    return (
        <section className="relative min-h-[90vh] flex items-center py-8 sm:py-12 lg:py-16">
            {/* Фоновые элементы */}
            <div className="absolute inset-0 -z-10 overflow-hidden bg-[--bg-color-light] dark:bg-[--bg-color-dark]">
                <div className="absolute top-0 -left-4 w-40 h-40 sm:w-60 sm:h-60 bg-purple-500/30 rounded-full blur-[80px] sm:blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-60 h-60 sm:w-80 sm:h-80 bg-blue-500/30 rounded-full blur-[80px] sm:blur-[100px]" />
            </div>

            <Container className={cn("relative", className)}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
                        <motion.div
                            {...animationConfig}
                            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6"
                        >
                            <Badge
                                variant="outline"
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                            >
                                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[--purple]" />
                                Открыт набор на новые курсы
                            </Badge>

                            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight">
                                Начни карьеру в
                                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                                    {" "}
                                    IT{" "}
                                </span>
                                вместе с нами
                            </h1>

                            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl">
                                Мы поможем вам освоить востребованные навыки и
                                найти работу мечты в технологической сфере
                            </p>

                            <div className="flex w-full max-w-md items-center gap-4 relative">
                                <Input
                                    className="bg-white/80 dark:bg-white/10 backdrop-blur-sm 
                                         border-gray-200 dark:border-white/20 
                                         p-4 sm:p-6 pr-12 
                                         text-sm sm:text-base text-gray-900 dark:text-white 
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
                                    className="absolute right-4 cursor-pointer hover:opacity-70 transition-opacity text-gray-500 dark:text-white w-5 h-5 sm:w-6 sm:h-6"
                                    onClick={handleClick}
                                />
                            </div>

                            {/* Features grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-2xl mt-6 sm:mt-8">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.1,
                                        }}
                                        className="flex flex-col items-center lg:items-start gap-2 p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                                    >
                                        <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                                            {feature.icon}
                                        </div>
                                        <h3 className="font-semibold text-sm sm:text-base">
                                            {feature.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-400">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            {...scaleAnimationConfig}
                            className="relative aspect-square w-full max-w-xl mx-auto hidden sm:flex"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl transform rotate-6" />
                            <div className="relative z-10 w-full h-full">
                                <Suspense
                                    fallback={
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                                        </div>
                                    }
                                >
                                    <Hero3D />
                                </Suspense>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
