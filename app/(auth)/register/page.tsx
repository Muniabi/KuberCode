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
import { Loader2 } from "lucide-react";
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
            // Сначала регистрируем пользователя
            await register(data.email, data.password, data.isMentor);

            // После успешной регистрации отправляем код подтверждения
            await sendVerificationEmail(data.email, String(data.isMentor));

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
        <div className={`flex flex-col gap-6 w-[400px] mx-auto mt-16 `}>
            <Tabs defaultValue="student" className="w-[400px] mx-auto my-12">
                <TabsList className="grid w-full grid-cols-2">
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
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center mb-2">
                                Студент
                            </CardTitle>
                            <CardDescription>
                                Зарегистрируйтесь как студент, чтобы получить
                                доступ к курсам, интерактивным занятиям и
                                возможностям заработка бонусов за успехи в
                                обучении.
                            </CardDescription>
                            <div className="mx-auto">
                                <p className="py-2">Регистрация с помощью</p>
                                <div className="flex items-center justify-evenly">
                                    <button
                                        onClick={() =>
                                            signIn("github", {
                                                callbackUrl: "/",
                                                redirect: true,
                                            })
                                        }
                                    >
                                        <Avatar>
                                            <AvatarImage
                                                src="/github.png"
                                                alt="@shadcn"
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
                                    >
                                        <Avatar className="rounded-none">
                                            <AvatarImage
                                                src="/vk.png"
                                                alt="@shadcn"
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
                                    >
                                        <Avatar>
                                            <AvatarImage
                                                src="/google.png"
                                                alt="@shadcn"
                                            />
                                        </Avatar>
                                    </button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div className="space-y-1">
                                    <Label htmlFor="email">Почта</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        {...form.register("email")}
                                    />
                                    {form.formState.errors.email && (
                                        <p className="text-red-500">
                                            {
                                                form.formState.errors.email
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Пароль</Label>
                                    <PasswordInput
                                        id="password"
                                        placeholder="Пароль"
                                        {...form.register("password")}
                                    />
                                    {form.formState.errors.password && (
                                        <p className="text-red-500">
                                            {
                                                form.formState.errors.password
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="flex justify-center">
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Регистрация...
                                            </>
                                        ) : (
                                            "Зарегистрироваться"
                                        )}
                                    </Button>
                                </div>
                            </form>
                            <div className="text-center text-sm">
                                Уже есть аккаунт?{" "}
                                <Link
                                    href="/login"
                                    className="underline underline-offset-4"
                                >
                                    Войти
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="author">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center mb-2">
                                Ментор
                            </CardTitle>
                            <CardDescription>
                                Зарегистрируйтесь как Ментор, чтобы делиться
                                курсами, получать обратную связь и создавать
                                интерактивные занятия для студентов.
                            </CardDescription>
                            <div className="mx-auto">
                                <p className="py-2">Регистрация с помощью</p>
                                <div className="flex items-center justify-evenly">
                                    <button
                                        onClick={() =>
                                            signIn("github", {
                                                callbackUrl: "/",
                                                redirect: true,
                                            })
                                        }
                                    >
                                        <Avatar>
                                            <AvatarImage
                                                src="/github.png"
                                                alt="@shadcn"
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
                                    >
                                        <Avatar className="rounded-none">
                                            <AvatarImage
                                                src="/vk.png"
                                                alt="@shadcn"
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
                                    >
                                        <Avatar>
                                            <AvatarImage
                                                src="/google.png"
                                                alt="@shadcn"
                                            />
                                        </Avatar>
                                    </button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div className="space-y-1">
                                    <Label htmlFor="email">Почта</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        {...form.register("email")}
                                    />
                                    {form.formState.errors.email && (
                                        <p className="text-red-500">
                                            {
                                                form.formState.errors.email
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Пароль</Label>
                                    <PasswordInput
                                        id="password"
                                        placeholder="Пароль"
                                        {...form.register("password")}
                                    />
                                    {form.formState.errors.password && (
                                        <p className="text-red-500">
                                            {
                                                form.formState.errors.password
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="flex justify-center">
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Регистрация...
                                            </>
                                        ) : (
                                            "Зарегистрироваться"
                                        )}
                                    </Button>
                                </div>
                            </form>
                            <div className="text-center text-sm">
                                Уже есть аккаунт?{" "}
                                <Link
                                    href="/login"
                                    className="underline underline-offset-4"
                                >
                                    Войти
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-white">
                Нажимая кнопку входа, вы соглашаетесь с нашими{" "}
                <Link
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Условиями использования
                </Link>{" "}
                и{" "}
                <Link
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Политикой конфиденциальности
                </Link>
                .
            </div>
        </div>
    );
}
