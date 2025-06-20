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
    if (sessions.length === 0) {
        return (
            <div className="text-center py-8 text-zinc-500 dark:text-zinc-400 h-full flex items-center justify-center">
                <p>У вас пока нет запланированных сессий</p>
            </div>
        );
    }
    return (
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
    );
}
