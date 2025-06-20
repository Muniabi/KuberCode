import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Loader2, Shield } from "lucide-react";

interface YooKassaPaymentProps {
    amount: number;
    mentorId: number;
    mentorName: string;
    sessionDate: string;
    sessionTime: string;
    duration: string;
    onSubmit: (data: any) => void;
    onBack: () => void;
}

export default function YooKassaPayment({
    amount,
    mentorId,
    mentorName,
    sessionDate,
    sessionTime,
    duration,
    onSubmit,
    onBack,
}: YooKassaPaymentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePayment = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/payment/create-yookassa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount,
                    mentorId,
                    mentorName,
                    sessionDate,
                    sessionTime,
                    duration,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Сохраняем payment_id в localStorage для последующей проверки
                if (data.paymentId) {
                    localStorage.setItem("yookassa_payment_id", data.paymentId);
                    localStorage.setItem(
                        "yookassa_payment_data",
                        JSON.stringify({
                            amount,
                            mentorId,
                            mentorName,
                            sessionDate,
                            sessionTime,
                            duration,
                        })
                    );
                }

                // Перенаправляем пользователя на страницу оплаты ЮKassa
                window.location.href = data.confirmationUrl;
            } else {
                setError(data.message || "Ошибка при создании платежа");
            }
        } catch (error) {
            console.error("Payment error:", error);
            setError("Произошла ошибка при создании платежа");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <Button onClick={onBack} className="text-white">
                    <ArrowLeft className="w-4 h-4 mr-2 " />
                    Назад
                </Button>
                <h2 className="text-xl font-semibold">Оплата картой</h2>
            </div>

            <div className="space-y-6">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="font-medium text-blue-900 dark:text-blue-100">
                            Безопасная оплата через ЮKassa
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-200">
                            Поддерживаются карты Visa, Mastercard, МИР
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="font-medium">Сумма к оплате:</span>
                        <span className="text-xl font-bold text-[--purple]">
                            {amount.toLocaleString()} ₽
                        </span>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-red-700 dark:text-red-300 text-sm">
                                {error}
                            </p>
                        </div>
                    )}

                    <div className="flex items-center space-x-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>Платеж защищен SSL-шифрованием</span>
                    </div>
                </div>

                <Button
                    onClick={handlePayment}
                    disabled={isLoading}
                    className="w-full bg-[--purple] hover:bg-[--button-bg] text-white h-12"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Создание платежа...
                        </>
                    ) : (
                        `Оплатить ${amount.toLocaleString()} ₽`
                    )}
                </Button>

                <div className="text-xs text-center text-zinc-500">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a
                        href="/terms"
                        className="text-[--purple] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        условиями использования
                    </a>
                </div>
            </div>
        </Card>
    );
}
