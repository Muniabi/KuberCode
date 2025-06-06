import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Play, RotateCcw, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CodeRunner from "./CodeRunner";

interface CodeEditorProps {
    initialCode: string;
    language: string;
    exerciseId: string;
}

export default function CodeEditor({
    initialCode,
    language,
    exerciseId,
}: CodeEditorProps) {
    const [code, setCode] = useState(initialCode);
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState<string>("");
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput("Running code...");

        try {
            // Here you would implement the actual code execution
            // This could involve sending the code to a backend service
            // For now, we'll just simulate a delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setOutput(
                "Code executed successfully!\nOutput will appear here..."
            );
        } catch (error) {
            setOutput("Error executing code: " + error.message);
        } finally {
            setIsRunning(false);
        }
    };

    const handleReset = () => {
        setCode(initialCode);
        if (editorRef.current) {
            (editorRef.current as any).setValue(initialCode);
        }
    };

    // Map language to Monaco Editor language
    const getMonacoLanguage = () => {
        switch (language) {
            case "cpp":
                return "cpp";
            case "python":
                return "python";
            case "javascript":
            default:
                return "javascript";
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-2 p-4 border-b border-[--border-color] bg-[--card-bg]">
                <div className="flex items-center gap-2">
                    <Button
                        variant="default"
                        className={cn(
                            "bg-gradient-to-r from-[--lime] to-[--yellow] text-[--bg-color] hover:opacity-90",
                            isRunning && "opacity-50 cursor-not-allowed"
                        )}
                        onClick={handleRunCode}
                        disabled={isRunning}
                    >
                        <Play className="w-4 h-4 mr-2" />
                        Запустить
                    </Button>
                    <Button
                        variant="ghost"
                        className="text-[--text-secondary] hover:text-[--text-color]"
                        onClick={handleReset}
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Сбросить
                    </Button>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-[--text-secondary] hover:text-[--text-color]"
                >
                    <Settings2 className="w-4 h-4" />
                </Button>
            </div>

            {/* Editor */}
            <div className="flex-1 min-h-0 bg-[--card-bg] rounded-lg overflow-hidden">
                <Editor
                    height="100%"
                    defaultLanguage={getMonacoLanguage()}
                    defaultValue={initialCode}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: "on",
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                    }}
                    onChange={(value) => setCode(value || "")}
                    onMount={handleEditorDidMount}
                />
            </div>

            {/* Output */}
            <div className="h-1/4 bg-[--card-bg] p-4 overflow-auto font-mono text-sm">
                <div className="text-[--text-secondary] mb-2">Output:</div>
                <pre className="text-[--text-color] whitespace-pre-wrap">
                    {output}
                </pre>
            </div>

            <div className="mt-4">
                <CodeRunner
                    code={code}
                    language={language}
                    exerciseId={exerciseId}
                    onReset={handleReset}
                />
            </div>
        </div>
    );
}
