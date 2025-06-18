import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PaymentStatusProps {
    status: "processing" | "complete";
    details: {
        mentorName: string;
        sessionDate: string;
        sessionTime: string;
    };
}

export default function PaymentStatus({ status, details }: PaymentStatusProps) {
    return (
        <Card className="p-6">
            {status === "processing" ? (
                <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="w-12 h-12 text-[--purple] animate-spin mb-4" />
                    <h2 className="text-xl font-semibold mb-2">
                        Обрабатываем платеж
                    </h2>
                    <p className="text-zinc-500 text-center">
                        Пожалуйста, не закрывайте страницу
                    </p>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">
                        Оплата прошла успешно
                    </h2>
                    <p className="text-zinc-500 text-center mb-6">
                        Сессия с ментором {details.mentorName} забронирована на{" "}
                        {details.sessionDate} в {details.sessionTime}
                    </p>

                    <div className="space-y-3 w-full max-w-xs">
                        <Link href="/account/schedule" className="block w-full">
                            <Button
                                variant="default"
                                className="w-full bg-[--purple] hover:bg-[--button-bg] text-white"
                            >
                                Перейти к расписанию
                            </Button>
                        </Link>

                        <Link href="/" className="block w-full">
                            <Button variant="outline" className="w-full">
                                На главную
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </Card>
    );
}
