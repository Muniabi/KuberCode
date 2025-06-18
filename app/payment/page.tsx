"use client";

import { useEffect, useState } from "react";
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

export default function PaymentPage() {
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
            <div className="flex justify-center items-center min-h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Оплата сессии с ментором
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="order-2 md:order-1">
                    {paymentStep === "details" && (
                        <PaymentMethods onSelect={handlePaymentMethodSelect} />
                    )}
                    {paymentStep === "payment" && selectedMethod === "card" && (
                        <PaymentForm
                            method="card"
                            onSubmit={handlePaymentSubmit}
                            amount={paymentDetails.amount}
                        />
                    )}
                    {paymentStep === "payment" && selectedMethod === "sbp" && (
                        <SbpPayment
                            amount={paymentDetails.amount}
                            onSubmit={handlePaymentSubmit}
                        />
                    )}
                    {(paymentStep === "processing" ||
                        paymentStep === "complete") && (
                        <PaymentStatus
                            status={paymentStep}
                            details={paymentDetails}
                        />
                    )}
                </div>

                <div className="order-1 md:order-2">
                    <PaymentSummary
                        details={paymentDetails}
                        step={paymentStep}
                    />
                </div>
            </div>
        </div>
    );
}
