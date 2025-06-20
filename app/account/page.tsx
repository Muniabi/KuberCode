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
import { SessionsList } from "@/components/mentors/SessionsList";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { CurrentLanguages } from "@/components/account/CurrentLanguages";
import { Homeworks } from "@/components/account/Homeworks";
import { LearningProgress } from "@/components/account/LearningProgress";

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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-xl font-semibold">
                                    Ближайшие сессии
                                </h2>
                                <Link href="/account/schedule">
                                    <Button variant="outline" size="sm">
                                        <CalendarDays className="w-4 h-4 mr-2" />
                                        Все сессии
                                    </Button>
                                </Link>
                            </div>
                            <SessionsList
                                sessions={mockUpcomingSessions.slice(0, 2)}
                                onCancel={handleCancel}
                                onReschedule={handleReschedule}
                            />
                        </div>
                        <div className="lg:col-span-1">
                            <LearningProgress />
                        </div>
                        <div className="lg:col-span-2">
                            <CurrentLanguages />
                        </div>
                        <div className="lg:col-span-1">
                            <Homeworks />
                        </div>
                    </div>
                )}
            </div>
        </SidebarInset>
    );
}
