"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/shared/container";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState<
        "checking" | "success" | "failed"
    >("checking");
    const [paymentDetails, setPaymentDetails] = useState<any>(null);

    useEffect(() => {
        const checkPaymentStatus = async () => {
            try {
                // Сначала пытаемся получить payment_id из URL параметров
                let paymentId =
                    searchParams.get("payment_id") ||
                    searchParams.get("paymentId") ||
                    searchParams.get("id");

                // Если в URL нет payment_id, берем из localStorage
                if (!paymentId) {
                    paymentId = localStorage.getItem("yookassa_payment_id");
                }

                console.log(
                    "Search params:",
                    Object.fromEntries(searchParams.entries())
                );
                console.log("Payment ID found:", paymentId);

                if (!paymentId) {
                    console.log(
                        "No payment ID found in URL params or localStorage"
                    );
                    // Если нет payment_id, но есть другие параметры, возможно это успешная оплата
                    // Проверяем наличие параметров, указывающих на успех
                    const hasSuccessParams =
                        searchParams.has("success") ||
                        searchParams.has("status") ||
                        searchParams.toString().includes("success");

                    if (hasSuccessParams) {
                        console.log(
                            "Success parameters found, treating as successful payment"
                        );
                        setPaymentStatus("success");
                        return;
                    }

                    setPaymentStatus("failed");
                    return;
                }

                // Проверяем статус платежа
                const response = await fetch(
                    `/api/payment/status?paymentId=${paymentId}`
                );
                const data = await response.json();

                console.log("Payment status response:", data);

                if (data.success && data.status === "succeeded") {
                    setPaymentStatus("success");
                    setPaymentDetails(data);

                    // Очищаем localStorage после успешной проверки
                    localStorage.removeItem("yookassa_payment_id");
                    localStorage.removeItem("yookassa_payment_data");
                } else {
                    setPaymentStatus("failed");
                }
            } catch (error) {
                console.error("Error checking payment status:", error);
                setPaymentStatus("failed");
            }
        };

        checkPaymentStatus();
    }, [searchParams]);

    const renderContent = () => {
        switch (paymentStatus) {
            case "checking":
                return (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="w-12 h-12 text-[--purple] animate-spin mb-4" />
                        <h2 className="text-xl font-semibold mb-2">
                            Проверяем статус платежа
                        </h2>
                        <p className="text-zinc-500 text-center">
                            Пожалуйста, подождите...
                        </p>
                    </div>
                );

            case "success":
                return (
                    <div className="flex flex-col items-center justify-center py-12">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">
                            Оплата прошла успешно!
                        </h2>
                        <p className="text-zinc-600 text-center mb-8 max-w-md">
                            Ваша сессия с ментором забронирована. Подтверждение
                            отправлено на ваш email.
                        </p>

                        <div className="space-y-4 w-full max-w-sm">
                            <Link
                                href="/account/schedule"
                                className="block w-full"
                            >
                                <Button className="w-full bg-[--purple] hover:bg-[--button-bg] text-white">
                                    Перейти к расписанию
                                </Button>
                            </Link>

                            <Link href="/" className="block w-full">
                                <Button className="w-full">На главную</Button>
                            </Link>
                        </div>
                    </div>
                );

            case "failed":
                return (
                    <div className="flex flex-col items-center justify-center py-12">
                        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">
                            Ошибка при оплате
                        </h2>
                        <p className="text-zinc-600 text-center mb-8 max-w-md">
                            К сожалению, произошла ошибка при обработке платежа.
                            Пожалуйста, попробуйте еще раз.
                        </p>

                        <div className="space-y-4 w-full max-w-sm">
                            <Link href="/mentors" className="block w-full">
                                <Button className="w-full bg-[--purple] hover:bg-[--button-bg] text-white">
                                    Вернуться к менторам
                                </Button>
                            </Link>

                            <Link href="/" className="block w-full">
                                <Button className="w-full">На главную</Button>
                            </Link>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-zinc-950 flex flex-col">
            <Container>
                <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
                    <Card className="p-8">{renderContent()}</Card>
                </div>
            </Container>
        </div>
    );
}
