"use client";

import { Container } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    ChevronRight,
    Code2,
    CheckCircle2,
    Circle,
    Lock,
    PlayCircle,
    Timer,
    ArrowLeft,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LANGUAGES, Language } from "../../page";
import Link from "next/link";

interface Exercise {
    id: string;
    title: string;
    description: string;
    type: "tutorial" | "practice";
    status: "completed" | "available" | "locked" | "in_progress";
    duration: number;
}

const EXERCISES: Record<string, Exercise[]> = {
    basics: [
        {
            id: "hello-world",
            title: "Hello World",
            description:
                "Классическое введение в программирование. Напишите свою первую программу!",
            type: "tutorial",
            status: "available",
            duration: 15,
        },
        {
            id: "variables",
            title: "Переменные и типы данных",
            description:
                "Изучите основные типы данных и как работать с переменными.",
            type: "practice",
            status: "locked",
            duration: 30,
        },
        {
            id: "operators",
            title: "Операторы",
            description:
                "Познакомьтесь с основными операторами и их применением.",
            type: "practice",
            status: "locked",
            duration: 25,
        },
    ],
    algorithms: [
        {
            id: "arrays",
            title: "Массивы и циклы",
            description:
                "Изучите работу с массивами и циклами для обработки данных.",
            type: "practice",
            status: "locked",
            duration: 45,
        },
        {
            id: "sorting",
            title: "Алгоритмы сортировки",
            description: "Реализуйте базовые алгоритмы сортировки.",
            type: "practice",
            status: "locked",
            duration: 60,
        },
    ],
    patterns: [
        {
            id: "oop-basics",
            title: "Основы ООП",
            description:
                "Изучите основные принципы объектно-ориентированного программирования.",
            type: "tutorial",
            status: "locked",
            duration: 40,
        },
        {
            id: "design-patterns",
            title: "Паттерны проектирования",
            description: "Познакомьтесь с основными паттернами проектирования.",
            type: "practice",
            status: "locked",
            duration: 50,
        },
    ],
};

export default function ConceptPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const conceptId = params.concept as string;

    const languageData = LANGUAGES.find((lang) => lang.id === slug);
    const exercises = EXERCISES[conceptId] || [];

    if (!languageData || !exercises.length) {
        return (
            <Container className="relative z-10 py-8 lg:py-12">
                <h1 className="text-2xl text-[--text-color]">
                    Раздел не найден
                </h1>
                <Button
                    className="mt-4 bg-[--purple] hover:bg-[--button-bg] text-white"
                    onClick={() => router.back()}
                >
                    Вернуться назад
                </Button>
            </Container>
        );
    }

    const stats = {
        total: exercises.length,
        completed: exercises.filter((ex) => ex.status === "completed").length,
        inProgress: exercises.filter((ex) => ex.status === "in_progress")
            .length,
        available: exercises.filter((ex) => ex.status === "available").length,
        locked: exercises.filter((ex) => ex.status === "locked").length,
    };

    return (
        <div className="relative min-h-screen w-full bg-[--bg-color] overflow-x-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(var(--text-color) 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                    }}
                />
            </div>

            {/* Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[--purple]/20 to-[--button-bg]/20 rounded-full blur-3xl" />
                <div className="absolute top-1/3 -left-40 w-96 h-96 bg-gradient-to-br from-[--lime]/10 to-[--yellow]/10 rounded-full blur-3xl" />
            </div>

            <Container className="relative z-10 py-8 lg:py-12">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-[--text-secondary] mb-8">
                    <Link
                        href="/courses"
                        className="hover:text-[--text-color] transition-colors"
                    >
                        Курсы
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link
                        href={`/courses/${slug}`}
                        className="hover:text-[--text-color] transition-colors"
                    >
                        {languageData.name}
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[--text-color]">
                        {conceptId === "basics"
                            ? "Основы"
                            : conceptId === "algorithms"
                            ? "Алгоритмы"
                            : "Паттерны"}
                    </span>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[--text-color] mb-2">
                            {conceptId === "basics"
                                ? "Основы"
                                : conceptId === "algorithms"
                                ? "Алгоритмы"
                                : "Паттерны"}
                        </h1>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[--lime]" />
                                <span className="text-[--text-secondary]">
                                    {stats.completed} из {stats.total}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Timer className="w-4 h-4 text-[--purple]" />
                                <span className="text-[--text-secondary]">
                                    {exercises.reduce(
                                        (acc, ex) => acc + ex.duration,
                                        0
                                    )}{" "}
                                    мин
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exercise List */}
                <div className="space-y-4">
                    {exercises.map((exercise, index) => (
                        <motion.div
                            key={exercise.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card
                                className={cn(
                                    "group relative bg-[--card-bg] hover:bg-[--card-hover] border-none p-4 transition-all duration-300",
                                    exercise.status === "locked" && "opacity-50"
                                )}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                                <div className="relative flex items-center gap-4">
                                    {/* Status Icon */}
                                    <div className="shrink-0">
                                        {exercise.status === "completed" && (
                                            <CheckCircle2 className="w-5 h-5 text-[--lime]" />
                                        )}
                                        {exercise.status === "in_progress" && (
                                            <PlayCircle className="w-5 h-5 text-[--purple]" />
                                        )}
                                        {exercise.status === "available" && (
                                            <Circle className="w-5 h-5 text-[--text-secondary]" />
                                        )}
                                        {exercise.status === "locked" && (
                                            <Lock className="w-5 h-5 text-[--text-secondary]" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="font-medium text-[--text-color] group-hover:text-[--lime] transition-colors">
                                                {exercise.title}
                                            </h3>
                                            <span className="text-xs text-[--text-secondary] ml-4">
                                                {exercise.duration} мин
                                            </span>
                                        </div>
                                        <p className="text-sm text-[--text-secondary] group-hover:text-[--text-color] transition-colors">
                                            {exercise.description}
                                        </p>
                                    </div>

                                    {/* Type Badge */}
                                    <div className="shrink-0">
                                        <span
                                            className={cn(
                                                "px-2 py-1 rounded text-xs",
                                                exercise.type === "tutorial"
                                                    ? "bg-[--purple-alpha] text-[--purple]"
                                                    : "bg-[--lime-alpha] text-[--lime]"
                                            )}
                                        >
                                            {exercise.type === "tutorial"
                                                ? "Теория"
                                                : "Практика"}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
