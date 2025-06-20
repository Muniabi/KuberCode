"use client";

import { Container } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    ChevronRight,
    Timer,
    ArrowLeft,
    BookOpen,
    Video,
    FileText,
    ExternalLink,
    LightbulbIcon,
    GraduationCap,
    CheckCircle2,
    Circle,
    Lock,
    PlayCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/app/courses/data/languages";
import Link from "next/link";
import { useState } from "react";
import { Exercise, EXERCISES } from "@/app/courses/data/exercises";

function ExerciseCard({
    exercise,
    isExpanded = false,
    languageId,
    conceptId,
}: {
    exercise: Exercise;
    isExpanded?: boolean;
    languageId: string;
    conceptId: string;
}) {
    const [expanded, setExpanded] = useState(isExpanded);
    const router = useRouter();

    const handleExerciseClick = () => {
        router.push(`/courses/${languageId}/${conceptId}/${exercise.id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group"
        >
            <Card
                className={cn(
                    "relative bg-[--card-bg] hover:bg-[--card-hover] border-none p-6 transition-all duration-300 cursor-pointer"
                )}
                onClick={handleExerciseClick}
            >
                {/* Status Indicator Line */}
                <div className="absolute top-0 left-0 h-1 w-full rounded-t-lg bg-[--text-secondary]" />

                <div className="flex items-start gap-6">
                    {/* Status Icon */}
                    <div className="shrink-0">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[--text-secondary]/10">
                            <Circle className="w-6 h-6 text-[--text-secondary]" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-xl font-semibold text-[--text-color] group-hover:text-[--lime] transition-colors">
                                    {exercise.title}
                                </h3>
                                <p className="text-[--text-secondary] mt-1 group-hover:text-[--text-color] transition-colors">
                                    {exercise.description}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 ml-6">
                                <div className="flex items-center gap-2 text-[--text-secondary]">
                                    <Timer className="w-4 h-4" />
                                    <span>~15 мин</span>
                                </div>
                                <div
                                    className={cn(
                                        "px-3 py-1 rounded-full text-sm",
                                        exercise.type === "tutorial"
                                            ? "bg-[--purple-alpha] text-[--purple]"
                                            : "bg-[--lime-alpha] text-[--lime]"
                                    )}
                                >
                                    {exercise.type === "tutorial"
                                        ? "Теория"
                                        : "Практика"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}

export default function ConceptPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const conceptId = params.concept as string;

    const languageData = LANGUAGES.find((lang) => lang.id === slug);
    const exercises = EXERCISES.filter((ex) => ex.id.startsWith(conceptId));

    if (!languageData || !exercises.length) {
        return (
            <div className="min-h-screen bg-white dark:bg-[--bg-color-dark] text-gray-900 dark:text-[--text-color] px-4 sm:px-6 lg:px-8">
                <Container className="py-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Button
                            variant="ghost"
                            className="text-gray-500 hover:text-gray-900 dark:text-white/60 dark:hover:text-white"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Назад
                        </Button>
                        <div className="flex items-center gap-2 text-gray-400 dark:text-white/40">
                            <Link
                                href={`/courses/${languageData?.id}`}
                                className="hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                {languageData?.name}
                            </Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-gray-500 dark:text-white capitalize">
                                {conceptId}
                            </span>
                        </div>
                    </div>

                    <Card className="bg-gray-50 dark:bg-[--card-bg] border-none p-6">
                        <h1 className="text-2xl font-semibold mb-2">
                            Раздел не найден
                        </h1>
                        <p className="text-gray-500 dark:text-white/60 mb-4">
                            К сожалению, запрошенный раздел не существует или
                            был удален.
                        </p>
                        <Button
                            onClick={() => router.back()}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Вернуться назад
                        </Button>
                    </Card>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[--bg-color-dark] text-gray-900 dark:text-[--text-color] px-4 sm:px-6 lg:px-8">
            <Container className="py-6">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                    <Button
                        variant="ghost"
                        className="text-gray-500 hover:text-gray-900 dark:text-white/60 dark:hover:text-white"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Назад
                    </Button>
                    <div className="flex items-center gap-2 text-gray-400 dark:text-white/40">
                        <Link
                            href={`/courses/${languageData.id}`}
                            className="hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            {languageData.name}
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-500 dark:text-white capitalize">
                            {conceptId}
                        </span>
                    </div>
                </div>

                {/* Exercise List */}
                <div className="space-y-4">
                    {exercises.map((exercise) => (
                        <ExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                            languageId={slug}
                            conceptId={conceptId}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}
