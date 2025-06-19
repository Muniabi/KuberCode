"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { register } from "@/utils/services/Authentication";
import { login } from "@/utils/services/Authentication";
import { toast } from "sonner";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/ui/password-input";

// Схема валидации формы
const formSchema = z.object({
    email: z.string().email("Некорректный email"),
    password: z
        .string()
        .min(6, "Пароль должен содержать минимум 6 символов")
        .max(50, "Пароль не должен превышать 50 символов"),
});

type FormData = z.infer<typeof formSchema>;

// Компонент формы регистрации
function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get("role");
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const registrationSteps = [
        { text: "Создание аккаунта", icon: "✨" },
        { text: "Настройка профиля", icon: "👤" },
        { text: "Подготовка личного кабинета", icon: "🎨" },
        { text: "Завершение регистрации", icon: "🚀" },
    ];

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Если роль не выбрана, перенаправляем на страницу выбора роли
    if (!role || !["student", "mentor"].includes(role)) {
        router.replace("/register");
        return null;
    }

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setCurrentStep(0);

        try {
            // Шаг 1: Регистрация пользователя
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Attempting registration with:", {
                email: data.email,
                role,
            });

            const registerResponse = await register(
                data.email,
                data.password,
                role === "mentor"
            );

            console.log("Registration response:", registerResponse);

            if (!registerResponse?.message) {
                console.error(
                    "Invalid registration response:",
                    registerResponse
                );
                throw new Error("Ошибка при регистрации");
            }

            if (registerResponse.message !== "User registered successfully") {
                throw new Error("Ошибка при регистрации");
            }

            setCurrentStep(1);
            await new Promise((resolve) => setTimeout(resolve, 800));

            // Шаг 2: Настройка профиля
            setCurrentStep(2);
            await new Promise((resolve) => setTimeout(resolve, 800));

            // Шаг 3: Автоматический вход
            console.log("Attempting login after registration");
            const loginResult = await login(data.email, data.password);

            console.log("Login result:", loginResult);

            if (!loginResult?.ok) {
                console.error("Login failed after registration:", loginResult);
                throw new Error("Ошибка при входе");
            }

            setCurrentStep(3);
            await new Promise((resolve) => setTimeout(resolve, 800));

            toast.success("Регистрация успешна!");

            // Перенаправление в личный кабинет
            router.push("/account");
        } catch (error) {
            console.error("Ошибка:", error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Произошла неизвестная ошибка"
            );
        } finally {
            setIsLoading(false);
            setCurrentStep(0);
        }
    };

    return (
        <div className="container max-w-[400px] mx-auto px-4 py-8 md:py-16">
            <AnimatePresence>
                {isLoading && (
                    <LoadingOverlay
                        message="Регистрация в процессе..."
                        steps={registrationSteps}
                        currentStep={currentStep}
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Button
                    variant="ghost"
                    className="mb-6"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад к выбору роли
                </Button>

                <Card className="shadow-lg">
                    <CardHeader className="space-y-4">
                        <CardTitle className="text-2xl text-center font-bold">
                            Регистрация как{" "}
                            {role === "mentor" ? "ментор" : "студент"}
                        </CardTitle>
                        <CardDescription className="text-center text-base">
                            {role === "mentor"
                                ? "Делитесь знаниями и помогайте другим учиться"
                                : "Начните свой путь в программировании"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-base">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    className="h-11"
                                    {...form.register("email")}
                                />
                                {form.formState.errors.email && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-base">
                                    Пароль
                                </Label>
                                <PasswordInput
                                    id="password"
                                    placeholder="Минимум 6 символов"
                                    className="h-11"
                                    {...form.register("password")}
                                />
                                {form.formState.errors.password && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.password.message}
                                    </p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-11 text-base font-medium"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg
                                            className="animate-spin h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Регистрация...
                                    </div>
                                ) : (
                                    "Зарегистрироваться"
                                )}
                            </Button>
                        </form>
                        <div className="text-center text-sm text-muted-foreground">
                            Уже есть аккаунт?{" "}
                            <Link
                                href="/login"
                                className="text-primary hover:text-primary/90 underline underline-offset-4"
                            >
                                Войти
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    Нажимая кнопку входа, вы соглашаетесь с нашими{" "}
                    <Link
                        href="/terms"
                        className="text-primary hover:text-primary/90 underline underline-offset-4"
                    >
                        Условиями использования
                    </Link>{" "}
                    и{" "}
                    <Link
                        href="/privacy"
                        className="text-primary hover:text-primary/90 underline underline-offset-4"
                    >
                        Политикой конфиденциальности
                    </Link>
                    .
                </div>
            </motion.div>
        </div>
    );
}

// Основной компонент страницы с оберткой Suspense
export default function RegisterFormPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <LoadingOverlay message="Загрузка формы регистрации..." />
                </div>
            }
        >
            <RegisterForm />
        </Suspense>
    );
}
