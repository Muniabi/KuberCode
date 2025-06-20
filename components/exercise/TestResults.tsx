"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Play, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestCase {
    input: any[];
    expected: any;
}

interface TestResult {
    index: number;
    input: any[];
    expected: any;
    actual: any;
    passed: boolean;
    error?: string;
}

interface TestResultsProps {
    tests: TestCase[];
    results: TestResult[] | null;
    isRunning: boolean;
    onRunTests: () => void;
}

export default function TestResults({
    tests,
    results,
    isRunning,
    onRunTests,
}: TestResultsProps) {
    const passedCount = results?.filter((r) => r.passed).length || 0;
    const totalCount = tests.length;

    return (
        <div className="border-t border-white/5 bg-[#0a0a0b]">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[--purple]" />
                            <span className="text-sm font-medium text-white/90">
                                Тесты
                            </span>
                        </div>
                        {results && (
                            <div className="flex items-center gap-2 text-xs">
                                <span
                                    className={cn(
                                        "px-2 py-1 rounded-full",
                                        passedCount === totalCount
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-orange-500/20 text-orange-400"
                                    )}
                                >
                                    {passedCount}/{totalCount} пройдено
                                </span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={onRunTests}
                        disabled={isRunning}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-all duration-200",
                            isRunning
                                ? "bg-white/5 text-white/40 cursor-not-allowed"
                                : "bg-[--purple] hover:bg-[--button-bg] text-white"
                        )}
                    >
                        {isRunning ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Play className="w-4 h-4" />
                        )}
                        <span>
                            {isRunning ? "Выполнение..." : "Запустить тесты"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Test Cases */}
            <div className="p-4 space-y-3">
                <AnimatePresence>
                    {tests.map((test, index) => {
                        const result = results?.find((r) => r.index === index);
                        const isRunning = results === null;
                        const isCompleted = result !== undefined;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                    ease: "easeOut",
                                }}
                                className={cn(
                                    "p-4 rounded-lg border transition-all duration-300",
                                    isCompleted
                                        ? result.passed
                                            ? "border-green-500/20 bg-green-500/5"
                                            : "border-red-500/20 bg-red-500/5"
                                        : "border-white/10 bg-white/5"
                                )}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-white/80">
                                            Тест #{index + 1}
                                        </span>
                                        {isRunning && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex items-center gap-1 text-xs text-white/60"
                                            >
                                                <Loader2 className="w-3 h-3 animate-spin" />
                                                <span>Выполняется...</span>
                                            </motion.div>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {isCompleted && (
                                            <motion.div
                                                initial={{
                                                    scale: 0,
                                                    rotate: -180,
                                                }}
                                                animate={{
                                                    scale: 1,
                                                    rotate: 0,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 500,
                                                    damping: 30,
                                                    delay: 0.2,
                                                }}
                                            >
                                                {result.passed ? (
                                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                                ) : (
                                                    <XCircle className="w-5 h-5 text-red-400" />
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="text-white/60">
                                            Входные данные:
                                        </span>
                                        <div className="mt-1 p-2 bg-black/20 rounded border border-white/10">
                                            <code className="text-white/90">
                                                {JSON.stringify(test.input)}
                                            </code>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-white/60">
                                            Ожидаемый результат:
                                        </span>
                                        <div className="mt-1 p-2 bg-black/20 rounded border border-white/10">
                                            <code className="text-white/90">
                                                {JSON.stringify(test.expected)}
                                            </code>
                                        </div>
                                    </div>

                                    {isCompleted && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <span className="text-white/60">
                                                Ваш результат:
                                            </span>
                                            <div
                                                className={cn(
                                                    "mt-1 p-2 rounded border",
                                                    result.passed
                                                        ? "bg-green-500/10 border-green-500/20"
                                                        : "bg-red-500/10 border-red-500/20"
                                                )}
                                            >
                                                <code
                                                    className={cn(
                                                        result.passed
                                                            ? "text-green-400"
                                                            : "text-red-400"
                                                    )}
                                                >
                                                    {result.error ||
                                                        JSON.stringify(
                                                            result.actual
                                                        )}
                                                </code>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Summary */}
                {results && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className={cn(
                            "p-4 rounded-lg border-2 text-center",
                            passedCount === totalCount
                                ? "border-green-500/30 bg-green-500/10"
                                : "border-orange-500/30 bg-orange-500/10"
                        )}
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            {passedCount === totalCount ? (
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                            ) : (
                                <XCircle className="w-5 h-5 text-orange-400" />
                            )}
                            <span
                                className={cn(
                                    "text-lg font-semibold",
                                    passedCount === totalCount
                                        ? "text-green-400"
                                        : "text-orange-400"
                                )}
                            >
                                {passedCount === totalCount
                                    ? "Все тесты пройдены! 🎉"
                                    : `${passedCount} из ${totalCount} тестов пройдено`}
                            </span>
                        </div>
                        {passedCount === totalCount && (
                            <p className="text-sm text-white/70">
                                Отличная работа! Ваше решение корректно.
                            </p>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
