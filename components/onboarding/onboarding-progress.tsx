"use client";

import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Step {
    id: string;
    title: string;
    description: string;
}

interface OnboardingProgressProps {
    steps: Step[];
    currentStep: number;
}

export const OnboardingProgress = ({
    steps,
    currentStep,
}: OnboardingProgressProps) => {
    return (
        <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-emerald-500"
                    style={{
                        width: `${(currentStep / (steps.length - 1)) * 100}%`,
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Steps */}
            <div className="relative z-10 flex justify-between">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;

                    return (
                        <div
                            key={step.id}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isCurrent ? 1.2 : 1,
                                    backgroundColor:
                                        isCompleted || isCurrent
                                            ? "rgb(16 185 129)"
                                            : "rgb(229 231 235)",
                                }}
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center",
                                    "border-4 border-white dark:border-gray-950",
                                    "transition-colors duration-200"
                                )}
                            >
                                {isCompleted ? (
                                    <CheckCircle className="w-6 h-6 text-white" />
                                ) : (
                                    <span
                                        className={cn(
                                            "text-sm font-medium",
                                            isCurrent
                                                ? "text-white"
                                                : "text-gray-600"
                                        )}
                                    >
                                        {index + 1}
                                    </span>
                                )}
                            </motion.div>
                            <div className="mt-2 text-center">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {step.title}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 max-w-[120px]">
                                    {step.description}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
