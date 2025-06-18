import { useState } from "react";
import {
    Calendar,
    Clock,
    Video,
    Info,
    Copy,
    MessageCircle,
    Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface QuickBookProps {
    mentorName: string;
    mentorId: number;
    availability: string;
    hourlyRate?: number;
    className?: string;
}

const communicationMethods = [
    { id: "jitsi", label: "Jitsi Meet", icon: Video },
    { id: "google-meet", label: "Google Meet", icon: Monitor },
    { id: "zoom", label: "Zoom", icon: Video },
    { id: "telegram", label: "Telegram", icon: MessageCircle },
    { id: "discord", label: "Discord", icon: MessageCircle },
];

export default function QuickBook({
    mentorName,
    mentorId,
    availability,
    hourlyRate = 4500,
    className,
}: QuickBookProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [customTime, setCustomTime] = useState("");
    const [duration, setDuration] = useState("");
    const [step, setStep] = useState(1);
    const [communicationMethod, setCommunicationMethod] = useState<string>();
    const [jitsiLink, setJitsiLink] = useState("");

    const handleContinue = () => {
        if (step === 1 && selectedDate && customTime && duration) {
            setStep(2);
        } else if (step === 2 && communicationMethod) {
            if (communicationMethod === "jitsi") {
                const meetingId = `mentor-${mentorId}-${Date.now()}`;
                setJitsiLink(`https://meet.jit.si/${meetingId}`);
            } else if (communicationMethod === "google-meet") {
                // В реальном приложении здесь будет интеграция с Google Calendar API
                setJitsiLink("https://meet.google.com/new");
            } else if (communicationMethod === "zoom") {
                // В реальном приложении здесь будет интеграция с Zoom API
                setJitsiLink("https://zoom.us/start/videomeeting");
            }
            setStep(3);
        }
    };

    const handleBooking = () => {
        // Формируем URL с параметрами для страницы оплаты
        const params = new URLSearchParams({
            mentorId: mentorId.toString(),
            mentorName,
            date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
            time: customTime,
            duration: duration.toString(),
            hourlyRate: (hourlyRate || 4500).toString(),
            communicationMethod: communicationMethod || "",
        });

        // Перенаправляем на страницу оплаты
        window.location.href = `/payment?${params.toString()}`;
    };

    const copyJitsiLink = () => {
        navigator.clipboard.writeText(jitsiLink);
        toast.success("Ссылка скопирована!");
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className={cn(
                        "bg-[--purple] hover:bg-[--button-bg] text-white",
                        className
                    )}
                >
                    Записаться к ментору
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Запись к ментору {mentorName}</DialogTitle>
                    <DialogDescription>
                        {step === 1 &&
                            `Выберите удобное время для сессии. ${availability}`}
                        {step === 2 && "Выберите способ связи"}
                        {step === 3 && "Подтверждение записи"}
                    </DialogDescription>
                </DialogHeader>

                {step === 1 && (
                    <div className="grid grid-cols-2 gap-4 py-4">
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
                                                    Доступное время: с 9:00 до
                                                    21:00
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Длительность</Label>
                                <Select
                                    value={duration}
                                    onValueChange={setDuration}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите длительность" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1 час</SelectItem>
                                        <SelectItem value="1.5">
                                            1.5 часа
                                        </SelectItem>
                                        <SelectItem value="2">
                                            2 часа
                                        </SelectItem>
                                        <SelectItem value="2.5">
                                            2.5 часа
                                        </SelectItem>
                                        <SelectItem value="3">
                                            3 часа
                                        </SelectItem>
                                        <SelectItem value="3.5">
                                            3.5 часа
                                        </SelectItem>
                                        <SelectItem value="4">
                                            4 часа
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedDate && (
                                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                    Выбрано:{" "}
                                    {format(selectedDate, "d MMMM yyyy", {
                                        locale: ru,
                                    })}
                                    {customTime && `, ${customTime}`}
                                    {duration &&
                                        `, ${
                                            duration === "0.5"
                                                ? "30 минут"
                                                : duration === "1"
                                                ? "1 час"
                                                : `${duration} часа`
                                        }`}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="py-4">
                        <RadioGroup
                            value={communicationMethod}
                            onValueChange={setCommunicationMethod}
                            className="space-y-2"
                        >
                            {communicationMethods.map(
                                ({ id, label, icon: Icon }) => (
                                    <div
                                        key={id}
                                        className={cn(
                                            "flex items-center space-x-2 rounded-md border p-4 cursor-pointer",
                                            communicationMethod === id &&
                                                "border-[--purple] bg-[--purple]/5"
                                        )}
                                        onClick={() =>
                                            setCommunicationMethod(id)
                                        }
                                    >
                                        <RadioGroupItem value={id} id={id} />
                                        <Icon className="w-5 h-5 text-[--purple]" />
                                        <Label
                                            htmlFor={id}
                                            className="flex-1 cursor-pointer"
                                        >
                                            {label}
                                        </Label>
                                    </div>
                                )
                            )}
                        </RadioGroup>
                    </div>
                )}

                {step === 3 && (
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <h4 className="font-medium">
                                Детали бронирования:
                            </h4>
                            <p className="text-sm text-zinc-500">
                                Дата:{" "}
                                {selectedDate &&
                                    format(selectedDate, "d MMMM yyyy", {
                                        locale: ru,
                                    })}
                            </p>
                            <p className="text-sm text-zinc-500">
                                Время: {customTime}
                            </p>
                            <p className="text-sm text-zinc-500">
                                Длительность:{" "}
                                {duration === "1"
                                    ? "1 час"
                                    : `${duration} часа`}
                            </p>
                            <p className="text-sm text-zinc-500">
                                Способ связи:{" "}
                                {
                                    communicationMethods.find(
                                        (m) => m.id === communicationMethod
                                    )?.label
                                }
                            </p>
                        </div>

                        {(communicationMethod === "jitsi" ||
                            communicationMethod === "google-meet" ||
                            communicationMethod === "zoom") && (
                            <div className="space-y-2">
                                <Label>Ссылка для подключения:</Label>
                                <div className="flex gap-2">
                                    <Input value={jitsiLink} readOnly />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={copyJitsiLink}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-sm text-zinc-500">
                                    Ссылка будет доступна в вашем личном
                                    кабинете. Вы сможете подключиться к встрече
                                    непосредственно из него.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <DialogFooter>
                    {step > 1 && (
                        <Button
                            onClick={() => setStep(step - 1)}
                            variant="outline"
                            className="mr-2"
                        >
                            Назад
                        </Button>
                    )}
                    {step < 3 ? (
                        <Button
                            onClick={handleContinue}
                            disabled={
                                (step === 1 &&
                                    (!selectedDate ||
                                        !customTime ||
                                        !duration)) ||
                                (step === 2 && !communicationMethod)
                            }
                            className="bg-[--purple] hover:bg-[--button-bg] text-white"
                        >
                            <Clock className="w-4 h-4 mr-2" />
                            Продолжить
                        </Button>
                    ) : (
                        <Button
                            onClick={handleBooking}
                            className="bg-[--purple] hover:bg-[--button-bg] text-white"
                        >
                            Забронировать
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
