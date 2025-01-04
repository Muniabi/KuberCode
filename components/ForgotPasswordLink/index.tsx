"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestPasswordReset } from "@/utils/services/Authentication";

const formSchema = z.object({
    email: z.string().email({
        message: "Пожалуйста, введите корректный email",
    }),
});

type FormData = z.infer<typeof formSchema>;

export default function ForgotPasswordLink() {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const response = await requestPasswordReset(data.email);
            if (response.success) {
                toast.success(
                    "Инструкции по восстановлению отправлены на ваш email"
                );
                setIsOpen(false);
                form.reset();
            } else {
                toast.error(response.message || "Произошла ошибка");
            }
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Произошла ошибка при отправке"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="link"
                    className="px-0 font-normal text-primary hover:text-primary/90 hover:underline hover:bg-transparent"
                >
                    Забыли пароль?
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background border-primary/20">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-[#A559DD] to-[#591F9C] bg-clip-text text-transparent">
                        Восстановление пароля
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Введите email, указанный при регистрации. Мы отправим
                        вам инструкции по восстановлению пароля.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit(onSubmit)(e);
                    }}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="example@mail.com"
                            className="border-primary/20 focus-visible:ring-primary/30"
                            {...form.register("email")}
                            disabled={isLoading}
                        />
                        {form.formState.errors.email && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#A559DD] to-[#591F9C] hover:opacity-90 transition-opacity"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
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
                                Отправка...
                            </div>
                        ) : (
                            "Отправить инструкции"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
