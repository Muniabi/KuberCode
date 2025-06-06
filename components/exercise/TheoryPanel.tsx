import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Video, FileText, ExternalLink, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";

interface TheoryPanelProps {
    exercise: {
        title: string;
        description: string;
        theory: string;
        resources: Array<{
            title: string;
            url: string;
            type: "article" | "video" | "documentation";
        }>;
    };
}

const ResourceIcon = {
    article: FileText,
    video: Video,
    documentation: Book,
};

export default function TheoryPanel({ exercise }: TheoryPanelProps) {
    const [activeTab, setActiveTab] = useState<"theory" | "task">("theory");
    const [isResourcesExpanded, setIsResourcesExpanded] = useState(true);

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-2 p-4 border-b border-[--border-color]">
                <Button
                    variant={activeTab === "theory" ? "default" : "ghost"}
                    className={cn(
                        "flex-1",
                        activeTab === "theory"
                            ? "bg-gradient-to-r from-[--purple] to-[--button-bg] text-white"
                            : "text-[--text-secondary] hover:text-[--text-color]"
                    )}
                    onClick={() => setActiveTab("theory")}
                >
                    Теория
                </Button>
                <Button
                    variant={activeTab === "task" ? "default" : "ghost"}
                    className={cn(
                        "flex-1",
                        activeTab === "task"
                            ? "bg-gradient-to-r from-[--purple] to-[--button-bg] text-white"
                            : "text-[--text-secondary] hover:text-[--text-color]"
                    )}
                    onClick={() => setActiveTab("task")}
                >
                    Задача
                </Button>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-[--text-color]">
                        {exercise.title}
                    </h1>

                    {/* Main Content */}
                    <div className="prose prose-invert max-w-none">
                        <ReactMarkdown>
                            {activeTab === "theory"
                                ? exercise.theory
                                : exercise.description}
                        </ReactMarkdown>
                    </div>

                    {/* Resources */}
                    <div className="pt-6 border-t border-[--border-color]">
                        <Button
                            variant="ghost"
                            className="w-full flex items-center justify-between text-[--text-secondary] hover:text-[--text-color]"
                            onClick={() =>
                                setIsResourcesExpanded(!isResourcesExpanded)
                            }
                        >
                            <span className="text-lg font-semibold">
                                Материалы
                            </span>
                            <ChevronDown
                                className={cn(
                                    "w-5 h-5 transition-transform",
                                    isResourcesExpanded ? "rotate-180" : ""
                                )}
                            />
                        </Button>

                        {isResourcesExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-2 space-y-2"
                            >
                                {exercise.resources.map((resource, index) => {
                                    const Icon = ResourceIcon[resource.type];
                                    return (
                                        <a
                                            key={index}
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 rounded-lg bg-[--card-hover] hover:bg-[--card-hover-darker] transition-colors group"
                                        >
                                            <Icon className="w-5 h-5 text-[--purple]" />
                                            <span className="flex-1 text-[--text-secondary] group-hover:text-[--text-color] transition-colors">
                                                {resource.title}
                                            </span>
                                            <ExternalLink className="w-4 h-4 text-[--text-secondary] group-hover:text-[--text-color]" />
                                        </a>
                                    );
                                })}
                            </motion.div>
                        )}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
