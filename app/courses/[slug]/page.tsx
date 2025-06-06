"use client";

import { Container } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Users,
    Timer,
    BookOpen,
    ChevronRight,
    Star,
    Code2,
    Brain,
    Target,
    Sparkles,
    ChevronDown,
    CheckCircle2,
    Circle,
    Lock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { LANGUAGES, type Language } from "@/app/courses/data/languages";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

interface Concept {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    difficulty: "beginner" | "intermediate" | "advanced";
}

interface Section {
    id: string;
    title: string;
    description: string;
    duration: number;
    topics: Topic[];
}

interface Topic {
    id: string;
    title: string;
    description: string;
    duration: number;
    status: "completed" | "available" | "locked";
}

const CONCEPTS: Concept[] = [
    {
        id: "basics",
        title: "Основы",
        description: "Фундаментальные концепции и синтаксис",
        icon: <Code2 className="w-5 h-5" />,
        difficulty: "beginner",
    },
    {
        id: "algorithms",
        title: "Алгоритмы",
        description: "Базовые алгоритмы и структуры данных",
        icon: <Brain className="w-5 h-5" />,
        difficulty: "intermediate",
    },
    {
        id: "patterns",
        title: "Паттерны",
        description: "Продвинутые концепции и паттерны",
        icon: <Target className="w-5 h-5" />,
        difficulty: "advanced",
    },
];

const CURRICULUM: Record<string, Section[]> = {
    cpp: [
        {
            id: "intro",
            title: "Введение в C++",
            description: "Основы языка и базовые концепции",
            duration: 120,
            topics: [
                {
                    id: "setup",
                    title: "Установка и настройка окружения",
                    description: "Подготовка рабочего окружения для разработки",
                    duration: 30,
                    status: "completed",
                },
                {
                    id: "basics",
                    title: "Базовый синтаксис",
                    description: "Переменные, типы данных, операторы",
                    duration: 45,
                    status: "available",
                },
                {
                    id: "control-flow",
                    title: "Управляющие конструкции",
                    description: "Условные операторы и циклы",
                    duration: 45,
                    status: "locked",
                },
            ],
        },
        {
            id: "oop",
            title: "Объектно-ориентированное программирование",
            description: "Классы, объекты и принципы ООП",
            duration: 180,
            topics: [
                {
                    id: "classes",
                    title: "Классы и объекты",
                    description: "Создание и использование классов",
                    duration: 60,
                    status: "locked",
                },
                {
                    id: "inheritance",
                    title: "Наследование",
                    description: "Механизмы наследования и полиморфизма",
                    duration: 60,
                    status: "locked",
                },
                {
                    id: "polymorphism",
                    title: "Полиморфизм",
                    description: "Виртуальные функции и абстрактные классы",
                    duration: 60,
                    status: "locked",
                },
            ],
        },
    ],
};

