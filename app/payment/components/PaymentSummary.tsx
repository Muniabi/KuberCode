import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, Clock, Video, Receipt } from "lucide-react";
import { motion } from "framer-motion";

interface PaymentSummaryProps {
    mentorName: string;
    date: string;
    time: string;
    duration: string;
    amount: number;
    communicationMethod: string;
}

export default function PaymentSummary({
    mentorName,
    date,
    time,
    duration,
    amount,
    communicationMethod,
}: PaymentSummaryProps) {
    const summaryItems = [
        {
            icon: User,
            label: "Ментор",
            value: mentorName,
        },
        {
            icon: Calendar,
            label: "Дата и время",
            value: `${date}, ${time}`,
        },
        {
            icon: Clock,
            label: "Длительность",
            value: `${duration} час(а)`,
        },
        {
            icon: Video,
            label: "Способ связи",
            value: communicationMethod,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="border-2">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2">
                        <Receipt className="w-5 h-5 text-[--purple]" />
                        <span>Детали заказа</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {summaryItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start space-x-3"
                            >
                                <item.icon className="w-5 h-5 text-zinc-400 mt-0.5" />
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                        {item.label}
                                    </div>
                                    <div className="text-base mt-0.5">
                                        {item.value}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        <Separator className="my-4" />

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
                                <span>Стоимость за час</span>
                                <span>
                                    {(
                                        amount / parseFloat(duration)
                                    ).toLocaleString("ru-RU")}{" "}
                                    ₽
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
                                <span>Длительность</span>
                                <span>{duration} час(а)</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Итого</span>
                                <span className="text-xl font-bold text-[--purple]">
                                    {amount.toLocaleString("ru-RU")} ₽
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-xs text-green-700 dark:text-green-400 text-center">
                                Оплата защищена SSL-шифрованием
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
