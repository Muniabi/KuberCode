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
} from "lucide-react";
import Roadmap from "@/components/roadmap";
import { useState, useEffect } from "react";

interface CourseContentProps {
    courseId: string;
}

const CourseContent = ({ courseId }: CourseContentProps) => {
    const course = MOCK_COURSES.find((c) => c.id === courseId);

    if (!course) {
        notFound();
    }

    console.log("Found course:", course); // Добавим для отладки
    console.log(
        "Available course IDs:",
        MOCK_COURSES.map((c) => c.id)
    );
    console.log("Requested course ID:", courseId);

    const [activeTab, setActiveTab] = useState("overview");

    const progress = {
        completed: 3,
        total: 10,
        currentTopic: "Основы JavaScript",
        nextTopic: "Работа с DOM",
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
                                <Button
                                    size="lg"
                                    className="bg-purple-600 hover:bg-purple-700"
                                >
                                    Начать обучение
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
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
                <Tabs defaultValue="overview" className="space-y-8">
                    <TabsList className="w-full justify-start border-b">
                        <TabsTrigger value="overview">Обзор</TabsTrigger>
                        <TabsTrigger value="curriculum">Программа</TabsTrigger>
                        <TabsTrigger value="instructor">
                            Преподаватель
                        </TabsTrigger>
                        <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-8">
                        {/* Прогресс обучения */}
                        <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                            <h3 className="text-xl font-semibold mb-4">
                                Прогресс обучения
                            </h3>
                            <Progress value={30} className="mb-4" />
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>Пройдено: 3 из 10 уроков</span>
                                <span>30% курса завершено</span>
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

                    <TabsContent value="curriculum">
                        <Accordion type="single" collapsible className="w-full">
                            {[1, 2, 3].map((module) => (
                                <AccordionItem
                                    key={module}
                                    value={`module-${module}`}
                                >
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                                {module}
                                            </div>
                                            <div className="text-left">
                                                <h4 className="font-medium">
                                                    Модуль {module}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    4 урока • 2 часа
                                                </p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-4 pl-12">
                                            {[1, 2, 3, 4].map((lesson) => (
                                                <div
                                                    key={lesson}
                                                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
                                                >
                                                    <BookOpen className="w-5 h-5 text-gray-400" />
                                                    <div>
                                                        <h5 className="font-medium">
                                                            Урок {lesson}
                                                        </h5>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            30 минут
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </TabsContent>

                    <TabsContent value="instructor">
                        <div className="flex items-start gap-6">
                            <div className="relative w-32 h-32 rounded-xl overflow-hidden">
                                <Image
                                    src={course.author.avatar}
                                    alt={course.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-2">
                                    {course.author.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {course.author.role}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Опытный разработчик с более чем 10-летним
                                    стажем в индустрии. Работал в крупных
                                    технологических компаниях и руководил
                                    командами разработчиков. Страстно увлечен
                                    обучением и помощью другим в освоении
                                    программирования.
                                </p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="reviews">
                        <div className="space-y-6">
                            {[1, 2, 3].map((review) => (
                                <div
                                    key={review}
                                    className="p-6 rounded-xl border border-gray-200 dark:border-gray-800"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                            <Image
                                                src="/avatars/placeholder.jpg"
                                                alt="User"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">
                                                Студент {review}
                                            </h4>
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Отличный курс! Материал подается понятно
                                        и структурировано. Особенно понравились
                                        практические задания и поддержка
                                        преподавателя.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </Container>
        </div>
    );
};

export default CourseContent;
