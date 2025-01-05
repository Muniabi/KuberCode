"use client";

import { Course } from "@/types/course";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Sparkles, Star, Users, Trophy } from "lucide-react";

interface CourseCardProps {
    course: {
        id: string;
        title: string;
        author: {
            name: string;
            avatar: string;
        };
        level: string;
        duration: string;
        description: string;
        price: {
            current: number;
            old?: number;
        };
        tags: string[];
        logo: string;
        isFree: boolean;
        direction: string;
    };
}

export function CourseCard({ course }: CourseCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/courses/${course.id}`);
    };

    return (
        <Card
            className="overflow-hidden bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 h-full cursor-pointer transition-all hover:shadow-lg"
            onClick={handleClick}
        >
            <CardContent className="p-0 h-full flex flex-col">
                <div className="relative h-[300px] w-full">
                    <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                    />
                    {course.isPopular && (
                        <Badge
                            variant="secondary"
                            className="absolute top-4 left-4 bg-white dark:bg-zinc-800"
                        >
                            <Sparkles className="w-3 h-3 mr-1 text-amber-500" />
                            Популярный курс
                        </Badge>
                    )}
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Badge
                                variant="outline"
                                className="bg-gray-50 dark:bg-zinc-800"
                            >
                                {course.duration}
                            </Badge>
                            {course.hasEmployment && (
                                <Badge
                                    variant="outline"
                                    className="bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                                >
                                    С трудоустройством
                                </Badge>
                            )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {course.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            {course.description}
                        </p>
                    </div>

                    <div className="py-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl">
                        <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-zinc-700">
                            <div className="px-4 text-center">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {course.rating}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Рейтинг
                                </div>
                            </div>

                            <div className="px-4 text-center">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                    <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {course.studentsCount}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Учеников
                                </div>
                            </div>

                            <div className="px-4 text-center">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                    <Trophy className="w-4 h-4 text-emerald-500" />
                                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {course.completionRate}%
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Завершили
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={course.author.avatar}
                                alt={course.author.name}
                            />
                            <AvatarFallback>
                                {course.author.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium leading-none">
                                {course.author.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Автор курса
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
