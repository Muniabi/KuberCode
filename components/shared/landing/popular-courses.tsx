"use client";

import { motion } from "framer-motion";
import { LampContainer } from "./lamp";
import { CoursesSlider } from "./courses-slider";
import { Users2, Star, BookOpen } from "lucide-react";

const stats = [
    {
        icon: (
            <Users2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-white" />
        ),
        value: "15K+",
        label: "Студентов",
        gradient:
            "from-blue-100 via-purple-100 to-blue-100 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-blue-500/20",
        iconBg: "bg-blue-100 dark:bg-white/10",
    },
    {
        icon: (
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400" />
        ),
        value: "4.9",
        label: "Рейтинг курсов",
        gradient:
            "from-amber-100 via-orange-100 to-amber-100 dark:from-amber-500/20 dark:via-orange-500/20 dark:to-amber-500/20",
        iconBg: "bg-amber-100 dark:bg-white/10",
    },
    {
        icon: (
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
        ),
        value: "98%",
        label: "Завершаемость",
        gradient:
            "from-emerald-100 via-teal-100 to-emerald-100 dark:from-emerald-500/20 dark:via-teal-500/20 dark:to-emerald-500/20",
        iconBg: "bg-emerald-100 dark:bg-white/10",
    },
];

const PopularCourses = () => {
    return (
        <section className="py-12 sm:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <div className="space-y-6 sm:space-y-8">
                        <div className="space-y-4 sm:space-y-6">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                                Создаем уникальные программы совместно с лучшими
                                авторами
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600 dark:text-white/60">
                                Наши курсы разработаны в сотрудничестве с
                                ведущими экспертами индустрии, обеспечивая
                                актуальность и практическую применимость знаний.
                            </p>

                            {/* Статистика */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-6">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className={`relative group overflow-hidden p-4 sm:p-6 rounded-xl sm:rounded-2xl 
                                            bg-gradient-to-br ${stat.gradient} 
                                            border border-gray-200 dark:border-white/10 
                                            backdrop-blur-sm transition-all duration-300 
                                            hover:scale-[1.02] hover:shadow-lg
                                            dark:hover:shadow-black/30`}
                                    >
                                        {/* Блюр эффект на фоне */}
                                        <div className="absolute inset-0 bg-white/60 dark:bg-white/5 backdrop-blur-xl" />

                                        {/* Контент */}
                                        <div className="relative">
                                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                                <div
                                                    className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${stat.iconBg}`}
                                                >
                                                    {stat.icon}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm font-medium text-gray-700 dark:text-white/80">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Декоративный элемент */}
                                        <div
                                            className="absolute -bottom-6 -right-6 w-16 h-16 sm:w-24 sm:h-24 rounded-full 
                                            bg-gradient-to-br from-white/80 to-gray-50/30 
                                            dark:from-white/5 dark:to-white/10 
                                            backdrop-blur-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <CoursesSlider />
                </div>
            </div>
        </section>
    );
};

export default PopularCourses;
