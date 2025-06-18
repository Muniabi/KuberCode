import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Card } from "@/components/ui/card";

interface PaymentSummaryProps {
    details: {
        mentorName: string;
        sessionDate: string;
        sessionTime: string;
        duration: string;
        hourlyRate: number;
        amount: number;
        communicationMethod: string;
    };
    step: "details" | "payment" | "processing" | "complete";
}

export default function PaymentSummary({ details, step }: PaymentSummaryProps) {
    const formattedDate = format(new Date(details.sessionDate), "d MMMM yyyy", {
        locale: ru,
    });

    return (
        <Card className="p-6 bg-white dark:bg-zinc-900 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Детали бронирования</h2>

            <div className="space-y-4">
                <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">Ментор</h3>
                    <p className="text-zinc-600 dark:text-zinc-300">
                        {details.mentorName}
                    </p>
                </div>

                <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">Дата и время</h3>
                    <p className="text-zinc-600 dark:text-zinc-300">
                        {formattedDate}
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-300">
                        {details.sessionTime}
                    </p>
                </div>

                <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">
                        Длительность и стоимость
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300">
                        {details.duration === "1"
                            ? "1 час"
                            : `${details.duration} часа`}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Стоимость часа: {details.hourlyRate.toLocaleString()} ₽
                    </p>
                </div>

                <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">Способ связи</h3>
                    <p className="text-zinc-600 dark:text-zinc-300">
                        {details.communicationMethod}
                    </p>
                </div>

                <div className="pt-2">
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium">Итого к оплате:</h3>
                        <p className="text-xl font-semibold text-[--purple]">
                            {details.amount.toLocaleString()} ₽
                        </p>
                    </div>

                    {step === "complete" && (
                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                            <p className="text-green-600 dark:text-green-400 text-sm">
                                Оплата успешно выполнена
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
