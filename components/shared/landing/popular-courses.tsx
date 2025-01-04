"use client";

import { motion } from "framer-motion";
import { LampContainer } from "./lamp";
import { CoursesSlider } from "./courses-slider";
import { Users2, Star, BookOpen } from "lucide-react";

const stats = [
    {
        icon: <Users2 className="w-6 h-6 text-white" />,
        value: "15K+",
        label: "Студентов",
        gradient: "from-blue-500/20 to-purple-500/20",
    },
    {
        icon: <Star className="w-6 h-6 text-amber-400" />,
        value: "4.9",
        label: "Рейтинг курсов",
        gradient: "from-amber-500/20 to-orange-500/20",
    },
    {
        icon: <BookOpen className="w-6 h-6 text-emerald-400" />,
        value: "98%",
        label: "Завершаемость",
        gradient: "from-emerald-500/20 to-teal-500/20",
    },
];

const PopularCourses = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto">
                <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-white">
                                Создаем уникальные программы совместно с лучшими
                                авторами
                            </h2>
                            <p className="text-lg text-white/60">
                                Наши курсы разработаны в сотрудничестве с
                                ведущими экспертами индустрии, обеспечивая
                                актуальность и практическую применимость знаний.
                            </p>

                            {/* Статистика */}
                            <div className="grid grid-cols-3 gap-6 pt-6">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className={`relative group overflow-hidden p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105`}
                                    >
                                        {/* Блюр эффект на фоне */}
                                        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />

                                        {/* Контент */}
                                        <div className="relative">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                                                    {stat.icon}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-3xl font-bold text-white">
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm font-medium text-white/80">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Декоративный элемент */}
                                        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/5 backdrop-blur-lg" />
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
