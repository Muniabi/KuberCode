"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { sendVerificationEmail } from "@/utils/services/emailService";
import { Badge } from "@/components/ui/badge";

// Установка динамического рендеринга
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
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [particles, setParticles] = useState<
        Array<{
            x: number;
            y: number;
            size: number;
            color: string;
            delay: number;
            duration: number;
            path: string;
        }>
    >([]);

    // Массив шагов регистрации
    const registrationSteps = [
        { text: "Подтверждение email...", icon: "✨", done: false },
        { text: "Настройка профиля...", icon: "👤", done: false },
        { text: "Подготовка личного кабинета...", icon: "🎨", done: false },
        { text: "Завершение регистрации...", icon: "🚀", done: false },
    ];

    // Эффект для получения email из сессии
    useEffect(() => {
        const getEmail = async () => {
            try {
                const response = await fetch("/api/auth/session");
                const session = await response.json();
                if (session?.user?.email) {
                    setEmail(session.user.email);
                    const [name, domain] = session.user.email.split("@");
                    if (name && domain) {
                        setMaskedEmail(`${name}@${domain}`);
                    } else {
                        setMaskedEmail(session.user.email);
                    }
                }
            } catch (error) {
                console.error("Ошибка при получении email:", error);
                router.push("/register");
            }
        };
        getEmail();
    }, [router]);

    // Функция для повторной отправки кода подтверждения
    const handleResendCode = async () => {
        try {
            if (!email) {
                toast.error("Email не найден");
                return;
            }

            setResendDisabled(true);
            setCountdown(60);

            const response = await sendVerificationEmail(email, "false");

            if (response) {
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

    // Эффект для управления таймером обратного отсчета
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

    // Обновляем функцию simulateVerificationProcess
    const simulateVerificationProcess = async () => {
        setShowLoadingScreen(true);
        createParticles();

        // Добавляем начальную задержку для плавного появления
        await new Promise((resolve) => setTimeout(resolve, 500));

        for (let i = 0; i < registrationSteps.length; i++) {
            setCurrentStep(i);
            const startProgress = (i / registrationSteps.length) * 100;
            const endProgress = ((i + 1) / registrationSteps.length) * 100;

            // Делаем прогресс более плавным
            for (let p = startProgress; p <= endProgress; p++) {
                setProgress(p);
                // Используем нелинейную анимацию для более естественного движения
                await new Promise((resolve) =>
                    setTimeout(resolve, 20 + Math.sin((p / 100) * Math.PI) * 10)
                );
            }

            // Добавляем небольшую паузу между шагами
            await new Promise((resolve) => setTimeout(resolve, 800));
        }

        // Добавляем финальную задержку перед редиректом
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/account");
    };

    // Обновляем функцию createParticles
    const createParticles = () => {
        const colors = [
            "#FFD700", // золотой
            "#FF6B6B", // коралловый
            "#4ECDC4", // бирюзовый
            "#45B7D1", // голубой
            "#A78BFA", // фиолетовый
            "#F472B6", // розовый
            "#34D399", // изумрудный
        ];

        const newParticles = Array.from({ length: 100 }).map((_, index) => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 6 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            delay: index * 0.01,
            duration: 2 + Math.random() * 2,
            path: Math.random() > 0.5 ? "up" : "down",
        }));
        setParticles(newParticles);
    };

    // Обновляем функцию verifyCode
    const verifyCode = async (inputCode: string) => {
        setIsVerifying(true);
        setError(null);
        setIsError(false);
        setIsSuccess(false);

        try {
            const response = await fetch("/api/auth/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: inputCode,
                    email: email,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                createParticles();
                await simulateVerificationProcess();
            } else {
                setIsError(true);
                setError(data.message || "Неверный код подтверждения");
                setTimeout(() => {
                    setValue("");
                    setIsError(false);
                }, 1000);
            }
        } catch (error) {
            console.error("Ошибка при верификации:", error);
            setError("Произошла ошибка при верификации");
            setIsError(true);
        } finally {
            setIsVerifying(false);
        }
    };

    // Эффект для проверки длины введенного кода
    useEffect(() => {
        if (value.length === 6) {
            verifyCode(value);
        }
    }, [value]);

    // Возврат JSX для отображения интерфейса
    return (
        <>
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background to-background/80">
                {/* Улучшенные частицы */}
                {particles.map((particle, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            y: particle.y,
                            x: particle.x,
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={{
                            y:
                                particle.path === "up"
                                    ? [particle.y, particle.y - 300]
                                    : [particle.y, particle.y + 300],
                            x: [
                                particle.x,
                                particle.x + (Math.random() - 0.5) * 300,
                            ],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1, 0],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: particle.duration,
                            ease: "easeOut",
                            delay: particle.delay,
                            opacity: {
                                duration: particle.duration * 0.8,
                                times: [0, 0.2, 1],
                            },
                            scale: {
                                duration: particle.duration * 0.3,
                                times: [0, 0.5, 1],
                            },
                        }}
                        className="absolute rounded-full blur-[1px]"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particle.color,
                            boxShadow: `0 0 ${particle.size * 2}px ${
                                particle.color
                            }`,
                        }}
                    />
                ))}

                {/* Основной контент */}
                <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 min-h-screen">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-md space-y-6 sm:space-y-8 backdrop-blur-lg bg-background/80 p-6 rounded-2xl shadow-xl"
                    >
                        <div className="text-center space-y-2 sm:space-y-3">
                            <h1 className="text-xl sm:text-2xl font-bold">
                                Подтверждение email
                            </h1>
                            <p className="text-gray-500 text-sm sm:text-base px-2 sm:px-0">
                                Введите код подтверждения, отправленный на вашу
                                почту
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
                                className="gap-2"
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
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
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
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

                {/* Обновленный экран загрузки */}
                {showLoadingScreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="w-full max-w-md p-8"
                        >
                            <motion.div className="text-center space-y-8">
                                <motion.h2
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60"
                                >
                                    Создаём ваш аккаунт
                                </motion.h2>

                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="relative h-2 bg-muted rounded-full overflow-hidden"
                                >
                                    <motion.div
                                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60"
                                        style={{ width: `${progress}%` }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>

                                <div className="space-y-4">
                                    {registrationSteps.map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{
                                                opacity:
                                                    index <= currentStep
                                                        ? 1
                                                        : 0.5,
                                                x: 0,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.5 + index * 0.1,
                                            }}
                                            className="flex items-center justify-center space-x-3"
                                        >
                                            {index < currentStep ? (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 200,
                                                        damping: 10,
                                                    }}
                                                >
                                                    <svg
                                                        className="w-6 h-6 text-green-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <motion.path
                                                            initial={{
                                                                pathLength: 0,
                                                            }}
                                                            animate={{
                                                                pathLength: 1,
                                                            }}
                                                            transition={{
                                                                duration: 0.5,
                                                            }}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </motion.div>
                                            ) : (
                                                <div className="w-6 h-6" />
                                            )}
                                            <span
                                                className={cn(
                                                    "text-base transition-colors duration-300",
                                                    index <= currentStep
                                                        ? "text-foreground"
                                                        : "text-muted-foreground"
                                                )}
                                            >
                                                {step.text}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </>
    );
}
