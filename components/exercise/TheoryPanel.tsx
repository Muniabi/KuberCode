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

interface TheoryPanelProps {
    exercise: Exercise;
}

export default function TheoryPanel({ exercise }: TheoryPanelProps) {
    const [activeTab, setActiveTab] = useState<"theory" | "hints" | "solution">(
        "theory"
    );

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
            locked: true,
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
                        disabled={tab.locked}
                    >
                        {tab.locked ? (
                            <Lock className="w-4 h-4" />
                        ) : (
                            <tab.icon className="w-4 h-4" />
                        )}
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

                {activeTab === "solution" && (
                    <div className="text-center py-8">
                        <Lock className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">
                            Решение заблокировано
                        </h3>
                        <p className="text-white/60 text-sm max-w-sm mx-auto">
                            Сначала попробуйте решить задачу самостоятельно.
                            Используйте подсказки, если застряли.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
