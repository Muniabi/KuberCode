import { useState } from "react";
import { Calendar, Clock, Video, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface QuickBookProps {
    mentorName: string;
    mentorId: string | number;
    availability: string;
    className?: string;
}

const VIDEO_PLATFORMS = [
    { value: "jitsi", label: "Jitsi Meet", icon: "🎥" },
    { value: "google", label: "Google Meet", icon: "👥" },
    { value: "custom", label: "Свой вариант", icon: "🔗" },
];

export default function QuickBook({
    mentorName,
    mentorId,
    availability,
    className = "",
}: QuickBookProps) {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [customTime, setCustomTime] = useState("");
    const [duration, setDuration] = useState("");
    const [isBooking, setIsBooking] = useState(false);
    const [videoPlatform, setVideoPlatform] = useState("jitsi");
    const [customLink, setCustomLink] = useState("");

    const handleBook = async () => {
        if (!selectedDate || !customTime || !duration) return;

        setIsBooking(true);
        try {
            // В реальном приложении здесь будет API-запрос
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Симуляция успешного бронирования
            alert("Сессия успешно забронирована!");
        } catch (error) {
            console.error("Ошибка при бронировании:", error);
            alert("Произошла ошибка при бронировании");
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className={`flex-1 ${className}`}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Быстрая запись
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Записаться к ментору {mentorName}</DialogTitle>
                    <DialogDescription>
                        Выберите удобное время для сессии. {availability}
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="datetime" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="datetime">Дата и время</TabsTrigger>
                        <TabsTrigger value="connection">
                            Способ связи
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="datetime" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Выберите дату</Label>
                                <CalendarPicker
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    locale={ru}
                                    className="rounded-md border"
                                    disabled={(date) =>
                                        date < new Date() ||
                                        date >
                                            new Date(
                                                new Date().setMonth(
                                                    new Date().getMonth() + 2
                                                )
                                            )
                                    }
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Укажите время</Label>
                                    <div className="flex gap-2 items-center">
                                        <Input
                                            type="time"
                                            value={customTime}
                                            onChange={(e) =>
                                                setCustomTime(e.target.value)
                                            }
                                            className="flex-1"
                                            min="09:00"
                                            max="21:00"
                                        />
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <Info className="w-4 h-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        Доступное время: с 9:00
                                                        до 21:00
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Длительность</Label>
                                    <Input
                                        type="number"
                                        min="30"
                                        max="180"
                                        step="15"
                                        value={duration}
                                        onChange={(e) =>
                                            setDuration(e.target.value)
                                        }
                                        placeholder="Минут (от 30 до 180)"
                                    />
                                </div>

                                {selectedDate && (
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Выбрано:{" "}
                                        {format(selectedDate, "d MMMM yyyy", {
                                            locale: ru,
                                        })}
                                        {customTime && `, ${customTime}`}
                                        {duration && `, ${duration} минут`}
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="connection" className="space-y-4">
                        <div className="space-y-2">
                            <Label>Платформа для видеозвонка</Label>
                            <Select
                                value={videoPlatform}
                                onValueChange={setVideoPlatform}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите платформу" />
                                </SelectTrigger>
                                <SelectContent>
                                    {VIDEO_PLATFORMS.map((platform) => (
                                        <SelectItem
                                            key={platform.value}
                                            value={platform.value}
                                        >
                                            <span className="flex items-center gap-2">
                                                {platform.icon} {platform.label}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {videoPlatform === "custom" && (
                            <div className="space-y-2">
                                <Label>Ссылка на видеозвонок</Label>
                                <Input
                                    type="url"
                                    value={customLink}
                                    onChange={(e) =>
                                        setCustomLink(e.target.value)
                                    }
                                    placeholder="https://..."
                                />
                            </div>
                        )}

                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {videoPlatform === "jitsi" &&
                                "Ссылка на Jitsi Meet будет создана автоматически"}
                            {videoPlatform === "google" &&
                                "Ссылка на Google Meet будет отправлена на вашу почту"}
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        onClick={handleBook}
                        disabled={
                            !selectedDate ||
                            !customTime ||
                            !duration ||
                            isBooking
                        }
                        className="bg-[--purple] hover:bg-[--button-bg] text-white"
                    >
                        <Clock className="w-4 h-4 mr-2" />
                        {isBooking ? "Бронирование..." : "Забронировать"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
