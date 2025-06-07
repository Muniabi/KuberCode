"use client";

import { Container } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    ArrowRight,
    BookOpen,
    Code2,
    Timer,
    Users,
    Star,
    CheckCircle2,
    Terminal,
    Zap,
    Brain,
    ChevronRight,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LANGUAGES, type Language } from "@/app/courses/data/languages";
import Link from "next/link";

const TRACKS = [
    {
        id: "basics",
        title: "Основы",
        description: "Изучите фундаментальные концепции языка",
        icon: Terminal,
        exercises: 12,
        timeToComplete: "4-6 часов",
    },
    {
        id: "algorithms",
        title: "Алгоритмы",
        description: "Решайте алгоритмические задачи и оптимизируйте код",
        icon: Brain,
        exercises: 15,
        timeToComplete: "6-8 часов",
    },
    {
        id: "patterns",
        title: "Паттерны",
        description: "Изучите популярные паттерны проектирования",
        icon: Zap,
        exercises: 10,
        timeToComplete: "5-7 часов",
    },
];

export default function LanguagePage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const languageData = LANGUAGES.find((lang: Language) => lang.id === slug);

    if (!languageData) {
        return (
            <Container className="relative z-10 py-8">
                <h1 className="text-2xl text-[--text-color]">Язык не найден</h1>
                <Button
                    className="mt-4 bg-[--purple] hover:bg-[--button-bg] text-white"
                    onClick={() => router.back()}
                >
                    Вернуться назад
                </Button>
            </Container>
        );
    }

    return (
        <div className="relative min-h-screen w-full bg-[--bg-color] overflow-x-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(var(--text-color) 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                    }}
                />
            </div>

            {/* Hero Section */}
            <div className="relative bg-[--card-bg] border-b border-[--border-color]">
                <Container className="relative z-10 py-12 lg:py-16">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                        {/* Language Icon */}
                        <div
                            className={cn(
                                "w-24 h-24 lg:w-32 lg:h-32 rounded-2xl flex items-center justify-center relative shadow-lg",
                                languageData.color
                            )}
                        >
                            <span className="text-white text-4xl lg:text-5xl font-bold">
                                {languageData.icon}
                            </span>
                        </div>

                        {/* Language Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <h1 className="text-3xl lg:text-4xl font-bold text-[--text-color]">
                                    {languageData.name}
                                </h1>
                                {languageData.status && (
                                    <span className="px-3 py-1 bg-gradient-to-r from-[--lime] to-[--yellow] rounded-full text-[--bg-color] text-sm font-medium">
                                        {languageData.status}
                                    </span>
                                )}
                            </div>
                            <p className="text-lg text-[--text-secondary] mb-6 max-w-2xl">
                                {languageData.desc}
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-[--yellow]" />
                                    <span className="text-[--text-color]">
                                        {languageData.stats.students.toLocaleString()}{" "}
                                        учеников
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Timer className="w-5 h-5 text-[--lime]" />
                                    <span className="text-[--text-color]">
                                        {languageData.stats.hours} часов
                                        контента
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-[--purple]" />
                                    <span className="text-[--text-color]">
                                        {languageData.stats.modules} модулей
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Learning Tracks */}
            <Container className="relative z-10 py-12 lg:py-16">
                <div className="mb-12">
                    <h2 className="text-2xl lg:text-3xl font-bold text-[--text-color] mb-4">
                        Путь обучения
                    </h2>
                    <p className="text-lg text-[--text-secondary] max-w-2xl">
                        Выберите трек обучения и начните свой путь к мастерству
                        в {languageData.name}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {TRACKS.map((track, index) => (
                        <Link
                            key={track.id}
                            href={`/courses/${slug}/${track.id}`}
                            className="block group"
                        >
                            <Card className="h-full bg-[--card-bg] hover:bg-[--card-hover] border-none p-6 transition-all duration-300">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative h-full"
                                >
                                    {/* Track Icon */}
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[--purple] to-[--button-bg] flex items-center justify-center mb-4">
                                        <track.icon className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Track Content */}
                                    <div>
                                        <h3 className="text-xl font-semibold text-[--text-color] mb-2 group-hover:text-[--lime] transition-colors">
                                            {track.title}
                                        </h3>
                                        <p className="text-[--text-secondary] mb-4 group-hover:text-[--text-color] transition-colors">
                                            {track.description}
                                        </p>
                                    </div>

                                    {/* Track Stats */}
                                    <div className="mt-auto">
                                        <div className="flex items-center justify-between text-sm text-[--text-secondary] mb-4">
                                            <span>
                                                {track.exercises} упражнений
                                            </span>
                                            <span>{track.timeToComplete}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                {[...Array(3)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[--purple] to-[--button-bg] flex items-center justify-center text-white text-xs border-2 border-[--bg-color]"
                                                    >
                                                        {i + 1}
                                                    </div>
                                                ))}
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-[--text-secondary] group-hover:text-[--text-color] transition-colors" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Container>
        </div>
    );
}
