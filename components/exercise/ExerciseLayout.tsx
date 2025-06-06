import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import TheoryPanel from "./TheoryPanel";
import CodeEditor from "./CodeEditor";

interface ExerciseLayoutProps {
    exercise: {
        id: string;
        title: string;
        description: string;
        theory: string;
        resources: Array<{
            title: string;
            url: string;
            type: "article" | "video" | "documentation";
        }>;
        initialCode: string;
        language: string;
    };
}

export default function ExerciseLayout({ exercise }: ExerciseLayoutProps) {
    const [isTheoryCollapsed, setIsTheoryCollapsed] = useState(false);

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-[--bg-color-dark]">
            {/* Theory Panel */}
            <motion.div
                initial={false}
                animate={{ width: isTheoryCollapsed ? "0px" : "33.333333%" }}
                transition={{ duration: 0.3 }}
                className={cn(
                    "relative border-r border-[--border-color] bg-[--card-bg]",
                    isTheoryCollapsed ? "w-0" : "w-1/3"
                )}
            >
                <TheoryPanel exercise={exercise} />

                {/* Collapse Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-[--card-bg] border border-[--border-color] rounded-full shadow-lg hover:bg-[--card-hover]"
                    onClick={() => setIsTheoryCollapsed(!isTheoryCollapsed)}
                >
                    {isTheoryCollapsed ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <ChevronLeft className="w-4 h-4" />
                    )}
                </Button>
            </motion.div>

            {/* Code Editor */}
            <motion.div
                initial={false}
                animate={{
                    width: isTheoryCollapsed ? "100%" : "66.666667%",
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                    "relative",
                    isTheoryCollapsed ? "w-full" : "w-2/3"
                )}
            >
                <CodeEditor
                    initialCode={exercise.initialCode}
                    language={exercise.language}
                    exerciseId={exercise.id}
                />
            </motion.div>
        </div>
    );
}
