import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    return (
        <Card className="p-6">
            <CardHeader className="pb-4">
                <CardTitle>Детали заказа</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-medium mb-2">Ментор</h4>
                    <p className="text-zinc-600">{mentorName}</p>
                </div>
                <div>
                    <h4 className="font-medium mb-2">Дата и время</h4>
                    <p className="text-zinc-600">
                        {date}, {time}
                    </p>
                </div>
                <div>
                    <h4 className="font-medium mb-2">Длительность</h4>
                    <p className="text-zinc-600">{duration} час(а)</p>
                </div>
                <div>
                    <h4 className="font-medium mb-2">Способ связи</h4>
                    <p className="text-zinc-600">{communicationMethod}</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-medium mb-2">Итого к оплате</h4>
                    <p className="text-2xl font-bold">
                        {amount.toLocaleString("ru-RU")} ₽
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
