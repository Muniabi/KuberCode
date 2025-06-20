import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ChevronRight } from "lucide-react";

const mockHomeworks = [
    {
        id: "1",
        course: "React",
        title: "Создать простое SPA",
        dueDate: "2024-07-25",
        status: "Не сдано",
    },
    {
        id: "2",
        course: "TypeScript",
        title: "Настроить Redux Toolkit",
        dueDate: "2024-07-28",
        status: "Сдано",
    },
    {
        id: "3",
        course: "React",
        title: "Кастомные хуки",
        dueDate: "2024-08-01",
        status: "Просрочено",
    },
];

export function Homeworks() {
    const getStatusClass = (status: string) => {
        switch (status) {
            case "Сдано":
                return "text-green-500";
            case "Просрочено":
                return "text-red-500";
            default:
                return "text-yellow-500";
        }
    };

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Домашние задания</CardTitle>
                <Link href="/account/homeworks">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                        Все задания
                    </button>
                </Link>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockHomeworks.map((hw) => (
                        <div
                            key={hw.id}
                            className="flex items-center gap-4 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <FileText className="w-6 h-6 text-zinc-500" />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm">
                                        {hw.course}
                                    </span>
                                    <span className="text-xs text-zinc-500">
                                        •
                                    </span>
                                    <h4 className="font-medium text-sm truncate">
                                        {hw.title}
                                    </h4>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                                    <span>
                                        Сдать до:{" "}
                                        {new Date(
                                            hw.dueDate
                                        ).toLocaleDateString()}
                                    </span>
                                    <span className={getStatusClass(hw.status)}>
                                        ● {hw.status}
                                    </span>
                                </div>
                            </div>
                            <Link href={`/courses/react/homework/${hw.id}`}>
                                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
