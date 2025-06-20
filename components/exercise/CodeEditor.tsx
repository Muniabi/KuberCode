"use client";

import { useEffect, useRef, useState } from "react";
import Editor, { loader } from "@monaco-editor/react";
import {
    Play,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Terminal,
    Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestResults from "./TestResults";

// Предзагрузка Monaco Editor
loader.config({
    paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs",
    },
});

interface CodeEditorProps {
    initialCode: string;
    language: string;
    exerciseId: string;
    tests?: { input: any[]; expected: any }[];
    exercise: any;
}

type OutputStatus = "idle" | "running" | "success" | "error";

interface OutputState {
    status: OutputStatus;
    message: string;
    executionTime?: number;
    memory?: string;
}

interface TestResult {
    index: number;
    input: any[];
    expected: any;
    actual: any;
    passed: boolean;
    error?: string;
}

const EDITOR_OPTIONS = {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: "'JetBrains Mono', monospace",
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    lineNumbers: "on",
    renderLineHighlight: "all",
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: "on",
    smoothScrolling: true,
    padding: { top: 16, bottom: 16 },
    automaticLayout: true,
    tabSize: 4,
    wordWrap: "on",
    formatOnPaste: true,
    formatOnType: true,
    renderWhitespace: "selection",
    guides: {
        indentation: true,
        bracketPairs: true,
    },
    bracketPairColorization: {
        enabled: true,
    },
} as const;

const THEME_DATA = {
    base: "vs-dark",
    inherit: true,
    rules: [
        { token: "comment", foreground: "6A9955" },
        { token: "keyword", foreground: "569CD6" },
        { token: "string", foreground: "CE9178" },
        { token: "number", foreground: "B5CEA8" },
        { token: "type", foreground: "4EC9B0" },
    ],
    colors: {
        "editor.background": "#101011",
        "editor.foreground": "#FFFFFF",
        "editor.lineHighlightBackground": "#FFFFFF10",
        "editorCursor.foreground": "#FFFFFF",
        "editor.selectionBackground": "#264F78",
        "editor.inactiveSelectionBackground": "#3A3D41",
        "editorLineNumber.foreground": "#555555",
        "editorLineNumber.activeForeground": "#858585",
        "editor.selectionHighlightBackground": "#ADD6FF26",
        "editor.wordHighlightBackground": "#575757B8",
        "editor.wordHighlightStrongBackground": "#004972B8",
    },
};

