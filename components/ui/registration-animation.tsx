import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface RegistrationAnimationProps {
    onComplete: () => void;
}

export function RegistrationAnimation({
    onComplete,
}: RegistrationAnimationProps) {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    // Массив шагов регистрации
    const registrationSteps = [
        { text: "Создание аккаунта...", icon: "✨", done: false },
        { text: "Настройка профиля...", icon: "👤", done: false },
        { text: "Подготовка личного кабинета...", icon: "🎨", done: false },
        { text: "Завершение регистрации...", icon: "🚀", done: false },
    ];

    useEffect(() => {
        // Добавляем задержку перед началом анимации
        const timer = setTimeout(() => {
            setIsVisible(true);
            simulateRegistrationProcess();
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const simulateRegistrationProcess = async () => {
        // Ждем еще немного после появления
        await new Promise((resolve) => setTimeout(resolve, 500));

        for (let i = 0; i < registrationSteps.length; i++) {
            setCurrentStep(i);
            const startProgress = (i / registrationSteps.length) * 100;
            const endProgress = ((i + 1) / registrationSteps.length) * 100;

            for (let p = startProgress; p <= endProgress; p++) {
                setProgress(p);
                await new Promise((resolve) => setTimeout(resolve, 80));
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        // Добавляем задержку перед завершением
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Начинаем анимацию исчезновения
        setIsExiting(true);

        // Вызываем onComplete только после завершения анимации исчезновения
        onComplete();
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{
                            scale: isVisible ? 1 : 0.9,
                            opacity: isVisible ? 1 : 0,
                        }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full max-w-md p-8"
                    >
                        <motion.div className="text-center space-y-8">
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{
                                    y: isVisible ? 0 : 20,
                                    opacity: isVisible ? 1 : 0,
                                }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
                            >
                                Создаём ваш аккаунт
                            </motion.h2>

                            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                    className="absolute left-0 top-0 h-full bg-primary"
                                    style={{ width: `${progress}%` }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            <div className="space-y-3">
                                {registrationSteps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{
                                            opacity:
                                                isVisible &&
                                                index <= currentStep
                                                    ? 1
                                                    : 0.5,
                                            y: isVisible ? 0 : 10,
                                        }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.4 + index * 0.1,
                                        }}
                                        className="flex items-center justify-center space-x-2"
                                    >
                                        {index < currentStep ? (
                                            <motion.svg
                                                initial={{ scale: 0 }}
                                                animate={{
                                                    scale: isVisible ? 1 : 0,
                                                }}
                                                exit={{ scale: 0 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: 0.5 + index * 0.1,
                                                }}
                                                className="w-5 h-5 text-green-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </motion.svg>
                                        ) : (
                                            <div className="w-5 h-5" />
                                        )}
                                        <span
                                            className={
                                                index <= currentStep
                                                    ? "text-foreground"
                                                    : "text-muted-foreground"
                                            }
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
        </AnimatePresence>
    );
}
