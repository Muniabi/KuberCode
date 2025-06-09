import { CalendarDays, Clock } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface RescheduleDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (newDate: Date, newTime: string, newDuration: string) => void;
    currentDate: Date;
    currentDuration: number;
}

export function RescheduleDialog({
    isOpen,
    onClose,
    onConfirm,
    currentDate,
    currentDuration,
}: RescheduleDialogProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        currentDate
    );
    const [selectedTime, setSelectedTime] = useState(
        format(currentDate, "HH:mm")
    );
    const [duration, setDuration] = useState(currentDuration.toString());

    const handleConfirm = () => {
        if (selectedDate && selectedTime && duration) {
            onConfirm(selectedDate, selectedTime, duration);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-white via-purple-50/10 to-white dark:from-zinc-900 dark:via-lime-950/5 dark:to-zinc-900">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold bg-gradient-to-br from-purple-600 to-purple-400 dark:from-lime-300 dark:to-lime-500 bg-clip-text text-transparent">
                        Перенос сессии
                    </DialogTitle>
                    <DialogDescription>
                        Выберите новые дату и время для сессии
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                <CalendarDays className="w-4 h-4 text-purple-500 dark:text-lime-400" />
                                <span>Выберите дату</span>
                            </div>
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                locale={ru}
                                className="border rounded-lg border-purple-100 dark:border-lime-900/30"
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

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                <Clock className="w-4 h-4 text-purple-500 dark:text-lime-400" />
                                <span>Выберите время</span>
                            </div>
                            <Input
                                type="time"
                                value={selectedTime}
                                onChange={(e) =>
                                    setSelectedTime(e.target.value)
                                }
                                className="border-purple-100 dark:border-lime-900/30 focus:ring-purple-500/20 dark:focus:ring-lime-400/20"
                                min="09:00"
                                max="21:00"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                <Clock className="w-4 h-4 text-purple-500 dark:text-lime-400" />
                                <span>Длительность</span>
                            </div>
                            <Select
                                value={duration}
                                onValueChange={setDuration}
                            >
                                <SelectTrigger className="border-purple-100 dark:border-lime-900/30">
                                    <SelectValue placeholder="Выберите длительность" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 час</SelectItem>
                                    <SelectItem value="1.5">
                                        1.5 часа
                                    </SelectItem>
                                    <SelectItem value="2">2 часа</SelectItem>
                                    <SelectItem value="2.5">
                                        2.5 часа
                                    </SelectItem>
                                    <SelectItem value="3">3 часа</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex gap-2">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="flex-1 hover:bg-purple-100/50 dark:hover:bg-lime-900/20 text-zinc-600 dark:text-zinc-400"
                    >
                        Отмена
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        className="flex-1 bg-purple-500 hover:bg-purple-600 dark:bg-lime-500 dark:hover:bg-lime-600 text-white dark:text-zinc-900"
                        disabled={!selectedDate || !selectedTime || !duration}
                    >
                        Подтвердить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