function OutputPanel({
    output,
    isRunning,
}: {
    output: OutputState;
    isRunning: boolean;
}) {
    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/5 relative bg-[#101011]"
        >
            <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-white/40" />
                        <span className="text-sm font-medium text-white/60">
                            Вывод программы
                        </span>
                    </div>
                    {output.executionTime && (
                        <div className="flex items-center gap-4 text-xs text-white/40">
                            <span>
                                Время выполнения: {output.executionTime}мс
                            </span>
                            {output.memory && (
                                <span>Память: {output.memory}</span>
                            )}
                        </div>
                    )}
                </div>

                <div className="relative">
                    <div className="bg-black/20 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                            {output.status === "success" && (
                                <CheckCircle2 className="w-4 h-4 text-[--lime] mt-1 shrink-0" />
                            )}
                            {output.status === "error" && (
                                <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                            )}
                            <pre className="flex-1 text-sm font-mono text-white/90 whitespace-pre-wrap overflow-x-auto">
                                {output.message}
                            </pre>
                        </div>
                    </div>

                    {isRunning && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#101011]/80 backdrop-blur-sm flex items-center justify-center z-10"
                        >
                            <div className="flex items-center gap-3 px-4 py-2 bg-[#101011] rounded-lg border border-white/5">
                                <Loader2 className="w-4 h-4 text-white animate-spin" />
                                <span className="text-sm text-white">
                                    Выполнение...
                                </span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function CodeEditor({
    initialCode,
    language,
    exerciseId,
    tests,
    exercise,
}: CodeEditorProps) {
    const [mounted, setMounted] = useState(false);
    const [code, setCode] = useState(initialCode);
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState<OutputState>({
        status: "idle",
        message: "",
    });
    const [solutionUnlocked, setSolutionUnlocked] = useState(false);
    const [testResults, setTestResults] = useState<TestResult[] | null>(null);
    const [isRunningTests, setIsRunningTests] = useState(false);
    const editorRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Load saved code from localStorage on mount
    useEffect(() => {
        setMounted(true);
        const saved =
            typeof window !== "undefined"
                ? localStorage.getItem(`exercise_code_${exerciseId}`)
                : null;
        if (saved && editorRef.current) {
            editorRef.current.setValue(saved);
            setCode(saved);
        } else if (saved) {
            setCode(saved);
        }
        return () => setMounted(false);
    }, [exerciseId]);

    // Save code to localStorage on change
    useEffect(() => {
        if (mounted) {
            localStorage.setItem(`exercise_code_${exerciseId}`, code);
        }
    }, [code, exerciseId, mounted]);

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor;
        monaco.editor.defineTheme("kubercode-dark", THEME_DATA);
        monaco.editor.setTheme("kubercode-dark");

        // Keyboard shortcuts
        editor.addCommand(
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
            handleRunCode
        );
    };

    const runJsTests = (userCode: string, testsToRun: any[]): TestResult[] => {
        try {
            const functionName = userCode.match(
                /function\s+([a-zA-Z0-9_]+)\s*\(/
            )?.[1];
            if (!functionName) {
                throw new Error(
                    "Не удалось найти основную функцию в вашем коде."
                );
            }

            const fn = new Function(`${userCode}; return ${functionName};`);
            const userFunction = fn();

            return testsToRun.map((test, index) => {
                try {
                    const actual = userFunction(...test.input);
                    const passed =
                        JSON.stringify(actual) ===
                        JSON.stringify(test.expected);

                    return {
                        index,
                        input: test.input,
                        expected: test.expected,
                        actual,
                        passed,
                    };
                } catch (error: any) {
                    return {
                        index,
                        input: test.input,
                        expected: test.expected,
                        actual: undefined,
                        passed: false,
                        error: error.message,
                    };
                }
            });
        } catch (e: any) {
            return testsToRun.map((test, index) => ({
                index,
                input: test.input,
                expected: test.expected,
                actual: undefined,
                passed: false,
                error: e.message,
            }));
        }
    };

    const handleRunTests = async () => {
        if (!editorRef.current || !tests) return;

        setIsRunningTests(true);
        setTestResults(null);

        // Симуляция задержки для анимации
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const currentCode = editorRef.current.getValue();
        const results = runJsTests(currentCode, tests);

        setTestResults(results);
        setIsRunningTests(false);

        // Проверяем, все ли тесты пройдены
        const allPassed = results.every((r) => r.passed);
        if (allPassed) {
            setSolutionUnlocked(true);
        }
    };

    const handleRunCode = async () => {
        if (!editorRef.current) return;

        setIsRunning(true);
        const startTime = performance.now();

        // --- Логика для языков без тестов ---
        try {
            // Симуляция выполнения кода с разной длительностью
            const executionTime = Math.floor(Math.random() * 1000) + 500;
            await new Promise((resolve) => setTimeout(resolve, executionTime));

            const endTime = performance.now();
            const memory = `${Math.floor(Math.random() * 50) + 10}MB`;

            // Генерируем более реалистичный вывод
            const output = [
                "Компиляция успешна",
                "Запуск программы...\n",
                "Hello, World!",
                "Результат выполнения: 42",
                "Массив отсортирован за O(n log n)",
                "[1, 2, 3, 5, 8, 13, 21]",
            ].join("\n");

            if (Math.random() > 0.8) {
                throw new Error(
                    [
                        "Ошибка выполнения:",
                        "RuntimeError: Stack overflow at line 42",
                        "  at fibonacci (main.cpp:42)",
                        "  at main (main.cpp:10)",
                    ].join("\n")
                );
            }

            setOutput({
                status: "success",
                message: output,
                executionTime: Math.floor(endTime - startTime),
                memory,
            });
        } catch (error: unknown) {
            const endTime = performance.now();
            setOutput({
                status: "error",
                message: error instanceof Error ? error.message : String(error),
                executionTime: Math.floor(endTime - startTime),
            });
        } finally {
            setIsRunning(false);
        }
    };

    const handleReset = () => {
        if (editorRef.current) {
            editorRef.current.setValue(initialCode);
            setOutput({ status: "idle", message: "" });
            setTestResults(null);
            setSolutionUnlocked(false);
        }
    };

    const handleShowSolution = () => {
        if (editorRef.current && exercise.solution) {
            editorRef.current.setValue(exercise.solution);
            setOutput({ status: "idle", message: "" });
            setTestResults(null);
        }
    };

    const getLanguageId = () => {
        switch (language.toLowerCase()) {
            case "cpp":
                return "cpp";
            case "python":
                return "python";
            case "js":
            case "javascript":
                return "javascript";
            case "typescript":
                return "typescript";
            case "html":
                return "html";
            default:
                return "plaintext";
        }
    };

    const isJsWithTests = language === "js" && tests && tests.length > 0;

    if (!mounted) {
        return (
            <div className="flex items-center justify-center w-full h-[600px] bg-[#101011] rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white" />
            </div>
        );
    }

    return (
        <div
            className="w-full bg-[#101011] rounded-lg flex flex-row overflow-hidden"
            style={{ height: "70vh", minHeight: "600px" }}
            ref={containerRef}
        >
            {/* Left: Editor */}
            <div
                className="flex-1 min-w-0 flex flex-col border-r border-white/5"
                style={{ maxWidth: "65%" }}
            >
                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 h-14 border-b border-white/5 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="default"
                            size="sm"
                            className={cn(
                                "bg-[--purple] hover:bg-[--button-bg] text-white rounded-lg transition-all duration-200",
                                (isRunning || isRunningTests) &&
                                    "opacity-50 cursor-not-allowed"
                            )}
                            onClick={
                                isJsWithTests ? handleRunTests : handleRunCode
                            }
                            disabled={isRunning || isRunningTests}
                        >
                            {isJsWithTests ? (
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                            ) : (
                                <Play className="w-4 h-4 mr-2" />
                            )}
                            <span>
                                {isJsWithTests ? "Проверить" : "Запустить"}
                            </span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/60 hover:text-white hover:bg-white/5"
                            onClick={handleReset}
                        >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            <span>Сбросить</span>
                        </Button>
                        {solutionUnlocked && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-white/60 hover:text-white hover:bg-white/5"
                                onClick={handleShowSolution}
                            >
                                <span>Показать решение</span>
                            </Button>
                        )}
                    </div>
                    <div className="text-sm text-white/40">
                        {language.toUpperCase()}
                    </div>
                </div>
                {/* Editor */}
                <div className="flex-1 min-h-0 relative">
                    <Editor
                        height="100%"
                        defaultLanguage={getLanguageId()}
                        value={code}
                        theme="kubercode-dark"
                        options={EDITOR_OPTIONS}
                        onChange={(value) => setCode(value || "")}
                        onMount={handleEditorDidMount}
                        loading={
                            <div className="flex items-center justify-center w-full h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white" />
                            </div>
                        }
                    />
                </div>
                {/* Output for non-JS languages */}
                {!isJsWithTests && (
                    <AnimatePresence>
                        {(output.message || isRunning) && (
                            <OutputPanel
                                output={output}
                                isRunning={isRunning}
                            />
                        )}
                    </AnimatePresence>
                )}
            </div>
            {/* Right: Test Results (if JS with tests) */}
            {isJsWithTests && (
                <div className="w-[35%] min-w-[320px] max-w-[500px] h-full overflow-y-auto bg-[#0a0a0b] flex flex-col">
                    <TestResults
                        tests={tests}
                        results={testResults}
                        isRunning={isRunningTests}
                        onRunTests={handleRunTests}
                    />
                </div>
            )}
        </div>
    );
}