function CurriculumSection({ section }: { section: Section }) {
    const [expanded, setExpanded] = useState(false);
    const completedTopics = section.topics.filter(
        (t) => t.status === "completed"
    ).length;

    return (
        <div className="mb-4">
            <div
                className="bg-[--card-bg]/50 hover:bg-[--card-hover] rounded-xl p-4 cursor-pointer transition-colors"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h3 className="text-lg font-medium text-[--text-color] mb-1">
                            {section.title}
                        </h3>
                        <p className="text-sm text-[--text-secondary]">
                            {section.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-[--text-secondary]">
                            <span className="flex items-center gap-1">
                                <Timer className="w-4 h-4" />
                                {section.duration} мин
                            </span>
                            <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" />
                                {completedTopics} из {section.topics.length}
                            </span>
                        </div>
                    </div>
                    <ChevronDown
                        className={cn(
                            "w-5 h-5 text-[--text-secondary] transition-transform",
                            expanded && "rotate-180"
                        )}
                    />
                </div>
            </div>

            {expanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 space-y-2 pl-4"
                >
                    {section.topics.map((topic) => (
                        <div
                            key={topic.id}
                            className={cn(
                                "bg-[--card-bg]/30 rounded-lg p-3 transition-colors",
                                topic.status === "locked"
                                    ? "opacity-50"
                                    : "hover:bg-[--card-hover]"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    {topic.status === "completed" && (
                                        <CheckCircle2 className="w-4 h-4 text-[--lime]" />
                                    )}
                                    {topic.status === "available" && (
                                        <Circle className="w-4 h-4 text-[--text-secondary]" />
                                    )}
                                    {topic.status === "locked" && (
                                        <Lock className="w-4 h-4 text-[--text-secondary]" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-[--text-color] mb-1">
                                        {topic.title}
                                    </h4>
                                    <p className="text-xs text-[--text-secondary]">
                                        {topic.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-xs text-[--text-secondary] flex items-center gap-1">
                                            <Timer className="w-3 h-3" />
                                            {topic.duration} мин
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}

export default function LanguagePage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    // Find the language data based on the slug
    const languageData = LANGUAGES.find((lang: Language) => lang.id === slug);

    if (!languageData) {
        return (
            <Container className="relative z-10 py-8 lg:py-12">
                <h1 className="text-2xl text-[--text-color]">Курс не найден</h1>
                <Button
                    className="mt-4 bg-[--purple] hover:bg-[--button-bg] text-white"
                    onClick={() => (window.location.href = "/courses")}
                >
                    Вернуться к списку курсов
                </Button>
            </Container>
        );
    }

    const curriculum = CURRICULUM[slug] || [];

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
                {/* Header */}
                <div className="flex items-center gap-2 text-sm text-[--text-secondary] mb-8">
                    <a
                        href="/courses"
                        className="hover:text-[--text-color] transition-colors"
                    >
                        Курсы
                    </a>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[--text-color]">
                        {languageData.name}
                    </span>
                </div>

                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-6 mb-6">
                            <div
                                className={`w-20 h-20 ${languageData.color} rounded-2xl flex items-center justify-center`}
                            >
                                <span className="text-white text-3xl font-bold">
                                    {languageData.icon}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-[--text-color] mb-2">
                                    {languageData.name}
                                </h1>
                                <div className="flex items-center gap-4 text-[--text-secondary]">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-[--yellow]" />
                                        <span>4.8</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>
                                            {languageData.stats.students}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Timer className="w-4 h-4" />
                                        <span>{languageData.stats.hours}ч</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="w-4 h-4" />
                                        <span>
                                            {languageData.stats.modules}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 text-[--text-secondary] mb-8">
                            <p>
                                Изучите {languageData.name} с нуля и станьте
                                профессиональным разработчиком.{" "}
                                {languageData.desc}
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Автоматическая проверка кода",
                                    "Интерактивные задания",
                                    "Персональное менторство",
                                    "Сертификат по окончании",
                                ].map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center gap-2"
                                    >
                                        <Sparkles className="w-4 h-4 text-[--lime]" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button className="w-full sm:w-auto bg-[--purple] hover:bg-[--button-bg] text-white px-8 py-3 rounded-xl">
                            <span className="mr-2">Начать обучение</span>
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Learning Path */}
                    <div className="bg-[--card-bg]/30 backdrop-blur-sm rounded-2xl p-6 lg:p-8">
                        <h2 className="text-xl font-semibold text-[--text-color] mb-6">
                            Ваш путь обучения
                        </h2>
                        <div className="space-y-4">
                            {CONCEPTS.map((concept, index) => (
                                <Link
                                    key={concept.id}
                                    href={`/courses/${slug}/${concept.id}`}
                                    className="block"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative bg-[--card-bg]/50 hover:bg-[--card-hover] rounded-xl p-4 transition-colors cursor-pointer"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                                        <div className="relative flex items-start gap-4">
                                            <div
                                                className={cn(
                                                    "w-10 h-10 rounded-lg flex items-center justify-center",
                                                    concept.difficulty ===
                                                        "beginner"
                                                        ? "bg-[--lime-alpha] text-[--lime]"
                                                        : concept.difficulty ===
                                                          "intermediate"
                                                        ? "bg-[--yellow-alpha] text-[--yellow]"
                                                        : "bg-[--purple-alpha] text-[--purple]"
                                                )}
                                            >
                                                {concept.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-[--text-color] font-medium mb-1 group-hover:text-[--lime] transition-colors">
                                                    {concept.title}
                                                </h3>
                                                <p className="text-sm text-[--text-secondary] group-hover:text-[--text-color] transition-colors">
                                                    {concept.description}
                                                </p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-[--text-secondary] group-hover:text-[--text-color] transition-colors" />
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Curriculum Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-[--text-color] mb-6">
                        Программа обучения
                    </h2>
                    <div className="space-y-4">
                        {curriculum.map((section) => (
                            <CurriculumSection
                                key={section.id}
                                section={section}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}
