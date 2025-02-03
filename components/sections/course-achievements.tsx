import { useEffect, useState } from "react";
import { Award, Trophy, Star, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CourseProgress } from "@/types/course";

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    progress: number;
    isUnlocked: boolean;
    unlockedAt?: string;
}

interface CourseAchievementsProps {
    courseId: string;
    userId: string;
    progress: CourseProgress | null;
}

export const CourseAchievements = ({
    courseId,
    userId,
    progress,
}: CourseAchievementsProps) => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    useEffect(() => {
        // В реальном приложении загружаем с сервера
        const mockAchievements: Achievement[] = [
            {
                id: "1",
                title: "Первые шаги",
                description: "Завершите первый модуль курса",
                icon: <Star className="w-6 h-6 text-yellow-400" />,
                progress: 100,
                isUnlocked: true,
                unlockedAt: "2024-03-15T10:00:00Z",
            },
            {
                id: "2",
                title: "Настойчивый ученик",
                description: "Завершите 5 уроков подряд",
                icon: <Trophy className="w-6 h-6 text-purple-400" />,
                progress: 60,
                isUnlocked: false,
            },
            {
                id: "3",
                title: "Мастер курса",
                description: "Завершите все модули курса",
                icon: <Award className="w-6 h-6 text-blue-400" />,
                progress: 30,
                isUnlocked: false,
            },
        ];

        setAchievements(mockAchievements);
    }, [courseId, userId]);

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
                <div
                    key={achievement.id}
                    className={`p-6 rounded-xl border ${
                        achievement.isUnlocked
                            ? "bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800"
                            : "border-gray-200 dark:border-gray-800"
                    }`}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                achievement.isUnlocked
                                    ? "bg-white dark:bg-gray-800"
                                    : "bg-gray-100 dark:bg-gray-800"
                            }`}
                        >
                            {achievement.icon}
                        </div>
                        <div>
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {achievement.description}
                            </p>
                        </div>
                    </div>
                    <Progress
                        value={achievement.progress}
                        className="h-2 mb-2"
                    />
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                            {achievement.progress}%
                        </span>
                        {achievement.isUnlocked && (
                            <span className="text-green-600 dark:text-green-400">
                                Получено{" "}
                                {new Date(
                                    achievement.unlockedAt!
                                ).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
