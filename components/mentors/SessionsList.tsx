import { SessionCard } from "./SessionCard";

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
}

export function SessionsList({
    sessions,
    onCancel,
    onReschedule,
}: SessionsListProps) {
    if (sessions.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                У вас пока нет запланированных сессий
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
                <SessionCard
                    key={session.id}
                    {...session}
                    onCancel={() => onCancel?.(session.id)}
                    onReschedule={() => onReschedule?.(session.id)}
                />
            ))}
        </div>
    );
}
