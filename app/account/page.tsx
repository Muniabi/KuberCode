"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionsList } from "@/components/mentors/SessionsList";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

// Тестовые данные для демонстрации
const mockUpcomingSessions = [
    {
        id: "1",
        mentorName: "Александр Иванов",
        mentorAvatar: "https://i.pravatar.cc/150?img=1",
        date: new Date(2024, 3, 15, 14, 30),
        duration: 1,
        communicationType: "Jitsi Meet",
        communicationLink: "https://meet.jit.si/test-session-1",
    },
    {
        id: "2",
        mentorName: "Мария Петрова",
        mentorAvatar: "https://i.pravatar.cc/150?img=2",
        date: new Date(2024, 3, 16, 16, 0),
        duration: 1.5,
        communicationType: "Google Meet",
        communicationLink: "https://meet.google.com/test-session-2",
    },
];

export default function DashboardPage() {
    // Временно для демонстрации
    const isProfileIncomplete = false;

    const handleCancel = (sessionId: string) => {
        console.log("Cancel session:", sessionId);
        // Здесь будет логика отмены сессии
    };

    const handleReschedule = (sessionId: string) => {
        console.log("Reschedule session:", sessionId);
        // Здесь будет логика переноса сессии
    };

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
                                <BreadcrumbPage>Личный кабинет</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {isProfileIncomplete ? (
                    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center">
                        <OnboardingFlow />
                    </div>
                ) : (
                    <>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card className="md:col-span-2">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Ближайшие сессии</CardTitle>
                                    <Link href="/account/schedule">
                                        <Button variant="outline" size="sm">
                                            <CalendarDays className="w-4 h-4 mr-2" />
                                            Все сессии
                                        </Button>
                                    </Link>
                                </CardHeader>
                                <CardContent>
                                    <SessionsList
                                        sessions={mockUpcomingSessions}
                                        onCancel={handleCancel}
                                        onReschedule={handleReschedule}
                                    />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Прогресс обучения</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Здесь будет компонент с прогрессом обучения */}
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Текущие курсы</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Здесь будет список текущих курсов */}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Домашние задания</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Здесь будет список домашних заданий */}
                                </CardContent>
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </SidebarInset>
    );
}
