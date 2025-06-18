"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PaymentSummary from "./components/PaymentSummary";
import PaymentMethods from "./components/PaymentMethods";
import PaymentForm from "./components/PaymentForm";
import PaymentStatus from "./components/PaymentStatus";
import SbpPayment from "./components/SbpPayment";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/shared/container";

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

    const handleBackToMethods = () => {
        setSelectedMethod(null);
        setPaymentStep("details");
    };

    const handlePaymentSubmit = async (paymentData: any) => {
        try {
            setPaymentStep("processing");
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

    const renderPaymentStep = () => {
        switch (paymentStep) {
            case "payment":
                return selectedMethod === "card" ? (
                    <PaymentForm
                        method="card"
                        onSubmit={handlePaymentSubmit}
                        amount={paymentDetails.amount}
                        onBack={handleBackToMethods}
                    />
                ) : (
                    <SbpPayment
                        amount={paymentDetails.amount}
                        onSubmit={handlePaymentSubmit}
                        onBack={handleBackToMethods}
                    />
                );
            case "processing":
            case "complete":
                return (
                    <PaymentStatus
                        status={paymentStep}
                        details={{
                            mentorName: paymentDetails.mentorName,
                            sessionDate: paymentDetails.sessionDate,
                            sessionTime: paymentDetails.sessionTime,
                        }}
                    />
                );
            default:
                return (
                    <PaymentMethods
                        amount={paymentDetails.amount}
                        onSelect={handlePaymentMethodSelect}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-zinc-950 flex flex-col">
            <Container>
                <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Link
                            href="/mentors"
                            className="inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Вернуться к менторам
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-col space-y-6">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <h1 className="text-3xl font-bold">
                                    Оплата менторской сессии
                                </h1>
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                                        <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                                        Безопасная оплата
                                    </div>
                                    <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                        Мгновенное подтверждение
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
                                <div className="space-y-6">
                                    {renderPaymentStep()}
                                    <div className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
                                        Нажимая "Оплатить", вы соглашаетесь с
                                        условиями{" "}
                                        <Link
                                            href="/terms"
                                            className="text-[--purple] hover:underline"
                                        >
                                            пользовательского соглашения
                                        </Link>
                                    </div>
                                </div>
                                <div className="order-first lg:order-last">
                                    <div className="sticky top-8">
                                        <PaymentSummary
                                            mentorName={
                                                paymentDetails.mentorName
                                            }
                                            date={paymentDetails.sessionDate}
                                            time={paymentDetails.sessionTime}
                                            duration={paymentDetails.duration}
                                            amount={paymentDetails.amount}
                                            communicationMethod={
                                                paymentDetails.communicationMethod
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
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
