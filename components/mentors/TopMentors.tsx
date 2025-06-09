import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Trophy, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TopMentor {
    id: number;
    name: string;
    photo: string;
    role: string;
    rating: number;
    sessionsThisMonth: number;
    technologies: string[];
    achievement: "gold" | "silver" | "bronze";
}

const ACHIEVEMENT_ICONS = {
    gold: { icon: Trophy, color: "text-yellow-400" },
    silver: { icon: Trophy, color: "text-zinc-400" },
    bronze: { icon: Trophy, color: "text-amber-700" },
};

export default function TopMentors() {
    const [topMentors, setTopMentors] = useState<TopMentor[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopMentors = async () => {
            setIsLoading(true);
            try {
                // TODO: Replace with actual API call
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // const response = await fetch("/api/mentors/top");
                // const data = await response.json();

                // Simulate API response
                setTopMentors([
                    {
                        id: 1,
                        name: "Александр Иванов",
                        photo: "/mentors/alexander.jpg",
                        role: "Senior Frontend Developer",
                        rating: 4.9,
                        sessionsThisMonth: 45,
                        technologies: ["React", "TypeScript", "Next.js"],
                        achievement: "gold",
                    },
                    {
                        id: 2,
                        name: "Мария Петрова",
                        photo: "/mentors/maria.jpg",
                        role: "Full Stack Developer",
                        rating: 4.8,
                        sessionsThisMonth: 38,
                        technologies: ["Node.js", "React", "PostgreSQL"],
                        achievement: "silver",
                    },
                    {
                        id: 3,
                        name: "Дмитрий Смирнов",
                        photo: "/mentors/dmitry.jpg",
                        role: "Mobile Developer",
                        rating: 4.7,
                        sessionsThisMonth: 32,
                        technologies: ["React Native", "Flutter"],
                        achievement: "bronze",
                    },
                ]);
            } catch (error) {
                console.error("Error fetching top mentors:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopMentors();
    }, []);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Топ менторов месяца</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                        <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
                                    <div className="flex gap-2">
                                        {[1, 2].map((j) => (
                                            <div
                                                key={j}
                                                className="h-6 w-16 bg-zinc-200 dark:bg-zinc-700 rounded"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
                Топ менторов месяца
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topMentors.map((mentor, index) => {
                    const AchievementIcon =
                        ACHIEVEMENT_ICONS[mentor.achievement].icon;
                    return (
                        <motion.div
                            key={mentor.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                                <div
                                    className={`absolute top-4 right-4 ${
                                        ACHIEVEMENT_ICONS[mentor.achievement]
                                            .color
                                    }`}
                                >
                                    <AchievementIcon className="w-6 h-6" />
                                </div>
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                            <Image
                                                src={mentor.photo}
                                                alt={mentor.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">
                                                {mentor.name}
                                            </h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                                {mentor.role}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 text-yellow-400" />
                                            <span className="font-medium">
                                                {mentor.rating}
                                            </span>
                                            <span className="text-zinc-600 dark:text-zinc-400">
                                                • {mentor.sessionsThisMonth}{" "}
                                                сессий в этом месяце
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {mentor.technologies.map((tech) => (
                                                <Badge
                                                    key={tech}
                                                    variant="secondary"
                                                    className="bg-zinc-100 dark:bg-white/5"
                                                >
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
