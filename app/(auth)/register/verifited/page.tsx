"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { register } from "@/utils/services/Authentication";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { sendVerificationEmail } from "@/utils/services/emailService";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default function Verified() {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [email, setEmail] = useState<string | null>(null);
    const [maskedEmail, setMaskedEmail] = useState<string>("");

    useEffect(() => {
        const storedEmail = localStorage.getItem("pendingEmail");
        setEmail(storedEmail);

        if (storedEmail) {
            const [name, domain] = storedEmail.split("@");
            if (name && domain) {
                const maskedName =
                    name.slice(0, 3) + "*".repeat(name.length - 3);
                setMaskedEmail(`${maskedName}@${domain}`);
            } else {
                setMaskedEmail(storedEmail);
            }
        }
    }, []);

    const handleResendCode = async () => {
        try {
            if (!email) {
                toast.error("Email не найден");
                return;
            }

            setResendDisabled(true);
            setCountdown(60);

            const isTeacher = localStorage.getItem("pendingIsTeacher");
            const response = await sendVerificationEmail(
                email,
                isTeacher || "false"
            );

            if (response?.verificationCode) {
                localStorage.setItem(
                    "verificationCode",
                    response.verificationCode
                );
                toast.success("Код подтверждения отправлен повторно");
            } else {
                throw new Error("Не удалось получить код подтверждения");
            }
        } catch (error) {
            toast.error("Ошибка при отправке кода");
            setResendDisabled(false);
            setCountdown(0);
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else {
            setResendDisabled(false);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const verifyCode = async (inputCode: string) => {
        setIsVerifying(true);
        setError(null);
        setIsError(false);
        setIsSuccess(false);

        try {
            const savedCode = localStorage.getItem("verificationCode");
            if (inputCode === savedCode) {
                setIsSuccess(true);

                const email = localStorage.getItem("pendingEmail");
                const password = localStorage.getItem("pendingPassword");
                const isTeacher =
                    localStorage.getItem("pendingIsTeacher") === "true";

                if (!email || !password) {
                    throw new Error("Данные для регистрации не найдены");
                }

                await new Promise((resolve) => setTimeout(resolve, 1000));
                await register(email, password, isTeacher);

                localStorage.removeItem("verificationCode");
                localStorage.removeItem("pendingEmail");
                localStorage.removeItem("pendingPassword");
                localStorage.removeItem("pendingIsTeacher");

                toast.success("Регистрация успешно завершена!");

                setTimeout(() => {
                    router.push("/account");
                }, 1500);
            } else {
                setIsError(true);
                setError("Неверный код подтверждения");

                setTimeout(() => {
                    setValue("");
                    setIsError(false);
                }, 1000);
            }
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
            setError("Произошла ошибка при регистрации");
            setIsError(true);
        } finally {
            setIsVerifying(false);
        }
    };

    useEffect(() => {
        if (value.length === 6) {
            verifyCode(value);
        }
    }, [value]);

    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-6 sm:space-y-8"
            >
                <div className="text-center space-y-2 sm:space-y-3">
                    <h1 className="text-xl sm:text-2xl font-bold">
                        Подтверждение email
                    </h1>
                    <p className="text-gray-500 text-sm sm:text-base px-2 sm:px-0">
                        Введите код подтверждения, отправленный на вашу почту
                        <Badge
                            variant="secondary"
                            className="ml-2 text-xs sm:text-sm break-all whitespace-normal max-w-[200px] sm:max-w-none"
                        >
                            {maskedEmail}
                        </Badge>
                    </p>
                </div>

                <div className="relative flex justify-center px-2 sm:px-0">
                    <InputOTP
                        value={value}
                        onChange={(value) => setValue(value)}
                        maxLength={6}
                        disabled={isVerifying || isSuccess}
                    >
                        <InputOTPGroup className="gap-1 sm:gap-2">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <InputOTPSlot
                                    key={i}
                                    index={i}
                                    className={cn(
                                        "transition-all duration-200 w-8 sm:w-10 h-10 sm:h-12",
                                        isError &&
                                            "animate-shake border-red-500",
                                        isSuccess && "border-green-500",
                                        isVerifying && "opacity-50"
                                    )}
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                <div className="text-center space-y-4">
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-red-500 text-sm sm:text-base px-2"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex flex-col items-center gap-2 px-4 sm:px-0">
                        <p className="text-xs sm:text-sm text-gray-500">
                            Не получили код?
                        </p>
                        <Button
                            variant="outline"
                            onClick={handleResendCode}
                            disabled={resendDisabled}
                            className="text-sm h-9 sm:h-10 px-3 sm:px-4"
                        >
                            {resendDisabled
                                ? `Отправить повторно (${countdown}с)`
                                : "Отправить повторно"}
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
