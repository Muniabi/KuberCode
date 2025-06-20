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
    Sparkles,
    GraduationCap,
    Trophy,
    Target,
    Rocket,
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
        color: "from-[--purple] to-[--button-bg] dark:from-[--purple] dark:to-[--button-bg]",
    },
    {
        id: "algorithms",
        title: "Алгоритмы",
        description: "Решайте алгоритмические задачи и оптимизируйте код",
        icon: Brain,
        exercises: 15,
        timeToComplete: "6-8 часов",
        color: "from-[--lime] to-[--yellow] dark:from-[--lime] dark:to-[--yellow]",
    },
    {
        id: "patterns",
        title: "Паттерны",
        description: "Изучите популярные паттерны проектирования",
        icon: Zap,
        exercises: 10,
        timeToComplete: "5-7 часов",
        color: "from-[--yellow] to-[--orange] dark:from-[--yellow] dark:to-[--orange]",
    },
];

const FEATURES = [
    {
        icon: Rocket,
        title: "Быстрый старт",
        description:
            "Начните писать код уже через 5 минут после начала обучения",
    },
    {
        icon: Target,
        title: "Практический подход",
        description: "Более 70% курса состоит из практических заданий",
    },
    {
        icon: Trophy,
        title: "Проекты в портфолио",
        description: "Создайте реальные проекты для вашего портфолио",
    },
    {
        icon: GraduationCap,
        title: "Сертификат",
        description: "Получите сертификат о прохождении курса",
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
        <div className="relative min-h-screen w-full bg-gray-50 dark:bg-[--bg-color] overflow-x-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                    }}
                />
            </div>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-b from-white dark:from-[--card-bg] to-transparent">
                <Container className="relative z-10 py-16 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
                        {/* Language Icon */}
                        <div
                            className={cn(
                                "w-32 h-32 lg:w-48 lg:h-48 rounded-3xl flex items-center justify-center relative shadow-2xl transform hover:scale-105 transition-transform duration-300",
                                languageData.color
                            )}
                        >
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 via-transparent to-transparent" />
                            <span className="text-white text-6xl lg:text-8xl font-bold relative">
                                {languageData.icon}
                            </span>
                        </div>

                        {/* Language Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-6">
                                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/60 bg-clip-text text-transparent">
                                    {languageData.name}
                                </h1>
                                {languageData.status && (
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[--lime] to-[--yellow] rounded-full blur-sm opacity-50" />
                                        <span className="relative px-4 py-1.5 bg-gradient-to-r from-[--lime] to-[--yellow] rounded-full text-[--bg-color] text-sm font-medium">
                                            {languageData.status}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <p className="text-xl text-gray-600 dark:text-[--text-secondary] mb-8 max-w-2xl leading-relaxed">
                                {languageData.desc}
                            </p>
                            <div className="flex flex-wrap gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                        <Users className="w-6 h-6 text-[--yellow]" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {languageData.stats.students.toLocaleString()}
                                        </div>
                                        <div className="text-gray-500 dark:text-[--text-secondary]">
                                            учеников
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                        <Timer className="w-6 h-6 text-[--lime]" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {languageData.stats.hours}
                                        </div>
                                        <div className="text-gray-500 dark:text-[--text-secondary]">
                                            часов контента
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                        <BookOpen className="w-6 h-6 text-[--purple]" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {languageData.stats.modules}
                                        </div>
                                        <div className="text-gray-500 dark:text-[--text-secondary]">
                                            модулей
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Features Section */}
            <Container className="relative z-10 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full bg-white hover:bg-gray-50 dark:bg-[--card-bg] dark:hover:bg-[--card-hover] border-none p-6 transition-all duration-300 shadow-lg hover:shadow-xl">
                                <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-[--purple]" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 dark:text-[--text-secondary]">
                                    {feature.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* Learning Tracks */}
            <Container className="relative z-10 py-16">
                <div className="mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/60 bg-clip-text text-transparent mb-4">
                        Путь обучения
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-[--text-secondary] max-w-2xl">
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
                            <Card className="h-full bg-white hover:bg-gray-50 dark:bg-[--card-bg] dark:hover:bg-[--card-hover] border-none p-6 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative h-full"
                                >
                                    {/* Track Icon */}
                                    <div
                                        className={cn(
                                            "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300",
                                            track.color
                                        )}
                                    >
                                        <track.icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Track Content */}
                                    <div>
                                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-[--lime] transition-colors">
                                            {track.title}
                                        </h3>
                                        <p className="text-gray-500 dark:text-[--text-secondary] mb-6 group-hover:text-gray-900 dark:group-hover:text-[--text-color] transition-colors">
                                            {track.description}
                                        </p>
                                    </div>

                                    {/* Track Stats */}
                                    <div className="mt-auto">
                                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-[--text-secondary] mb-4">
                                            <span className="flex items-center gap-2">
                                                <Target className="w-4 h-4" />
                                                {track.exercises} упражнений
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Timer className="w-4 h-4" />
                                                {track.timeToComplete}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-end">
                                            <ChevronRight className="w-6 h-6 text-gray-400 dark:text-[--text-secondary] group-hover:text-gray-900 dark:group-hover:text-[--text-color] group-hover:translate-x-1 transition-all duration-300" />
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
