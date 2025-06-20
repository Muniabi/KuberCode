"use client";

import {
    useEffect,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import Editor, { loader, type EditorProps } from "@monaco-editor/react";
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

// Настраиваем Monaco Editor
loader.config({
    paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs",
    },
});

// Определяем темную тему
const darkTheme = {
    base: "vs-dark",
    inherit: true,
    rules: [
        { token: "comment", foreground: "6A9955" },
        { token: "keyword", foreground: "C586C0" },
        { token: "string", foreground: "CE9178" },
        { token: "number", foreground: "B5CEA8" },
        { token: "function", foreground: "DCDCAA" },
    ],
    colors: {
        "editor.background": "#1E1E1E",
        "editor.foreground": "#D4D4D4",
        "editor.lineHighlightBackground": "#2F2F2F",
        "editorCursor.foreground": "#FFFFFF",
        "editor.selectionBackground": "#264F78",
    },
};

interface CodeEditorProps {
    initialCode: string;
    language: string;
    exerciseId: string;
}

type OutputStatus = "idle" | "running" | "success" | "error";

interface OutputState {
    status: OutputStatus;
    message: string;
    executionTime?: number;
    memory?: string;
}

const EDITOR_OPTIONS: EditorProps["options"] = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: "on" as const,
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: { top: 16, bottom: 16 },
    fontFamily: "'JetBrains Mono', monospace",
    formatOnPaste: true,
    formatOnType: true,
    wordWrap: "on" as const,
    wrappingIndent: "same" as const,
    tabSize: 2,
    renderLineHighlight: "all",
    contextmenu: false,
    scrollbar: {
        vertical: "visible" as const,
        horizontal: "visible" as const,
        useShadows: false,
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
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

const CodeEditor = forwardRef<any, CodeEditorProps>(
    ({ initialCode, language, exerciseId }, ref) => {
        const [mounted, setMounted] = useState(false);
        const [code, setCode] = useState(initialCode);
        const [isRunning, setIsRunning] = useState(false);
        const [output, setOutput] = useState<OutputState>({
            status: "idle",
            message: "",
        });
        const editorRef = useRef<any>(null);
        const containerRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => ({
            getValue: () => editorRef.current?.getValue(),
            setValue: (value: string) => editorRef.current?.setValue(value),
        }));

        useEffect(() => {
            setMounted(true);
        }, []);

        useEffect(() => {
            if (mounted && editorRef.current) {
                editorRef.current.setValue(initialCode);
            }
        }, [initialCode, mounted]);

        const handleEditorDidMount = (editor: any, monaco: any) => {
            editorRef.current = editor;
            // Регистрируем темную тему
            monaco.editor.defineTheme("custom-dark", darkTheme);
            monaco.editor.setTheme("custom-dark");

            // Настраиваем поддержку языка
            if (language === "javascript" || language === "js") {
                monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
                    {
                        noSemanticValidation: false,
                        noSyntaxValidation: false,
                    }
                );
                monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
                    {
                        target: monaco.languages.typescript.ScriptTarget.ES2020,
                        allowNonTsExtensions: true,
                    }
                );
            }

            if (ref) {
                // @ts-ignore
                ref.current = editor;
            }
        };

        const handleRunCode = async () => {
            if (!editorRef.current) return;

            setIsRunning(true);
            setOutput({ status: "running", message: "" });
            const startTime = performance.now();

            try {
                const currentCode = editorRef.current.getValue();

                // Симуляция выполнения кода с разной длительностью
                const executionTime = Math.floor(Math.random() * 1000) + 500;
                await new Promise((resolve) =>
                    setTimeout(resolve, executionTime)
                );

                // Симуляция успешного выполнения
                setOutput({
                    status: "success",
                    message: "Код успешно выполнен!",
                    executionTime: executionTime,
                    memory: "2.1 MB",
                });
            } catch (error: any) {
                setOutput({
                    status: "error",
                    message:
                        error.message || "Произошла ошибка при выполнении кода",
                });
            } finally {
                setIsRunning(false);
            }
        };

        const handleReset = () => {
            if (!editorRef.current) return;
            editorRef.current.setValue(initialCode);
            setOutput({ status: "idle", message: "" });
        };

        const getLanguageId = () => {
            switch (language.toLowerCase()) {
                case "cpp":
                    return "cpp";
                case "python":
                    return "python";
                case "javascript":
                    return "javascript";
                case "typescript":
                    return "typescript";
                default:
                    return "plaintext";
            }
        };

        if (!mounted) {
            return (
                <div className="flex items-center justify-center h-[600px] bg-[#101011]">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white" />
                </div>
            );
        }

        return (
            <div className="w-full h-[600px] bg-[#101011] flex flex-col overflow-hidden">
                {/* Editor */}
                <div className="flex-1 min-h-0 relative">
                    <Editor
                        height="100%"
                        defaultLanguage={getLanguageId()}
                        defaultValue={initialCode}
                        theme="custom-dark"
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

                {/* Output */}
                <AnimatePresence>
                    {(output.message || isRunning) && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-white/5"
                        >
                            <div className="p-4 text-sm">
                                <div
                                    className={cn(
                                        "flex items-center gap-2",
                                        output.status === "error"
                                            ? "text-red-400"
                                            : output.status === "success"
                                            ? "text-[--lime]"
                                            : "text-white/60"
                                    )}
                                >
                                    {isRunning ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : output.status === "success" ? (
                                        <div className="flex items-center gap-4">
                                            <span>{output.message}</span>
                                            <div className="flex items-center gap-2 text-white/40">
                                                <span>
                                                    Время:{" "}
                                                    {output.executionTime}ms
                                                </span>
                                                <span>•</span>
                                                <span>
                                                    Память: {output.memory}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        output.message
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

CodeEditor.displayName = "CodeEditor";

export default CodeEditor;
