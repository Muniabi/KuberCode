import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SbpPaymentProps {
    amount: number;
    onSubmit: (data: any) => void;
    onBack: () => void;
}

export default function SbpPayment({
    amount,
    onSubmit,
    onBack,
}: SbpPaymentProps) {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initSbpPayment = async () => {
            try {
                // В реальном приложении здесь будет запрос к API ЮKassa для создания платежа
                // и получения URL для QR-кода
                const response = await fetch("/api/payment/create-sbp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ amount }),
                });

                const data = await response.json();
                if (data.success) {
                    setQrCode(data.qrUrl);
                    // Начинаем опрос статуса платежа
                    startPollingPaymentStatus(data.paymentId);
                }
            } catch (error) {
                console.error("Error initializing SBP payment:", error);
            } finally {
                setIsLoading(false);
            }
        };

        initSbpPayment();
    }, [amount]);

    const startPollingPaymentStatus = async (paymentId: string) => {
        const pollInterval = setInterval(async () => {
            try {
                const response = await fetch(
                    `/api/payment/status?id=${paymentId}`
                );
                const data = await response.json();

                if (data.status === "succeeded") {
                    clearInterval(pollInterval);
                    onSubmit({ paymentId, method: "sbp" });
                } else if (data.status === "canceled") {
                    clearInterval(pollInterval);
                    // Обработка отмены платежа
                }
            } catch (error) {
                console.error("Error checking payment status:", error);
            }
        }, 3000); // Проверяем каждые 3 секунды

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(pollInterval);
    };

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="text-zinc-500 hover:text-zinc-900"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад
                </Button>
                <h2 className="text-xl font-semibold">Оплата через СБП</h2>
            </div>

            <div className="text-center">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <Loader2 className="w-8 h-8 text-[--purple] animate-spin mb-4" />
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Генерация QR-кода...
                        </p>
                    </div>
                ) : qrCode ? (
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg inline-block">
                            <QRCodeSVG
                                value={qrCode}
                                size={200}
                                level="H"
                                includeMargin
                            />
                        </div>
                        <div className="space-y-2">
                            <p className="font-medium">
                                Отсканируйте QR-код в приложении вашего банка
                            </p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                После оплаты страница обновится автоматически
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-500">
                        Ошибка при создании платежа. Попробуйте позже.
                    </p>
                )}
            </div>
        </Card>
    );
}
