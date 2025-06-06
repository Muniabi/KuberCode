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
    BookOpen,
    Video,
    FileText,
    ExternalLink,
    ChevronDown,
    LightbulbIcon,
    GraduationCap,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LANGUAGES, Language } from "../../page";
import Link from "next/link";
import { useState } from "react";

interface Author {
    id: string;
    name: string;
    role: string;
    avatar: string;
    bio: string;
}

interface Resource {
    id: string;
    title: string;
    type: "article" | "video" | "documentation";
    url: string;
    duration?: number;
}

interface Hint {
    id: string;
    content: string;
    unlockAfter?: number; // minutes after starting
}

interface Exercise {
    id: string;
    title: string;
    description: string;
    type: "tutorial" | "practice";
    status: "completed" | "available" | "locked" | "in_progress";
    duration: number;
    dependencies: string[]; // IDs of exercises that must be completed first
    hints: Hint[];
    resources: Resource[];
    author: Author;
}

const AUTHORS: Record<string, Author> = {
    "john-doe": {
        id: "john-doe",
        name: "Джон Доу",
        role: "Senior Developer",
        avatar: "JD",
        bio: "10+ лет опыта в разработке. Специализация на алгоритмах и структурах данных.",
    },
    "jane-smith": {
        id: "jane-smith",
        name: "Джейн Смит",
        role: "Tech Lead",
        avatar: "JS",
        bio: "Full-stack разработчик с фокусом на архитектуре приложений.",
    },
};

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
            dependencies: [],
            hints: [
                {
                    id: "h1",
                    content: "Не забудьте про точку с запятой в конце строки",
                    unlockAfter: 5,
                },
                {
                    id: "h2",
                    content: "Функция print используется для вывода в консоль",
                    unlockAfter: 10,
                },
            ],
            resources: [
                {
                    id: "r1",
                    title: "Введение в программирование",
                    type: "article",
                    url: "#",
                    duration: 10,
                },
                {
                    id: "r2",
                    title: "Видео урок: Первая программа",
                    type: "video",
                    url: "#",
                    duration: 15,
                },
            ],
            author: AUTHORS["john-doe"],
        },
        {
            id: "variables",
            title: "Переменные и типы данных",
            description:
                "Изучите основные типы данных и как работать с переменными.",
            type: "practice",
            status: "locked",
            duration: 30,
            dependencies: ["hello-world"],
            hints: [
                {
                    id: "h1",
                    content: "Каждая переменная должна иметь тип",
                    unlockAfter: 10,
                },
            ],
            resources: [
                {
                    id: "r1",
                    title: "Документация по типам данных",
                    type: "documentation",
                    url: "#",
                },
            ],
            author: AUTHORS["jane-smith"],
        },
        {
            id: "operators",
            title: "Операторы",
            description:
                "Познакомьтесь с основными операторами и их применением.",
            type: "practice",
            status: "locked",
            duration: 25,
            dependencies: ["variables"],
            hints: [
                {
                    id: "h1",
                    content: "Обратите внимание на приоритет операторов",
                    unlockAfter: 10,
                },
            ],
            resources: [
                {
                    id: "r1",
                    title: "Шпаргалка по операторам",
                    type: "article",
                    url: "#",
                    duration: 5,
                },
            ],
            author: AUTHORS["john-doe"],
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
            dependencies: ["operators"],
            hints: [
                {
                    id: "h1",
                    content: "Используйте цикл for для итерации по массиву",
                    unlockAfter: 15,
                },
            ],
            resources: [
                {
                    id: "r1",
                    title: "Работа с массивами",
                    type: "article",
                    url: "#",
                    duration: 20,
                },
            ],
            author: AUTHORS["jane-smith"],
        },
        {
            id: "sorting",
            title: "Алгоритмы сортировки",
            description: "Реализуйте базовые алгоритмы сортировки.",
            type: "practice",
            status: "locked",
            duration: 60,
            dependencies: ["arrays"],
            hints: [
                {
                    id: "h1",
                    content: "Начните с реализации пузырьковой сортировки",
                    unlockAfter: 20,
                },
            ],
            resources: [
                {
                    id: "r1",
                    title: "Визуализация алгоритмов сортировки",
                    type: "video",
                    url: "#",
                    duration: 30,
                },
            ],
            author: AUTHORS["john-doe"],
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
            dependencies: ["sorting"],
            hints: [
                {
                    id: "h1",
                    content: "Класс - это шаблон для создания объектов",
                    unlockAfter: 15,
                },
            ],
            resources: [
                {
                    id: "r1",
                    title: "Введение в ООП",
                    type: "article",
                    url: "#",
                    duration: 25,
                },
            ],
            author: AUTHORS["jane-smith"],
        },
        {
            id: "design-patterns",
            title: "Паттерны проектирования",
            description: "Познакомьтесь с основными паттернами проектирования.",
            type: "practice",
            status: "locked",
            duration: 50,
            dependencies: ["oop-basics"],
            hints: [
                {
                    id: "h1",
                    content: "Начните с изучения порождающих паттернов",
                    unlockAfter: 20,
                },
            ],
            resources: [
                {
                    id: "r1",
                    title: "Каталог паттернов проектирования",
                    type: "documentation",
                    url: "#",
                },
            ],
            author: AUTHORS["john-doe"],
        },
    ],
};

