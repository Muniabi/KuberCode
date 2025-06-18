"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PaymentSummary from "./components/PaymentSummary";
import PaymentMethods from "./components/PaymentMethods";
import PaymentForm from "./components/PaymentForm";
import PaymentStatus from "./components/PaymentStatus";
import SbpPayment from "./components/SbpPayment";

interface PaymentDetails {
    mentorId: number;
    mentorName: string;
    sessionDate: string;
    sessionTime: string;
    duration: string;
    hourlyRate: number;
    amount: number;
    communicationMethod: string;
}

function PaymentContent() {
    const searchParams = useSearchParams();
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
        null
    );
    const [paymentStep, setPaymentStep] = useState<
        "details" | "payment" | "processing" | "complete"
    >("details");
    const [selectedMethod, setSelectedMethod] = useState<"card" | "sbp" | null>(
        null
    );

    useEffect(() => {
        const hourlyRate = Number(searchParams.get("hourlyRate")) || 0;
        const duration = searchParams.get("duration") || "";

        const details: PaymentDetails = {
            mentorId: Number(searchParams.get("mentorId")),
            mentorName: searchParams.get("mentorName") || "",
            sessionDate: searchParams.get("date") || "",
            sessionTime: searchParams.get("time") || "",
            duration: duration,
            hourlyRate: hourlyRate,
            amount: calculateAmount(duration, hourlyRate),
            communicationMethod: searchParams.get("communicationMethod") || "",
        };
        setPaymentDetails(details);
    }, [searchParams]);

    const calculateAmount = (duration: string, hourlyRate: number): number => {
        return hourlyRate * parseFloat(duration);
    };

    const handlePaymentMethodSelect = (method: "card" | "sbp") => {
        setSelectedMethod(method);
        setPaymentStep("payment");
    };

    const handlePaymentSubmit = async (paymentData: any) => {
        try {
            setPaymentStep("processing");

            // В зависимости от метода оплаты вызываем соответствующий API endpoint
            const endpoint =
                paymentData.method === "sbp"
                    ? "/api/payment/create-sbp"
                    : "/api/payment";
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...paymentData,
                    amount: paymentDetails?.amount,
                    mentorId: paymentDetails?.mentorId,
                }),
            });

            const data = await response.json();
            if (data.success) {
                setPaymentStep("complete");
            } else {
                throw new Error(data.message || "Payment failed");
            }
        } catch (error) {
            console.error("Payment error:", error);
            // Обработка ошибки
        }
    };

    if (!paymentDetails) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-lg text-zinc-600">
                    Недостаточно данных для оформления платежа
                </p>
            </div>
        );
    }

    return (
        <div className="container max-w-5xl py-8">
            <h1 className="text-2xl font-bold mb-8">
                Оплата менторской сессии
            </h1>
            <div className="grid gap-8 md:grid-cols-[1fr_300px]">
                <PaymentMethods
                    amount={paymentDetails.amount}
                    onSelect={handlePaymentMethodSelect}
                />
                <PaymentSummary
                    mentorName={paymentDetails.mentorName}
                    date={paymentDetails.sessionDate}
                    time={paymentDetails.sessionTime}
                    duration={paymentDetails.duration}
                    amount={paymentDetails.amount}
                    communicationMethod={paymentDetails.communicationMethod}
                />
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-[60vh]">
                    <p className="text-lg text-zinc-600">Загрузка...</p>
                </div>
            }
        >
            <PaymentContent />
        </Suspense>
    );
}
