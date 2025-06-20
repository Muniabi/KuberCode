"use client";

import { Container } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    ArrowLeft,
    ArrowRight,
    ChevronRight,
    Timer,
    Circle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LANGUAGES } from "@/app/courses/data/languages";
import Link from "next/link";
import { useState } from "react";
import { Exercise, EXERCISES } from "@/app/courses/data/exercises";
import CodeEditor from "@/components/exercise/CodeEditor";
import TheoryPanel from "@/components/exercise/TheoryPanel";

export default function ExercisePage() {
    const params = useParams();
    const router = useRouter();
    const [isTheoryOpen, setIsTheoryOpen] = useState(true);

    const language = LANGUAGES.find((lang) => lang.id === params.slug);
    const exercise = EXERCISES.find((ex) => ex.id === params.exercise);

    if (!language || !exercise) {
        return <div>Exercise not found</div>;
    }

    return (
        <div className="min-h-screen bg-[--bg-color-dark] text-[--text-color]">
            {/* Header */}
            <div className="relative border-b border-white/5">
                <Container className="py-4">
                    <div className="flex items-center justify-between">
                        {/* Navigation */}
                        <div className="flex items-center gap-2 text-sm">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-white/60 hover:text-white"
                                onClick={() => router.back()}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Назад
                            </Button>
                            <div className="flex items-center gap-2 text-white/40">
                                <Link
                                    href={`/courses/${language.id}`}
                                    className="hover:text-white transition-colors"
                                >
                                    {language.name}
                                </Link>
                                <ChevronRight className="w-4 h-4" />
                                <span className="text-white">
                                    {exercise.title}
                                </span>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-sm text-white/60">
                                <Timer className="w-4 h-4" />
                                <span>~15 мин</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Circle className="w-4 h-4 text-white/20" />
                                <Circle className="w-4 h-4 text-white/20" />
                                <Circle className="w-4 h-4 text-[--lime]" />
                                <Circle className="w-4 h-4 text-white/20" />
                                <Circle className="w-4 h-4 text-white/20" />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Main Content */}
            <Container className="py-6">
                <div className="flex gap-6">
                    {/* Theory Panel */}
                    <motion.div
                        initial={false}
                        animate={{
                            width: isTheoryOpen ? "33.333333%" : "auto",
                        }}
                        className="relative"
                    >
                        <Card className="sticky top-6 bg-[--card-bg] border-none rounded-3xl overflow-hidden">
                            <div className="p-6 border-b border-white/5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h1 className="text-2xl font-semibold mb-2">
                                            {exercise.title}
                                        </h1>
                                        <p className="text-white/60">
                                            {exercise.description}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="shrink-0 w-10 h-10 rounded-xl text-white/60 hover:text-white hover:bg-white/5"
                                        onClick={() =>
                                            setIsTheoryOpen(!isTheoryOpen)
                                        }
                                    >
                                        {isTheoryOpen ? (
                                            <ArrowLeft className="w-5 h-5" />
                                        ) : (
                                            <ArrowRight className="w-5 h-5" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {isTheoryOpen && (
                                <div className="p-6">
                                    <TheoryPanel exercise={exercise} />
                                </div>
                            )}
                        </Card>
                    </motion.div>

                    {/* Code Editor */}
                    <div className="flex-1">
                        <Card className="bg-[--card-bg] border-none rounded-3xl overflow-hidden">
                            <CodeEditor
                                initialCode={exercise.initialCode}
                                language={language.id}
                                exerciseId={exercise.id}
                            />
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    );
}
