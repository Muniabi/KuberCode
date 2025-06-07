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
    "basics-hello-world": {
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
            const solution = SOLUTIONS[exerciseId];
            if (!solution) {
                throw new Error(
                    `Solution not found for exercise: ${exerciseId}`
                );
            }

            let userOutput = "";
            const console_log = (text: string) => (userOutput = text);

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

            const testCase = solution.testCases[0];
            if (userOutput.trim() === testCase.expectedOutput) {
                setOutput("✨ Отлично! Задача решена правильно.");
                setStatus("success");
            } else {
                throw new Error(
                    `Ожидаемый вывод: "${testCase.expectedOutput}"\nВаш вывод: "${userOutput}"`
                );
            }
        } catch (error) {
            setOutput(`❌ ${(error as Error).message}`);
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
            <div className="flex items-center gap-3">
                <Button
                    onClick={runCode}
                    disabled={status === "running"}
                    size="lg"
                    className={cn(
                        "bg-white/5 hover:bg-white/10 text-white rounded-2xl px-6 transition-all duration-300 min-w-[180px]",
                        status === "success" &&
                            "bg-[--lime] hover:bg-[--lime]/90 text-[--bg-color]",
                        status === "error" && "bg-red-500 hover:bg-red-600"
                    )}
                >
                    <Play className="w-5 h-5 mr-2" />
                    {status === "running" ? "Проверяем..." : "Проверить"}
                </Button>
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleReset}
                    className="text-white/60 hover:text-white hover:bg-white/5 rounded-2xl px-6"
                >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Сбросить
                </Button>
            </div>

            {output && (
                <div
                    className={cn(
                        "p-6 rounded-2xl font-medium text-base transition-colors duration-300",
                        status === "success" && "bg-[--lime]/10 text-[--lime]",
                        status === "error" && "bg-red-500/10 text-red-500"
                    )}
                >
                    <pre className="whitespace-pre-wrap font-sans">
                        {output}
                    </pre>
                </div>
            )}
        </div>
    );
}
