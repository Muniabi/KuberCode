import { Exercise } from "@/app/courses/data/exercises";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    BookOpen,
    Video,
    FileText,
    LightbulbIcon,
    GraduationCap,
    CheckCircle2,
    Lock,
    PlayCircle,
} from "lucide-react";
import { useState } from "react";
import Editor, { loader, type EditorProps } from "@monaco-editor/react";

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

interface TheoryPanelProps {
    exercise: Exercise;
}

const EDITOR_OPTIONS: EditorProps["options"] = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: "on" as const,
    readOnly: true,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: { top: 16, bottom: 16 },
    fontFamily: "'JetBrains Mono', monospace",
    contextmenu: false,
    wordWrap: "on" as const,
    wrappingIndent: "same" as const,
    tabSize: 2,
    renderLineHighlight: "all",
    scrollbar: {
        vertical: "visible" as const,
        horizontal: "visible" as const,
        useShadows: false,
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
    },
};

export default function TheoryPanel({ exercise }: TheoryPanelProps) {
    const [activeTab, setActiveTab] = useState<"theory" | "hints" | "solution">(
        "theory"
    );

    const handleEditorDidMount = (editor: any, monaco: any) => {
        // Регистрируем темную тему
        monaco.editor.defineTheme("custom-dark", darkTheme);
        monaco.editor.setTheme("custom-dark");

        // Настраиваем поддержку языка
        if (
            exercise.languageId === "javascript" ||
            exercise.languageId === "js"
        ) {
            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
                {
                    noSemanticValidation: false,
                    noSyntaxValidation: false,
                }
            );
            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.ES2020,
                allowNonTsExtensions: true,
            });
        }
    };

    const tabs = [
        {
            id: "theory" as const,
            label: "Теория",
            icon: BookOpen,
            content: exercise.theory,
        },
        {
            id: "hints" as const,
            label: "Подсказки",
            icon: LightbulbIcon,
            content: exercise.hints?.join("\n\n") || "Подсказок пока нет",
        },
        {
            id: "solution" as const,
            label: "Решение",
            icon: CheckCircle2,
            content: exercise.solution || "Решение пока не доступно",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-2">
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "flex-1 text-white/60 hover:text-white hover:bg-white/5 rounded-xl gap-2",
                            activeTab === tab.id &&
                                "bg-white/5 text-white hover:bg-white/10"
                        )}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </Button>
                ))}
            </div>

            {/* Resources */}
            <div className="grid grid-cols-2 gap-2">
                <Button
                    variant="ghost"
                    className="bg-white/5 hover:bg-white/10 text-white rounded-xl h-auto py-3 flex-col items-center gap-2"
                >
                    <Video className="w-5 h-5 text-[--purple]" />
                    <span className="text-sm">Видео урок</span>
                </Button>
                <Button
                    variant="ghost"
                    className="bg-white/5 hover:bg-white/10 text-white rounded-xl h-auto py-3 flex-col items-center gap-2"
                >
                    <FileText className="w-5 h-5 text-[--lime]" />
                    <span className="text-sm">Документация</span>
                </Button>
            </div>

            {/* Content */}
            <div className="space-y-4">
                {activeTab === "theory" && (
                    <div className="prose prose-invert max-w-none">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: exercise.theory || "",
                            }}
                        />
                    </div>
                )}

                {activeTab === "hints" && (
                    <div className="space-y-4">
                        {exercise.hints?.map((hint, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-xl bg-white/5 text-white/90"
                            >
                                <div className="flex items-center gap-2 mb-2 text-[--lime]">
                                    <LightbulbIcon className="w-4 h-4" />
                                    <span className="font-medium">
                                        Подсказка {index + 1}
                                    </span>
                                </div>
                                <p className="text-sm">{hint}</p>
                            </div>
                        )) || (
                            <div className="text-center text-white/60 py-8">
                                Подсказок пока нет
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "solution" && exercise.solution && (
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/5">
                            <div className="flex items-center gap-2 mb-4 text-[--lime]">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="font-medium">
                                    Готовое решение
                                </span>
                            </div>
                            <div className="h-[300px] rounded-lg overflow-hidden bg-[#1E1E1E]">
                                <Editor
                                    height="100%"
                                    defaultValue={exercise.solution}
                                    defaultLanguage={
                                        exercise.languageId === "js"
                                            ? "javascript"
                                            : exercise.languageId
                                    }
                                    theme="custom-dark"
                                    options={EDITOR_OPTIONS}
                                    onMount={handleEditorDidMount}
                                    loading={
                                        <div className="flex items-center justify-center w-full h-full">
                                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white" />
                                        </div>
                                    }
                                />
                            </div>
                            <p className="mt-4 text-sm text-white/60">
                                Это лишь одно из возможных решений. Попробуйте
                                сначала решить задачу самостоятельно, а затем
                                сравните свое решение с предложенным.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
