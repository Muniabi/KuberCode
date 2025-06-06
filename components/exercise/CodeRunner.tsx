import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeRunnerProps {
    code: string;
    language: string;
    exerciseId: string;
    onReset: () => void;
}

interface TestCase {
    input: string[];
    expectedOutput: string;
}

const SOLUTIONS: Record<string, { testCases: TestCase[]; solution: string }> = {
    "hello-world": {
        testCases: [{ input: [], expectedOutput: "Hello, World!" }],
        solution: `// JavaScript
console.log("Hello, World!");

// Python
print("Hello, World!")  

// C++
#include <iostream>
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
    },
};

export default function CodeRunner({
    code,
    language,
    exerciseId,
    onReset,
}: CodeRunnerProps) {
    const [output, setOutput] = useState<string>("");
    const [status, setStatus] = useState<
        "idle" | "running" | "success" | "error"
    >("idle");

    const runCode = async () => {
        setStatus("running");

        try {
            // В реальном приложении здесь был бы запрос к API для выполнения кода
            // Сейчас мы просто симулируем проверку
            const solution = SOLUTIONS[exerciseId];
            if (!solution) {
                throw new Error("Solution not found");
            }

            // Simple output check
            let userOutput = "";
            const console_log = (text: string) => (userOutput = text);

            // Safe code execution (demo only)
            if (language === "javascript") {
                try {
                    const modifiedCode = code.replace(
                        /console\.log/g,
                        "console_log"
                    );
                    eval(modifiedCode);
                } catch (e) {
                    throw new Error("Code error: " + (e as Error).message);
                }
            } else {
                // For other languages, just check for keywords
                if (
                    language === "python" &&
                    !code.includes('print("Hello, World!")')
                ) {
                    throw new Error("Invalid solution");
                }
                if (
                    language === "cpp" &&
                    !code.includes('cout << "Hello, World!"')
                ) {
                    throw new Error("Invalid solution");
                }
                userOutput = "Hello, World!";
            }

            // Check all test cases
            const testCase = solution.testCases[0];
            if (userOutput.trim() === testCase.expectedOutput) {
                setOutput("Success! Task completed correctly.");
                setStatus("success");
            } else {
                throw new Error(
                    `Expected output: "${testCase.expectedOutput}"\nYour output: "${userOutput}"`
                );
            }
        } catch (error) {
            setOutput(`Error: ${(error as Error).message}`);
            setStatus("error");
        }
    };

    const handleReset = () => {
        setOutput("");
        setStatus("idle");
        onReset();
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Button
                    onClick={runCode}
                    disabled={status === "running"}
                    className={cn(
                        "bg-[--purple] hover:bg-[--button-bg] text-white",
                        status === "success" &&
                            "bg-[--lime] hover:bg-[--lime]/90",
                        status === "error" && "bg-red-500 hover:bg-red-600"
                    )}
                >
                    <Play className="w-4 h-4 mr-2" />
                    {status === "running" ? "Checking..." : "Run"}
                </Button>
                <Button
                    variant="outline"
                    onClick={handleReset}
                    className="text-[--text-secondary] hover:text-[--text-color]"
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                </Button>
            </div>

            {output && (
                <div
                    className={cn(
                        "p-4 rounded-lg font-mono text-sm",
                        status === "success" &&
                            "bg-[--lime-alpha] text-[--lime]",
                        status === "error" && "bg-red-500/10 text-red-500"
                    )}
                >
                    <pre className="whitespace-pre-wrap">{output}</pre>
                </div>
            )}
        </div>
    );
}
