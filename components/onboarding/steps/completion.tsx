"use client";

import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TextSpan = ({ children }: { children: string }) => {
    return (
        <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.15,
                delay: Math.random() * 0.5,
            }}
        >
            {children}
        </motion.span>
    );
};

export const CompletionStep = ({
    data,
    isSubmitting,
    onSubmit,
    onComplete,
    onValidityChange,
}: {
    data: any;
    isSubmitting: boolean;
    onSubmit: () => Promise<void>;
    onComplete: (stepId: string, data: any) => void;
    onValidityChange: (isValid: boolean) => void;
}) => {
    useEffect(() => {
        onValidityChange(true);
        onComplete("completion", data);
    }, []);

    const handleStart = async () => {
        await onSubmit();
    };

    const text = "Начать обучение";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center space-y-6 text-center"
        >
            <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/30">
                <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Профиль настроен!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Теперь вы можете начать обучение. Мы подобрали для вас курсы на
                основе ваших предпочтений и уровня знаний.
            </p>

            <motion.div
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            >
                <Button
                    onClick={handleStart}
                    disabled={isSubmitting}
                    className={cn(
                        "relative text-lg font-semibold",
                        "bg-gradient-to-r from-purple-500 to-blue-500",
                        "hover:from-purple-600 hover:to-blue-600",
                        "px-8 py-6",
                        "overflow-hidden group"
                    )}
                >
                    <div
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent 
                        group-hover:animate-shimmer"
                        style={{
                            backgroundSize: "200% 100%",
                            animation: "shimmer 2s infinite linear",
                        }}
                    />
                    <div className="relative flex items-center gap-2">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Настройка профиля...</span>
                            </>
                        ) : (
                            <div>
                                {text.split("").map((char, index) => (
                                    <TextSpan key={index}>
                                        {char === " " ? "\u00A0" : char}
                                    </TextSpan>
                                ))}
                            </div>
                        )}
                    </div>
                </Button>
            </motion.div>
        </motion.div>
    );
};
