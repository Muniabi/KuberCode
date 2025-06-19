"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui";
import { register } from "@/utils/services/Authentication";
import PasswordInput from "@/components/ui/password-input";
import { sendVerificationEmail } from "@/utils/services/emailService";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap, Users, UserCog } from "lucide-react";

const formSchema = z.object({
    email: z
        .string()
        .email({ message: "Некорректный адрес электронной почты." }),
    password: z
        .string()
        .min(6, { message: "Пароль должен содержать как минимум 6 символов." }),
});

type FormData = z.infer<typeof formSchema>;

const roleDescriptions = {
    student: {
        title: "Студент",
        description:
            "Получите доступ к курсам, интерактивным занятиям и возможностям заработка бонусов за успехи в обучении.",
        icon: Users,
    },
    mentor: {
        title: "Ментор",
        description:
            "Делитесь знаниями, проводите занятия и помогайте студентам развиваться в их профессиональном пути.",
        icon: GraduationCap,
    },
};

export default function RoleSelectionPage() {
    const router = useRouter();

    const handleRoleSelect = (isMentor: boolean) => {
        // Сохраняем выбранную роль в URL параметре
        router.push(`/register/form?role=${isMentor ? "mentor" : "student"}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/80">
            <div className="w-full max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold mb-2">
                        Выберите вашу роль
                    </h1>
                    <p className="text-muted-foreground">
                        Кем вы хотите быть на платформе?
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card
                            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleRoleSelect(false)}
                        >
                            <div className="text-center">
                                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-full">
                                    <GraduationCap className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-xl font-semibold mb-2">
                                    Студент
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Изучайте новые технологии, проходите курсы и
                                    получайте поддержку от менторов
                                </p>
                                <Button
                                    variant="default"
                                    className="w-full"
                                    onClick={() => handleRoleSelect(false)}
                                >
                                    Продолжить как студент
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Card
                            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleRoleSelect(true)}
                        >
                            <div className="text-center">
                                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-full">
                                    <UserCog className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-xl font-semibold mb-2">
                                    Ментор
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Делитесь своим опытом, обучайте студентов и
                                    зарабатывайте
                                </p>
                                <Button
                                    variant="default"
                                    className="w-full"
                                    onClick={() => handleRoleSelect(true)}
                                >
                                    Продолжить как ментор
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
