"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const stories = [
    {
        name: "Михаил Петров",
        role: "ML Engineer в Яндекс",
        description:
            "После курса по ML и нейронным сетям за 8 месяцев вырос с Junior до Middle специалиста. Сейчас разрабатываю алгоритмы компьютерного зрения.",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
        salary: "от 180 000 ₽",
        category: "Machine Learning",
    },
    {
        name: "Анна Соколова",
        role: "Data Scientist в Сбер",
        description:
            "Пришла из аналитики, освоила Python и DS. Теперь создаю модели для прогнозирования поведения клиентов и оптимизации бизнес-процессов.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        salary: "от 230 000 ₽",
        category: "Data Science",
    },
    {
        name: "Дмитрий Волков",
        role: "AI Developer в VK",
        description:
            "За год изучил основы AI и ML, создал несколько успешных проектов. Сейчас работаю над улучшением рекомендательных систем.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        salary: "от 200 000 ₽",
        category: "Artificial Intelligence",
    },
    {
        name: "Екатерина Морозова",
        role: "NLP Engineer в Tinkoff",
        description:
            "Прошла путь от лингвиста до NLP инженера. Разрабатываю чат-боты и системы обработки естественного языка.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
        salary: "от 190 000 ₽",
        category: "Natural Language Processing",
    },
];

const AlumniStories = () => {
    return (
        <section className="py-20 relative overflow-hidden bg-black/5 dark:bg-white/5">
            {/* Декоративный фоновый элемент */}
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                            Истории успеха
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Студенты, которые уже работают в ведущих компаниях
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stories.map((story, index) => (
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                            {/* Изображение */}
                            <Image
                                src={story.image}
                                alt={story.name}
                                fill
                                className="object-cover mix-blend-overlay transition-transform duration-500 group-hover:scale-110"
                                quality={90}
                            />

                            {/* Контентная часть */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                                <div>
                                    <Badge
                                        className="bg-white/10 backdrop-blur-sm text-white border-none 
                                                     hover:bg-white/20 transition-colors duration-300"
                                    >
                                        {story.salary}
                                    </Badge>
                                </div>

                                <div className="space-y-3 transform translate-y-4 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-white">
                                            {story.name}
                                        </h3>
                                        <p className="text-sm text-white/90 font-medium">
                                            {story.role}
                                        </p>
                                    </div>
                                    <p className="text-sm text-white/80">
                                        {story.description}
                                    </p>

                                    <Button
                                        variant="ghost"
                                        className="text-white hover:text-white/90 p-0 h-auto font-normal group/button"
                                    >
                                        <span className="mr-2">
                                            История успеха
                                        </span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/button:translate-x-1" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AlumniStories;
