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
    Play,
    CheckCircle2,
    X,
    LightbulbIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LANGUAGES } from "@/app/courses/data/languages";
import Link from "next/link";
import { useState, useRef } from "react";
import { Exercise, EXERCISES } from "@/app/courses/data/exercises";
import CodeEditor from "@/components/exercise/CodeEditor";
import TheoryPanel from "@/components/exercise/TheoryPanel";

interface TestCase {
    input: any[];
    expected: any;
    actual?: any;
    passed?: boolean;
    error?: string;
}

export default function ExercisePage() {
    const params = useParams();
    const router = useRouter();
    const [isTheoryOpen, setIsTheoryOpen] = useState(true);
    const [code, setCode] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const editorRef = useRef<any>(null);
    const [testResults, setTestResults] = useState<TestCase[]>([
        {
            input: [[1, -2, "3.14", "abc", 5]],
            expected: 11.14,
        },
        {
            input: [["abc", "def"]],
            expected: 0,
        },
        {
            input: [["-1.5", 2.789, -3]],
            expected: 7.29,
        },
        {
            input: [[1.234, -5.678, "9.101", "test", 2]],
            expected: 18.01,
        },
    ]);

    const language = LANGUAGES.find((lang) => lang.id === params.slug);
    const exercise = EXERCISES.find((ex) => ex.id === params.exercise);

    if (!language || !exercise) {
        return <div>Exercise not found</div>;
    }

    const handleRunTests = async () => {
        setIsRunning(true);
        try {
            // Получаем текущий код
            const userCode = editorRef.current?.getValue() || "";

            // Создаем функцию из кода пользователя
            const userFunction = new Function(`
                ${userCode}
                return smartSum;
            `)();

            // Запускаем тесты
            const updatedResults = testResults.map((test) => {
                try {
                    const actual = Number(
                        userFunction(...test.input).toFixed(2)
                    );
                    const expected = Number(test.expected.toFixed(2));
                    return {
                        ...test,
                        actual,
                        passed: Math.abs(actual - expected) < 0.01, // Учитываем погрешность округления
                    };
                } catch (error: any) {
                    return {
                        ...test,
                        actual: undefined,
                        passed: false,
                        error: error.message,
                    };
                }
            });

            // Добавляем задержку для анимации
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setTestResults(updatedResults);
        } catch (error: any) {
            console.error("Error running tests:", error);
            setTestResults(
                testResults.map((test) => ({
                    ...test,
                    actual: undefined,
                    passed: false,
                    error: error.message,
                }))
            );
        }
        setIsRunning(false);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[--bg-color-dark] text-gray-900 dark:text-[--text-color]">
            {/* Header */}
            <div className="relative border-b border-gray-200 dark:border-white/5">
                <Container className="py-4 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Navigation */}
                        <div className="flex items-center gap-2 text-sm">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 dark:text-white/60 dark:hover:text-white dark:bg-transparent dark:hover:bg-white/5"
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
            <Container className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Theory Panel */}
                    <motion.div
                        initial={false}
                        animate={{
                            width: isTheoryOpen ? "33.333333%" : "auto",
                        }}
                        className="relative"
                    >
                        <Card className="sticky top-6 bg-gray-50 dark:bg-[--card-bg] border border-gray-200 dark:border-none rounded-3xl overflow-hidden">
                            <div className="p-6 border-b border-gray-200 dark:border-white/5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h1 className="text-2xl font-semibold mb-2">
                                            {exercise.title}
                                        </h1>
                                        <p className="text-gray-500 dark:text-white/60">
                                            {exercise.description}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="shrink-0 w-10 h-10 rounded-xl text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 dark:text-white/60 dark:hover:text-white dark:bg-transparent dark:hover:bg-white/5"
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

                    {/* Code Editor and Test Results */}
                    <div className="flex-1 space-y-6">
                        {/* Code Editor */}
                        <Card className="bg-gray-50 dark:bg-[--card-bg] border border-gray-200 dark:border-none rounded-3xl overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/5">
                                <div className="text-sm text-gray-500 dark:text-white/60">
                                    main.{language.id}
                                </div>
                                <Button
                                    size="sm"
                                    className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-[--lime] dark:hover:bg-[--lime]/90 dark:text-black"
                                    onClick={handleRunTests}
                                    disabled={isRunning}
                                >
                                    <Play className="w-4 h-4 mr-2" />
                                    {isRunning
                                        ? "Проверка..."
                                        : "Запустить тесты"}
                                </Button>
                            </div>
                            <CodeEditor
                                initialCode={exercise.initialCode}
                                language={language.id}
                                exerciseId={exercise.id}
                                ref={editorRef}
                            />
                        </Card>

                        {/* Test Results */}
                        <Card className="bg-gray-50 dark:bg-[--card-bg] border border-gray-200 dark:border-none rounded-3xl overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    Результаты тестов
                                </h2>
                                <div className="space-y-4">
                                    {testResults.map((test, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-2xl bg-gray-100 dark:bg-white/5"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    {test.passed ? (
                                                        <CheckCircle2 className="w-5 h-5 text-lime-500" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-red-500" />
                                                    )}
                                                    {test.passed ? (
                                                        <span className="font-medium text-lime-500">
                                                            Тест {index + 1}
                                                        </span>
                                                    ) : (
                                                        <span className="font-medium">
                                                            Тест {index + 1}
                                                        </span>
                                                    )}
                                                </div>
                                                {test.error && (
                                                    <span className="text-sm text-red-400">
                                                        {test.error}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <div className="text-gray-400 dark:text-white/40 mb-1">
                                                        Входные данные
                                                    </div>
                                                    <code className="px-2 py-1 rounded bg-gray-200 dark:bg-black/30">
                                                        {JSON.stringify(
                                                            test.input
                                                        )}
                                                    </code>
                                                </div>
                                                <div>
                                                    <div className="text-gray-400 dark:text-white/40 mb-1">
                                                        Ожидаемый результат
                                                    </div>
                                                    <code className="px-2 py-1 rounded bg-gray-200 dark:bg-black/30">
                                                        {JSON.stringify(
                                                            test.expected
                                                        )}
                                                    </code>
                                                </div>
                                                <div>
                                                    <div className="text-gray-400 dark:text-white/40 mb-1">
                                                        Ваш результат
                                                    </div>
                                                    <code className="px-2 py-1 rounded bg-gray-200 dark:bg-black/30">
                                                        {test.actual !==
                                                        undefined
                                                            ? JSON.stringify(
                                                                  test.actual
                                                              )
                                                            : "—"}
                                                    </code>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    );
}
