"use client";

import { useState, useEffect } from "react";
import Roadmap from "@/components/roadmap";
import SimpleRoadmap from "@/components/SimpleRoadmap";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const HomeworksPage = () => {
    const [progress, setProgress] = useState({
        completed: 3,
        total: 12,
        currentTopic: "Строки в JavaScript",
        nextTopic: "Логические значения",
    });

    const isMobile = useIsMobile();

    // В реальном приложении здесь будет запрос к API
    useEffect(() => {
        // fetchProgress().then(setProgress);
    }, []);

    const progressPercentage = (progress.completed / progress.total) * 100;

    const topics = [
        { label: "Основы", completed: true },
        { label: "Числа", completed: true },
        { label: "Операторы", completed: true },
        { label: "Строки", completed: false },
        { label: "Логические значения", completed: false },
    ];

    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/">
                                    Главная
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Домашки</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-4 dark:text-white">
                            Ваш путь в JavaScript
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                            Добро пожаловать в интерактивный курс по JavaScript!
                            Здесь вы найдете структурированный план обучения,
                            который поможет вам освоить язык программирования
                            шаг за шагом.
                        </p>
                        <div className="grid gap-6 md:grid-cols-3 mb-12">
                            <div className="p-6 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800/50 backdrop-blur-sm">
                                <h3 className="font-semibold mb-3 dark:text-white text-lg">
                                    Прогресс обучения
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {progress.completed} из {progress.total} тем
                                    пройдено
                                </p>
                                <div className="mt-3 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-full rounded-full bg-green-500 dark:bg-green-400 transition-all duration-500"
                                        style={{
                                            width: `${progressPercentage}%`,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="p-4 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800">
                                <h3 className="font-semibold mb-2 dark:text-white">
                                    Текущая тема
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {progress.currentTopic}
                                </p>
                            </div>
                            <div className="p-4 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800">
                                <h3 className="font-semibold mb-2 dark:text-white">
                                    Следующая тема
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {progress.nextTopic}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-6 dark:text-white">
                            Карта обучения
                        </h2>
                        <div className="rounded-xl border dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 overflow-hidden">
                            {isMobile ? (
                                <SimpleRoadmap topics={topics} />
                            ) : (
                                <Roadmap
                                    completed={progress.completed}
                                    total={progress.total}
                                    currentTopic={progress.currentTopic}
                                    nextTopic={progress.nextTopic}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarInset>
    );
};

export default HomeworksPage;
