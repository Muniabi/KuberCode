import { CalendarDays, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useState } from "react";
import { RescheduleDialog } from "./RescheduleDialog";
import { CancelDialog } from "./CancelDialog";
import { JoinSessionDialog } from "./JoinSessionDialog";

interface SessionCardProps {
    id: string;
    mentorName: string;
    mentorAvatar: string;
    date: Date;
    duration: number;
    communicationType: string;
    communicationLink?: string;
    onCancel?: () => void;
    onReschedule?: (
        newDate: Date,
        newTime: string,
        newDuration: string
    ) => void;
}

export function SessionCard({
    id,
    mentorName,
    mentorAvatar,
    date,
    duration,
    communicationType,
    communicationLink,
    onCancel,
    onReschedule,
}: SessionCardProps) {
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);

    return (
        <>
            <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] bg-white dark:bg-zinc-900 border border-purple-100/50 dark:border-lime-900/30">
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500/30 dark:ring-lime-400/30 transition-all group-hover:ring-purple-500/50 dark:group-hover:ring-lime-400/50">
                            <img
                                src={mentorAvatar}
                                alt={mentorName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-lg" />
                    </div>
                    <div>
                        <CardTitle className="text-lg font-medium bg-gradient-to-br from-purple-600 to-purple-400 dark:from-lime-300 dark:to-lime-500 bg-clip-text text-transparent">
                            {mentorName}
                        </CardTitle>
                        <CardDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                            Ментор
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3 pb-3">
                    <div className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-purple-100/50 dark:bg-lime-900/20 transition-colors group-hover:bg-purple-100 dark:group-hover:bg-lime-900/30">
                            <CalendarDays className="w-4 h-4 text-purple-500 dark:text-lime-400" />
                        </div>
                        <span>
                            {format(date, "d MMMM yyyy", { locale: ru })}
                        </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-purple-100/50 dark:bg-lime-900/20 transition-colors group-hover:bg-purple-100 dark:group-hover:bg-lime-900/30">
                            <Clock className="w-4 h-4 text-purple-500 dark:text-lime-400" />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span>{format(date, "HH:mm")}</span>
                            <span className="text-zinc-400 dark:text-zinc-500">
                                •
                            </span>
                            <span>{duration} час.</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-purple-100/50 dark:bg-lime-900/20 transition-colors group-hover:bg-purple-100 dark:group-hover:bg-lime-900/30">
                            <Video className="w-4 h-4 text-purple-500 dark:text-lime-400" />
                        </div>
                        <span>{communicationType}</span>
                    </div>
                    {communicationLink && (
                        <Button
                            variant="outline"
                            className="w-full mt-3 bg-gradient-to-r from-purple-500/10 to-purple-500/5 dark:from-lime-400/10 dark:to-lime-400/5 border-purple-200 dark:border-lime-900/50 hover:border-purple-300 dark:hover:border-lime-800 text-purple-700 dark:text-lime-400 transition-all hover:bg-purple-100/50 dark:hover:bg-lime-900/20"
                            onClick={() => setIsJoinDialogOpen(true)}
                        >
                            Присоединиться
                        </Button>
                    )}
                </CardContent>
                <CardFooter className="flex gap-2 pt-0">
                    <Button
                        variant="ghost"
                        className="flex-1 hover:bg-purple-100/50 dark:hover:bg-lime-900/20 text-purple-600 dark:text-lime-400 transition-colors"
                        onClick={() => setIsRescheduleOpen(true)}
                    >
                        Перенести
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex-1 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                        onClick={() => setIsCancelOpen(true)}
                    >
                        Отменить
                    </Button>
                </CardFooter>
            </Card>

            <RescheduleDialog
                isOpen={isRescheduleOpen}
                onClose={() => setIsRescheduleOpen(false)}
                onConfirm={(newDate, newTime, newDuration) => {
                    onReschedule?.(newDate, newTime, newDuration);
                    setIsRescheduleOpen(false);
                }}
                currentDate={date}
                currentDuration={duration}
            />

            <CancelDialog
                isOpen={isCancelOpen}
                onClose={() => setIsCancelOpen(false)}
                onConfirm={() => {
                    onCancel?.();
                    setIsCancelOpen(false);
                }}
                sessionDate={date}
            />
            <JoinSessionDialog
                isOpen={isJoinDialogOpen}
                onClose={() => setIsJoinDialogOpen(false)}
                sessionId={id}
                communicationType={communicationType}
                communicationLink={communicationLink}
            />
        </>
    );
}
