"use client";

import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { useEffect, useState } from "react";

export default function PaymentTestPage() {
    const searchParams = useSearchParams();
    const [localStorageData, setLocalStorageData] = useState<any>(null);

    const allParams = Object.fromEntries(searchParams.entries());

    useEffect(() => {
        // Получаем данные из localStorage
        const paymentId = localStorage.getItem("yookassa_payment_id");
        const paymentData = localStorage.getItem("yookassa_payment_data");

        setLocalStorageData({
            paymentId,
            paymentData: paymentData ? JSON.parse(paymentData) : null,
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-zinc-950 flex flex-col">
            <Container>
                <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <Card className="p-8">
                        <h1 className="text-2xl font-bold mb-6">
                            Тест параметров URL и localStorage
                        </h1>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold mb-2">
                                    Все параметры URL:
                                </h2>
                                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
                                    {JSON.stringify(allParams, null, 2)}
                                </pre>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-2">
                                    Данные из localStorage:
                                </h2>
                                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
                                    {JSON.stringify(localStorageData, null, 2)}
                                </pre>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-2">
                                    Отдельные параметры URL:
                                </h2>
                                <ul className="space-y-2">
                                    <li>
                                        <strong>payment_id:</strong>{" "}
                                        {searchParams.get("payment_id") ||
                                            "не найден"}
                                    </li>
                                    <li>
                                        <strong>paymentId:</strong>{" "}
                                        {searchParams.get("paymentId") ||
                                            "не найден"}
                                    </li>
                                    <li>
                                        <strong>id:</strong>{" "}
                                        {searchParams.get("id") || "не найден"}
                                    </li>
                                    <li>
                                        <strong>success:</strong>{" "}
                                        {searchParams.get("success") ||
                                            "не найден"}
                                    </li>
                                    <li>
                                        <strong>status:</strong>{" "}
                                        {searchParams.get("status") ||
                                            "не найден"}
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-2">
                                    Полный URL:
                                </h2>
                                <p className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg break-all">
                                    {typeof window !== "undefined"
                                        ? window.location.href
                                        : "SSR"}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </Container>
        </div>
    );
}
