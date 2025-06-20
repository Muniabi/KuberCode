import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Zap } from "lucide-react";

export function LearningProgress() {
    const overallProgress = 72; // Mock data

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Прогресс обучения</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-6">
                <div className="relative h-40 w-40">
                    <svg className="h-full w-full" viewBox="0 0 36 36">
                        <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e6e6e6"
                            strokeWidth="3"
                        />
                        <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="var(--purple)"
                            strokeWidth="3"
                            strokeDasharray={`${overallProgress}, 100`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">
                            {overallProgress}%
                        </span>
                        <span className="text-sm text-zinc-500">пройдено</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center text-sm w-full">
                    <div className="flex flex-col items-center gap-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-3">
                        <PieChart className="w-5 h-5 text-zinc-500" />
                        <span className="font-semibold">3 / 5</span>
                        <span className="text-xs text-zinc-500">Языков</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-3">
                        <Zap className="w-5 h-5 text-zinc-500" />
                        <span className="font-semibold">120 ч</span>
                        <span className="text-xs text-zinc-500">Времени</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
