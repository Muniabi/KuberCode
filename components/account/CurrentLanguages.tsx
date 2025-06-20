import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";

const mockLanguages = [
    {
        id: "react",
        title: "React",
        progress: 65,
        iconUrl: "/svg/react.svg",
    },
    {
        id: "ts",
        title: "TypeScript",
        progress: 30,
        iconUrl: "/svg/TypeScript.svg",
    },
    {
        id: "devops",
        title: "DevOps",
        progress: 80,
        iconUrl: "/svg/docker.svg", // Using Docker icon for DevOps as a placeholder
    },
];

export function CurrentLanguages() {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Изучаемые языки</CardTitle>
                <Link href="/account/languages">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                        Все языки
                    </button>
                </Link>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {mockLanguages.map((lang) => (
                        <div key={lang.id} className="flex items-center gap-4">
                            <Image
                                src={lang.iconUrl}
                                alt={lang.title}
                                width={40}
                                height={40}
                                className="rounded-lg"
                            />
                            <div className="flex-1">
                                <h4 className="font-semibold">{lang.title}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                    <Progress
                                        value={lang.progress}
                                        className="w-full h-2"
                                    />
                                    <span className="text-sm font-medium text-zinc-500 w-10 text-right">
                                        {lang.progress}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
