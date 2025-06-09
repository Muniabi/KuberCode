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
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-purple-900/20 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center gap-4 pb-3">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500/20 dark:ring-purple-500/30">
                        <img
                            src={mentorAvatar}
                            alt={mentorName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                </div>
                <div>
                    <CardTitle className="text-lg font-medium bg-gradient-to-br from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                        {mentorName}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                        Ментор
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-3 pb-3">
                <div className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-purple-50 dark:bg-purple-900/20">
                        <CalendarDays className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                    </div>
                    <span>{format(date, "d MMMM yyyy", { locale: ru })}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-50 dark:bg-blue-900/20">
                        <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span>{format(date, "HH:mm")}</span>
                        <span className="text-gray-400 dark:text-gray-500">
                            •
                        </span>
                        <span>{duration} час.</span>
                    </div>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-green-50 dark:bg-green-900/20">
                        <Video className="w-4 h-4 text-green-500 dark:text-green-400" />
                    </div>
                    <span>{communicationType}</span>
                </div>
                {communicationLink && (
                    <Button
                        variant="outline"
                        className="w-full mt-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-100 dark:border-purple-800 hover:border-purple-200 dark:hover:border-purple-700 text-purple-700 dark:text-purple-300"
                        onClick={() => window.open(communicationLink, "_blank")}
                    >
                        Присоединиться
                    </Button>
                )}
            </CardContent>
            <CardFooter className="flex gap-2 pt-0">
                <Button
                    variant="ghost"
                    className="flex-1 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300"
                    onClick={onReschedule}
                >
                    Перенести
                </Button>
                <Button
                    variant="ghost"
                    className="flex-1 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                    onClick={onCancel}
                >
                    Отменить
                </Button>
            </CardFooter>
        </Card>
    );
}
