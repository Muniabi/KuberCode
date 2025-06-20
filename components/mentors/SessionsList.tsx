import { SessionCard } from "./SessionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

interface Session {
    id: string;
    mentorName: string;
    mentorAvatar: string;
    date: Date;
    duration: number;
    communicationType: string;
    communicationLink?: string;
}

interface SessionsListProps {
    sessions: Session[];
    onCancel?: (sessionId: string) => void;
    onReschedule?: (sessionId: string) => void;
    onJoinSession?: (
        sessionId: string,
        communicationType: string,
        communicationLink: string
    ) => void;
}

export function SessionsList({
    sessions,
    onCancel,
    onReschedule,
    onJoinSession,
}: SessionsListProps) {
    return (
        <Card className="h-full">
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
                {sessions.length === 0 ? (
                    <div className="text-center py-8 text-zinc-500 dark:text-zinc-400 h-full flex items-center justify-center">
                        <p>У вас пока нет запланированных сессий</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {sessions.map((session) => (
                            <SessionCard
                                key={session.id}
                                {...session}
                                onCancel={() => onCancel?.(session.id)}
                                onReschedule={() => onReschedule?.(session.id)}
                                onJoinClick={() =>
                                    session.communicationLink &&
                                    onJoinSession?.(
                                        session.id,
                                        session.communicationType,
                                        session.communicationLink
                                    )
                                }
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
