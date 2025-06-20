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
import { CONCEPTS } from "@/app/courses/data/concepts";
import { EXERCISES } from "@/app/courses/data/exercises";
import Link from "next/link";

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
    const languageConcepts = CONCEPTS.filter(
        (concept) => concept.languageId === slug
    );

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
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Почему стоит изучать {languageData.name}?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-[--text-secondary] max-w-3xl mx-auto">
                        Наш курс поможет вам освоить {languageData.name} с нуля
                        до продвинутого уровня
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURES.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[--purple] to-[--button-bg] mx-auto mb-4 flex items-center justify-center">
                                <feature.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-[--text-secondary]">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* Tracks Section */}
            <Container className="relative z-10 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Программа обучения
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-[--text-secondary] max-w-3xl mx-auto">
                        Изучите {languageData.name} пошагово, от основ до
                        продвинутых тем
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {languageConcepts.map((concept, index) => {
                        const exerciseCount = concept.exercises.length;
                        const exercises = EXERCISES.filter((ex) =>
                            concept.exercises.includes(ex.id)
                        );

                        return (
                            <motion.div
                                key={concept.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/courses/${slug}/${concept.id}`}>
                                    <Card className="group relative bg-white dark:bg-[--card-bg] border-none p-6 h-full hover:shadow-xl transition-all duration-300 cursor-pointer">
                                        <div className="absolute top-0 left-0 h-1 w-full rounded-t-lg bg-gradient-to-r from-[--purple] to-[--button-bg] opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="flex items-start gap-4">
                                            <div
                                                className={cn(
                                                    "w-12 h-12 rounded-xl flex items-center justify-center text-xl",
                                                    concept.color
                                                )}
                                            >
                                                {concept.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[--lime] transition-colors">
                                                    {concept.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-[--text-secondary] mb-4">
                                                    {concept.description}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-[--text-secondary]">
                                                        <div className="flex items-center gap-1">
                                                            <Code2 className="w-4 h-4" />
                                                            <span>
                                                                {exerciseCount}{" "}
                                                                заданий
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Timer className="w-4 h-4" />
                                                            <span>
                                                                ~
                                                                {exerciseCount *
                                                                    15}{" "}
                                                                мин
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[--lime] transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
}
