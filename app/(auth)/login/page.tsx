"use client";

import { useRouter } from "next/navigation";
import { login } from "@/utils/services/Authentication";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Создание схемы валидации с помощью Zod
const formSchema = z.object({
    email: z.string().email({
        message: "Некорректный адрес электронной почты.",
    }),
    password: z.string().min(6, {
        message: "Пароль должен содержать как минимум 6 символов.",
    }),
});

// Создание типа для данных формы
type FormData = z.infer<typeof formSchema>;

// Динамический импорт компонентов, которые не нужны сразу
const ForgotPasswordLink = dynamic(
    () => import("@/components/ForgotPasswordLink"),
    {
        loading: () => <div className="ml-auto text-sm">Загрузка...</div>,
        ssr: false,
    }
);

// Добавляем анимации для обратной связи
const formAnimation = "transition-all duration-300 ease-in-out";

// Главный компонент страницы авторизации
export default function LoginPage() {
    const router = useRouter();
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const result = await login(data.email, data.password);
            if (result?.ok) {
                toast.success("Успешный вход");
                router.push("/account");
            } else {
                toast.error("Неверный email или пароль");
            }
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Произошла ошибка при входе"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={`flex flex-col gap-6 w-[400px] mx-auto mt-16 ${formAnimation}`}
        >
            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Добро пожаловать</CardTitle>
                    <CardDescription>
                        Войдите с помощью социальных сетей
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        onClick={() => signIn("github")}
                                        disabled={isLoading}
                                    >
                                        <div className="h-5 w-5 mr-2">
                                            <Image
                                                src="/github.png"
                                                alt="Github"
                                                width={20}
                                                height={20}
                                                priority
                                            />
                                        </div>
                                        Войти через GitHub
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        onClick={() => signIn("google")}
                                        disabled={isLoading}
                                    >
                                        <div className="h-5 w-5 mr-2">
                                            <Image
                                                src="/google.png"
                                                alt="Google"
                                                width={20}
                                                height={20}
                                                priority
                                            />
                                        </div>
                                        Войти через Google
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        onClick={() => signIn("vk")}
                                        disabled={isLoading}
                                    >
                                        <div className="h-5 w-5 mr-2">
                                            <Image
                                                src="/vk.png"
                                                alt="VK"
                                                width={20}
                                                height={20}
                                                priority
                                            />
                                        </div>
                                        Войти через VK
                                    </Button>
                                </div>

                                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                        Или войдите с помощью email
                                    </span>
                                </div>

                                <div className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2">
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="m@example.com"
                                                        autoFocus
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2">
                                                <div className="flex items-center">
                                                    <FormLabel>
                                                        Пароль
                                                    </FormLabel>
                                                    <div className="ml-auto">
                                                        <ForgotPasswordLink />
                                                    </div>
                                                </div>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full relative"
                                        disabled={isLoading || !isOnline}
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
                                                Выполняется вход...
                                            </div>
                                        ) : (
                                            "Войти"
                                        )}
                                    </Button>
                                </div>

                                <div className="text-center text-sm">
                                    Нет аккаунта?{" "}
                                    <Link
                                        href="/register"
                                        className="underline underline-offset-4"
                                    >
                                        Зарегистрироваться
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
