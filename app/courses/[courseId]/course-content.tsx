"use client";

import { Container } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { MOCK_COURSES } from "@/store/courses";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import {
    Star,
    Clock,
    Trophy,
    Users,
    BookOpen,
    CheckCircle2,
    ArrowRight,
    CheckCircle,
    Lock,
} from "lucide-react";
import Roadmap from "@/components/roadmap";
import { useState, useEffect } from "react";
import { CourseReviews } from "@/components/sections/course-reviews";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { useCoursePurchase } from "@/hooks/useCoursePurchase";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface CourseContentProps {
    courseId: string;
}

const CourseContent = ({ courseId }: CourseContentProps) => {
    const course = MOCK_COURSES.find((c) => c.id === courseId);
    const { toast } = useToast();
    const userId = "user-123"; // В реальном приложении получаем из авторизации
    const router = useRouter();

    const { progress, markLessonComplete } = useCourseProgress(
        courseId,
        userId
    );
    const { purchaseCourse, isLoading: isPurchasing } = useCoursePurchase();
    const [selectedModule, setSelectedModule] = useState<string | null>(null);

    if (!course) {
        notFound();
    }

    console.log("Found course:", course); // Добавим для отладки
    console.log(
        "Available course IDs:",
        MOCK_COURSES.map((c) => c.id)
    );
    console.log("Requested course ID:", courseId);

    const handlePurchase = () => {
        router.push(`/courses/${courseId}/purchase`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-black">
            {/* Герой-секция */}
            <div className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-transparent to-blue-500/30 dark:from-purple-500/10 dark:to-blue-500/10 backdrop-blur-3xl" />
                <Container className="relative px-4 py-12 sm:px-6 lg:px-8">
                    <Breadcrumb className="mb-6">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">
                                    Главная
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/courses">
                                    Курсы
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{course.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Badge
                                    variant="secondary"
                                    className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                >
                                    {course.tags[0]}
                                </Badge>
                                {course.rating && (
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-medium">
                                            {course.rating.value}
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            ({course.rating.count} отзывов)
                                        </span>
                                    </div>
                                )}
                            </div>

                            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                                {course.title}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap gap-6 mb-8">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-gray-400" />
                                    <span>{course.level}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-gray-400" />
                                    <span>2,156 студентов</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {progress ? (
                                    <div className="space-y-4">
                                        <Progress
                                            value={progress.totalProgress}
                                            className="w-full"
                                        />
                                        <p className="text-sm text-gray-600">
                                            Прогресс: {progress.totalProgress}%
                                        </p>
                                    </div>
                                ) : (
                                    <Button
                                        size="lg"
                                        onClick={handlePurchase}
                                        disabled={isPurchasing}
                                    >
                                        {course.isFree
                                            ? "Начать обучение"
                                            : `Купить за ${course.price.current.toLocaleString(
                                                  "ru-RU"
                                              )} ₽`}
                                    </Button>
                                )}
                                <div className="text-right">
                                    {course.isFree ? (
                                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            Бесплатно
                                        </span>
                                    ) : (
                                        <div>
                                            <span className="text-2xl font-bold">
                                                {course.price.current.toLocaleString(
                                                    "ru-RU"
                                                )}{" "}
                                                ₽
                                            </span>
                                            {course.price.old && (
                                                <span className="ml-2 text-gray-500 line-through">
                                                    {course.price.old.toLocaleString(
                                                        "ru-RU"
                                                    )}{" "}
                                                    ₽
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="relative aspect-video rounded-xl overflow-hidden">
                            <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                        </div>
                    </div>
                </Container>
            </div>

            {/* Основной контент */}
            <Container className="px-4 py-12 sm:px-6 lg:px-8">
                <Tabs defaultValue="curriculum" className="space-y-8">
                    <TabsList className="w-full justify-start border-b">
                        <TabsTrigger value="curriculum">Программа</TabsTrigger>
                        <TabsTrigger value="overview">Обзор</TabsTrigger>
                        <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                        <TabsTrigger value="achievements">
                            Достижения
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="curriculum" className="space-y-8">
                        {/* Прогресс обучения */}
                        <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                            <h3 className="text-xl font-semibold mb-4">
                                Прогресс обучения
                            </h3>
                            <Progress
                                value={progress?.totalProgress || 0}
                                className="mb-4"
                            />
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>
                                    Пройдено: {progress?.completed || 0} из{" "}
                                    {progress?.total || 0} уроков
                                </span>
                                <span>
                                    Прогресс: {progress?.totalProgress || 0}%
                                </span>
                            </div>
                        </div>

                        {/* Карта обучения */}
                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm p-6">
                            <h3 className="text-xl font-semibold mb-4">
                                Карта обучения
                            </h3>
                            <Roadmap progress={progress} />
                        </div>

                        {/* Чему вы научитесь */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">
                                Чему вы научитесь
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "Основы JavaScript и его применение",
                                    "Работа с DOM и событиями",
                                    "Асинхронное программирование",
                                    "Работа с API и сетевыми запросами",
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-2"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="overview" className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-medium mb-4">
                                    Чему вы научитесь
                                </h3>
                                <ul className="space-y-2">
                                    {course.skills?.map((skill, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span>{skill}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium mb-4">
                                    Требования
                                </h3>
                                <ul className="space-y-2">
                                    {course.requirements?.map(
                                        (requirement, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-2"
                                            >
                                                <span>•</span>
                                                <span>{requirement}</span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="reviews">
                        <CourseReviews courseId={courseId} />
                    </TabsContent>

                    <TabsContent value="achievements">
                        {/* Добавьте компонент CourseAchievements */}
                    </TabsContent>
                </Tabs>
            </Container>
        </div>
    );
};

export default CourseContent;
