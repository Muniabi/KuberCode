"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp";
import { register } from "@/utils/services/Authentication";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { sendVerificationEmail } from "@/utils/services/emailService";
import { Badge } from "@/components/ui/badge";
import { signIn } from "next-auth/react";
import { RegistrationAnimation } from "@/components/ui/registration-animation";

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
    const [password, setPassword] = useState<string | null>(null);
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
        }>
    >([]);
    const [demoCode, setDemoCode] = useState<string | null>(null);
    const [showAnimation, setShowAnimation] = useState(false);

    // Массив шагов регистрации
    const registrationSteps = [
        { text: "Создание аккаунта...", icon: "✨", done: false },
        { text: "Настройка профиля...", icon: "👤", done: false },
        { text: "Подготовка личного кабинета...", icon: "🎨", done: false },
        { text: "Завершение регистрации...", icon: "🚀", done: false },
    ];

    // Эффект для получения сохраненного email из localStorage
    useEffect(() => {
        const storedEmail = localStorage.getItem("pendingEmail");
        const storedPassword = localStorage.getItem("pendingPassword");
        setEmail(storedEmail);
        setPassword(storedPassword);

        if (storedEmail) {
            const [name, domain] = storedEmail.split("@");
            if (name && domain) {
                // показ только первых 3 символов почты (не работает), возможно сделаем в будущем
                // const maskedName =
                //     name.slice(0, 3) + "*".repeat(name.length - 3);
                setMaskedEmail(`${name}@${domain}`); // Маскируем email
            } else {
                setMaskedEmail(storedEmail);
            }
        }
    }, []);

    // Эффект для получения демо-кода из localStorage (только на клиенте)
    useEffect(() => {
        setDemoCode(localStorage.getItem("verificationCode"));
    }, []);

    // Функция для повторной отправки кода подтверждения
    const handleResendCode = async () => {
        try {
            if (!email) {
                toast.error("Email не найден");
                return;
            }

            setResendDisabled(true);
            setCountdown(60);

            const isMentor = localStorage.getItem("pendingIsTeacher");
            const response = await sendVerificationEmail(
                email,
                isMentor || "false"
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

    // Функция для имитации процесса регистрации
    const simulateRegistrationProcess = async () => {
        setShowLoadingScreen(true);

        for (let i = 0; i < registrationSteps.length; i++) {
            setCurrentStep(i);
            const startProgress = (i / registrationSteps.length) * 100;
            const endProgress = ((i + 1) / registrationSteps.length) * 100;

            for (let p = startProgress; p <= endProgress; p++) {
                setProgress(p);
                await new Promise((resolve) => setTimeout(resolve, 80));
            }

            await new Promise((resolve) => setTimeout(resolve, 1500));
        }
    };

    // Обновляем функцию createParticles
    const createParticles = () => {
        const newParticles = Array.from({ length: 50 }).map((_, index) => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 8 + 4,
            color: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1"][
                Math.floor(Math.random() * 4)
            ],
            delay: index * 0.02, // Добавляем задержку для каждой частицы
        }));
        setParticles(newParticles);
    };

    // Обновите функцию verifyCode
    const verifyCode = async (inputCode: string) => {
        setIsVerifying(true);
        setError(null);
        setIsError(false);
        setIsSuccess(false);

        try {
            const savedCode = localStorage.getItem("verificationCode");
            if (inputCode === savedCode) {
                setIsSuccess(true);
                createParticles();
                setShowAnimation(true);
            } else {
                setIsError(true);
                setError("Неверный код подтверждения");
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

    const handleAnimationComplete = async () => {
        try {
            const result = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Ошибка при входе в систему");
                return;
            }

            localStorage.removeItem("verificationCode");
            router.push("/account");
        } catch (error) {
            console.error("Ошибка при входе:", error);
            toast.error("Произошла ошибка при входе в систему");
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
                {/* Добавим плавающие частицы на фон */}
                {particles.map((particle, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: particle.y, x: particle.x, opacity: 0 }}
                        animate={{
                            y: [particle.y, particle.y - 200],
                            x: [
                                particle.x,
                                particle.x + (Math.random() - 0.5) * 200,
                            ],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeOut",
                            delay: particle.delay, // Используем задержку
                            opacity: {
                                duration: 1.8,
                                times: [0, 0.2, 1],
                            },
                        }}
                        className="absolute rounded-full"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particle.color,
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

                        {/* Добавляем отображение кода для демонстрации */}
                        <div className="text-center mt-4">
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Код для демонстрации:
                                <Badge
                                    variant="outline"
                                    className="ml-2 font-mono font-bold text-base py-1 px-2"
                                >
                                    {demoCode || "Загрузка..."}
                                </Badge>
                            </p>
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

                {/* Заменяем старый экран загрузки на новый компонент */}
                {showAnimation && (
                    <RegistrationAnimation
                        onComplete={handleAnimationComplete}
                    />
                )}
            </div>
        </>
    );
}
