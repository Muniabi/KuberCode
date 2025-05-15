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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui";
import { register } from "@/utils/services/Authentication";
import PasswordInput from "@/components/ui/password-input";
import { sendVerificationEmail } from "@/utils/services/emailService";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
    isMentor: z.boolean({
        required_error: "Тип пользователя обязателен",
    }),
    email: z
        .string()
        .email({ message: "Некорректный адрес электронной почты." }),
    password: z
        .string()
        .min(6, { message: "Пароль должен содержать как минимум 6 символов." }),
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isMentor: false,
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            // Сначала отправляем запрос на регистрацию
            await register(data.email, data.password, data.isMentor);

            // Генерируем 6-значный код
            const verificationCode = Math.floor(
                100000 + Math.random() * 900000
            ).toString();

            // Отправляем код на почту
            await sendVerificationEmail(data.email, verificationCode);

            // Сохраняем только код верификации в localStorage
            localStorage.setItem("verificationCode", verificationCode);

            // Перенаправляем на страницу верификации
            router.push("/register/verifited");
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Ошибка при регистрации"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container max-w-[400px] mx-auto px-4 py-8 md:py-16">
            <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger
                        value="student"
                        onClick={() => form.setValue("isMentor", false)}
                    >
                        Студент
                    </TabsTrigger>
                    <TabsTrigger
                        value="author"
                        onClick={() => form.setValue("isMentor", true)}
                    >
                        Ментор
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="student">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="space-y-4">
                            <CardTitle className="text-2xl text-center font-bold">
                                Студент
                            </CardTitle>
                            <CardDescription className="text-center text-base">
                                Зарегистрируйтесь как студент, чтобы получить
                                доступ к курсам, интерактивным занятиям и
                                возможностям заработка бонусов за успехи в
                                обучении.
                            </CardDescription>
                            <div className="space-y-4">
                                <p className="text-center text-sm text-muted-foreground">
                                    Регистрация с помощью
                                </p>
                                <div className="flex items-center justify-center gap-6">
                                    <button
                                        onClick={() =>
                                            signIn("github", {
                                                callbackUrl: "/",
                                                redirect: true,
                                            })
                                        }
                                        className="hover:scale-110 transition-transform duration-200"
                                    >
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage
                                                src="/github.png"
                                                alt="GitHub"
                                            />
                                        </Avatar>
                                    </button>
                                    <button
                                        onClick={() =>
                                            signIn("vk", {
                                                callbackUrl: "/",
                                                redirect: true,
                                            })
                                        }
                                        className="hover:scale-110 transition-transform duration-200"
                                    >
                                        <Avatar className="h-10 w-10 rounded-none">
                                            <AvatarImage
                                                src="/vk.png"
                                                alt="VK"
                                            />
                                        </Avatar>
                                    </button>
                                    <button
                                        onClick={() =>
                                            signIn("google", {
                                                callbackUrl: "/",
                                                redirect: true,
                                            })
                                        }
                                        className="hover:scale-110 transition-transform duration-200"
                                    >
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage
                                                src="/google.png"
                                                alt="Google"
                                            />
                                        </Avatar>
                                    </button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-base"
                                    >
                                        Почта
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        className="h-11"
                                        {...form.register("email")}
                                    />
                                    {form.formState.errors.email && (
                                        <p className="text-sm text-red-500">
                                            {
                                                form.formState.errors.email
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password"
                                        className="text-base"
                                    >
                                        Пароль
                                    </Label>
                                    <PasswordInput
                                        id="password"
                                        placeholder="Пароль"
                                        className="h-11"
                                        {...form.register("password")}
                                    />
                                    {form.formState.errors.password && (
                                        <p className="text-sm text-red-500">
                                            {
                                                form.formState.errors.password
                                                    .message
                                            }
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
                </TabsContent>

                <TabsContent value="author">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="space-y-4">
                            <CardTitle className="text-2xl text-center font-bold">
                                Ментор
                            </CardTitle>
                            <CardDescription className="text-center text-base">
                                Зарегистрируйтесь как Ментор, чтобы делиться
                                курсами, получать обратную связь и создавать
                                интерактивные занятия для студентов.
                            </CardDescription>
                            <div className="space-y-4">
                                <p className="text-center text-sm text-muted-foreground">
                                    Регистрация с помощью
                                </p>
                                <div className="flex items-center justify-center gap-6">
                                    <button
                                        onClick={() =>
                                            signIn("github", {
                                                callbackUrl: "/",
                                                redirect: true,
                                            })
                                        }
                                        className="hover:scale-110 transition-transform duration-200"
                                    >
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage
                                                src="/github.png"
                                                alt="GitHub"
                                            />
                                        </Avatar>
                                    </button>
                                    <button
                                        onClick={() =>
                                            signIn("vk", {
                                                callbackUrl: "/",
                                                redirect: true,
                                            })
                                        }
                                        className="hover:scale-110 transition-transform duration-200"
                                    >
                                        <Avatar className="h-10 w-10 rounded-none">
                                            <AvatarImage
                                                src="/vk.png"
                                                alt="VK"
                                            />
                                        </Avatar>
                                    </button>
                                    <button
                                        onClick={() =>
                                            signIn("google", {
                                                callbackUrl: "/",
                                                redirect: true,
                                            })
                                        }
                                        className="hover:scale-110 transition-transform duration-200"
                                    >
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage
                                                src="/google.png"
                                                alt="Google"
                                            />
                                        </Avatar>
                                    </button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-base"
                                    >
                                        Почта
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        className="h-11"
                                        {...form.register("email")}
                                    />
                                    {form.formState.errors.email && (
                                        <p className="text-sm text-red-500">
                                            {
                                                form.formState.errors.email
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password"
                                        className="text-base"
                                    >
                                        Пароль
                                    </Label>
                                    <PasswordInput
                                        id="password"
                                        placeholder="Пароль"
                                        className="h-11"
                                        {...form.register("password")}
                                    />
                                    {form.formState.errors.password && (
                                        <p className="text-sm text-red-500">
                                            {
                                                form.formState.errors.password
                                                    .message
                                            }
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
                </TabsContent>
            </Tabs>
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
        </div>
    );
}
