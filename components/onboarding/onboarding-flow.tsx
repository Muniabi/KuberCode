"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BackgroundGradient } from "../ui/background-gradient";
import { OnboardingProgress } from "./onboarding-progress";
import { PersonalInfoStep } from "./steps/personal-info";
import { SkillsStep } from "./steps/skills";
import { PreferencesStep } from "./steps/preferences";
import { CompletionStep } from "./steps/completion";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const steps = [
    {
        id: "personal",
        title: "Личная информация",
        description: "Расскажите немного о себе",
    },
    {
        id: "skills",
        title: "Навыки и опыт",
        description: "Ваши текущие навыки и опыт",
    },
    {
        id: "preferences",
        title: "Предпочтения",
        description: "Настройте свои предпочтения обучения",
    },
    {
        id: "completion",
        title: "Завершение",
        description: "Всё готово!",
    },
];

export const OnboardingFlow = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        personal: {},
        skills: {},
        preferences: {},
    });

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const handleStepComplete = (stepId: string, data: any) => {
        setFormData((prev) => ({
            ...prev,
            [stepId]: data,
        }));
        handleNext();
    };

    const getCurrentStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <PersonalInfoStep
                        onComplete={(data) =>
                            handleStepComplete("personal", data)
                        }
                    />
                );
            case 1:
                return (
                    <SkillsStep
                        onComplete={(data) =>
                            handleStepComplete("skills", data)
                        }
                    />
                );
            case 2:
                return (
                    <PreferencesStep
                        onComplete={(data) =>
                            handleStepComplete("preferences", data)
                        }
                    />
                );
            case 3:
                return <CompletionStep data={formData} />;
            default:
                return null;
        }
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-3xl opacity-20 dark:opacity-10" />
            <div className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-8 rounded-2xl border border-black/[0.08] dark:border-white/[0.08]">
                <div className="space-y-8">
                    <OnboardingProgress
                        steps={steps}
                        currentStep={currentStep}
                    />

                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-[400px]"
                    >
                        {getCurrentStep()}
                    </motion.div>

                    <div className="flex justify-between pt-4">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            disabled={currentStep === 0}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Назад
                        </Button>

                        {currentStep < steps.length - 1 && (
                            <Button onClick={handleNext}>
                                Далее
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
