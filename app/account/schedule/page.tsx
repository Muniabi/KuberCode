"use client";

import { useState } from "react";
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
import { SessionsList } from "@/components/mentors/SessionsList";
import { Calendar } from "@/components/ui/calendar";
import { ru } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Тестовые данные для демонстрации
const mockSessions = [
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
    {
        id: "3",
        mentorName: "Дмитрий Сидоров",
        mentorAvatar: "https://i.pravatar.cc/150?img=3",
        date: new Date(2024, 3, 17, 10, 0),
        duration: 2,
        communicationType: "Zoom",
        communicationLink: "https://zoom.us/test-session-3",
    },
];

const SchedulePage = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

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
                                <BreadcrumbPage>Расписание</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex flex-1 gap-4 p-4 pt-0">
                <div className="flex-1">
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Предстоящие сессии</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SessionsList
                                sessions={mockSessions}
                                onCancel={handleCancel}
                                onReschedule={handleReschedule}
                            />
                        </CardContent>
                    </Card>
                </div>
                <div className="hidden lg:block w-[400px]">
                    <Card>
                        <CardHeader>
                            <CardTitle>Календарь</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                locale={ru}
                                className="rounded-md border"
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </SidebarInset>
    );
};

export default SchedulePage;
