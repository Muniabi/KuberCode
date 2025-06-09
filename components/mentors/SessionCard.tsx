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

interface SessionCardProps {
    mentorName: string;
    mentorAvatar: string;
    date: Date;
    duration: number;
    communicationType: string;
    communicationLink?: string;
    onCancel?: () => void;
    onReschedule?: () => void;
}

export function SessionCard({
    mentorName,
    mentorAvatar,
    date,
    duration,
    communicationType,
    communicationLink,
    onCancel,
    onReschedule,
}: SessionCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                        src={mentorAvatar}
                        alt={mentorName}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <CardTitle className="text-lg">{mentorName}</CardTitle>
                    <CardDescription>Ментор</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CalendarDays className="w-4 h-4" />
                    <span>{format(date, "d MMMM yyyy", { locale: ru })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{format(date, "HH:mm")}</span>
                    <span>({duration} час.)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Video className="w-4 h-4" />
                    <span>{communicationType}</span>
                </div>
                {communicationLink && (
                    <Button
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => window.open(communicationLink, "_blank")}
                    >
                        Присоединиться
                    </Button>
                )}
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button
                    variant="outline"
                    className="flex-1"
                    onClick={onReschedule}
                >
                    Перенести
                </Button>
                <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={onCancel}
                >
                    Отменить
                </Button>
            </CardFooter>
        </Card>
    );
}