function ExerciseCard({
    exercise,
    isExpanded = false,
}: {
    exercise: Exercise;
    isExpanded?: boolean;
}) {
    const [expanded, setExpanded] = useState(isExpanded);
    const [showHints, setShowHints] = useState(false);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card
                className={cn(
                    "group relative bg-[--card-bg] hover:bg-[--card-hover] border-none p-4 transition-all duration-300",
                    exercise.status === "locked" && "opacity-50"
                )}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

                {/* Main Exercise Info */}
                <div className="relative flex items-center gap-4">
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

                    <div className="shrink-0 flex items-center gap-2">
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
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-[--text-secondary] hover:text-[--text-color]"
                            onClick={() => setExpanded(!expanded)}
                        >
                            <ChevronDown
                                className={cn(
                                    "w-5 h-5 transition-transform",
                                    expanded && "rotate-180"
                                )}
                            />
                        </Button>
                    </div>
                </div>

                {/* Expanded Content */}
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-[--border-color]"
                    >
                        {/* Author Info */}
                        <div className="flex items-center gap-4 mb-4">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center text-white font-medium",
                                    "bg-gradient-to-br from-[--purple] to-[--button-bg]"
                                )}
                            >
                                {exercise.author.avatar}
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-[--text-color]">
                                    {exercise.author.name}
                                </h4>
                                <p className="text-xs text-[--text-secondary]">
                                    {exercise.author.role}
                                </p>
                            </div>
                        </div>

                        {/* Resources */}
                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-[--text-color] mb-2 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Материалы
                            </h4>
                            <div className="space-y-2">
                                {exercise.resources.map((resource) => (
                                    <a
                                        key={resource.id}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs text-[--text-secondary] hover:text-[--text-color] transition-colors"
                                    >
                                        {resource.type === "video" && (
                                            <Video className="w-3 h-3" />
                                        )}
                                        {resource.type === "article" && (
                                            <FileText className="w-3 h-3" />
                                        )}
                                        {resource.type === "documentation" && (
                                            <ExternalLink className="w-3 h-3" />
                                        )}
                                        {resource.title}
                                        {resource.duration && (
                                            <span className="text-[--text-secondary]">
                                                ({resource.duration} мин)
                                            </span>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Hints */}
                        <div>
                            <h4 className="text-sm font-medium text-[--text-color] mb-2 flex items-center gap-2">
                                <LightbulbIcon className="w-4 h-4" />
                                Подсказки
                            </h4>
                            <div className="space-y-2">
                                {exercise.hints.map((hint) => (
                                    <div
                                        key={hint.id}
                                        className={cn(
                                            "p-2 rounded bg-black/5 dark:bg-white/5",
                                            !showHints &&
                                                "blur-sm hover:blur-none transition-all cursor-pointer"
                                        )}
                                        onClick={() => setShowHints(true)}
                                    >
                                        <p className="text-xs text-[--text-secondary]">
                                            {hint.content}
                                        </p>
                                        {hint.unlockAfter && !showHints && (
                                            <p className="text-[10px] text-[--text-secondary] mt-1">
                                                Доступно через{" "}
                                                {hint.unlockAfter} мин
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </Card>
        </motion.div>
    );
}

function DependencyDiagram({ exercises }: { exercises: Exercise[] }) {
    return (
        <div className="mt-8 p-6 bg-[--card-bg] rounded-2xl">
            <h3 className="text-lg font-medium text-[--text-color] mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Карта зависимостей
            </h3>
            <div className="mermaid">
                {`graph TD;
                    ${exercises
                        .map((ex) => {
                            const status =
                                ex.status === "available"
                                    ? "Доступно"
                                    : ex.status === "completed"
                                    ? "Завершено"
                                    : ex.status === "in_progress"
                                    ? "В процессе"
                                    : "Заблокировано";
                            return `${ex.id}["${ex.title}<br/>(${status})"]`;
                        })
                        .join("\n")}

                    ${exercises
                        .map((ex) =>
                            ex.dependencies
                                .map((dep) => `${dep} --> ${ex.id}`)
                                .join("\n")
                        )
                        .join("\n")}

                    classDef completed fill:#4ade80,stroke:none,color:#1a1b1e;
                    classDef available fill:#818cf8,stroke:none,color:#1a1b1e;
                    classDef inProgress fill:#fbbf24,stroke:none,color:#1a1b1e;
                    classDef locked fill:#71717a,stroke:none,color:#white;
                    
                    ${exercises
                        .map((ex) => `class ${ex.id} ${ex.status}`)
                        .join("\n")}
                `}
            </div>
        </div>
    );
}

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

                {/* Exercise List with Dependencies */}
                <div className="space-y-4">
                    {exercises.map((exercise, index) => (
                        <ExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                            isExpanded={index === 0}
                        />
                    ))}
                </div>

                {/* Dependencies Visualization */}
                <DependencyDiagram exercises={exercises} />
            </Container>
        </div>
    );
}
