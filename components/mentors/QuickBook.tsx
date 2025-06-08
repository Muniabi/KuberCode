import { useState } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ru } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarIcon, Copy, MessageCircle, Mail, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface QuickBookProps {
    mentorName: string;
    mentorId: number;
    availability: string;
    className?: string;
}

const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
];

const communicationMethods = [
    { id: "jitsi", label: "Jitsi Meet", icon: Video },
    { id: "telegram", label: "Telegram", icon: MessageCircle },
    { id: "email", label: "Email", icon: Mail },
];

export default function QuickBook({
    mentorName,
    mentorId,
    availability,
    className,
}: QuickBookProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState<Date>();
    const [timeSlot, setTimeSlot] = useState<string>();
    const [communicationMethod, setCommunicationMethod] = useState<string>();
    const [step, setStep] = useState(1);
    const [jitsiLink, setJitsiLink] = useState("");

    const handleContinue = () => {
        if (step === 1 && date && timeSlot) {
            setStep(2);
        } else if (step === 2 && communicationMethod) {
            if (communicationMethod === "jitsi") {
                // Генерируем уникальную ссылку для Jitsi Meet
                const meetingId = `mentor-${mentorId}-${Date.now()}`;
                setJitsiLink(`https://meet.jit.si/${meetingId}`);
            }
            setStep(3);
        }
    };

    const handleBooking = () => {
        // Здесь будет логика сохранения бронирования
        toast.success("Бронирование успешно создано!");
        setIsOpen(false);
        setStep(1);
        setDate(undefined);
        setTimeSlot(undefined);
        setCommunicationMethod(undefined);
        setJitsiLink("");
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Запись к ментору {mentorName}</DialogTitle>
                    <DialogDescription>
                        {step === 1 && "Выберите удобные дату и время"}
                        {step === 2 && "Выберите способ связи"}
                        {step === 3 && "Подтверждение записи"}
                    </DialogDescription>
                </DialogHeader>

                {step === 1 && (
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Дата</Label>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                locale={ru}
                                disabled={(date) => date < new Date()}
                                className="rounded-md border"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Время</Label>
                            <Select
                                value={timeSlot}
                                onValueChange={setTimeSlot}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите время" />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                            <p className="text-sm text-gray-500">
                                Дата:{" "}
                                {date &&
                                    format(date, "d MMMM yyyy", { locale: ru })}
                            </p>
                            <p className="text-sm text-gray-500">
                                Время: {timeSlot}
                            </p>
                            <p className="text-sm text-gray-500">
                                Способ связи:{" "}
                                {
                                    communicationMethods.find(
                                        (m) => m.id === communicationMethod
                                    )?.label
                                }
                            </p>
                        </div>

                        {communicationMethod === "jitsi" && (
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
                                <p className="text-sm text-gray-500">
                                    Ссылка будет доступна в вашем личном
                                    кабинете. Вы сможете подключиться к встрече
                                    непосредственно из него.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <DialogFooter>
                    {step < 3 ? (
                        <Button
                            onClick={handleContinue}
                            disabled={
                                (step === 1 && (!date || !timeSlot)) ||
                                (step === 2 && !communicationMethod)
                            }
                            className="bg-[--purple] hover:bg-[--button-bg] text-white"
                        >
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
