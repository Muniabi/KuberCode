"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useEffect, useCallback } from "react";

const formSchema = z.object({
    fullName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    email: z.string().email("Введите корректный email"),
    bio: z.string().min(10, "Расскажите немного больше о себе"),
});

export const PersonalInfoStep = ({
    initialData,
    onComplete,
    onValidityChange,
}: {
    initialData: any;
    onComplete: (data: any) => void;
    onValidityChange: (isValid: boolean) => void;
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            fullName: "",
            email: "",
            bio: "",
        },
        mode: "onChange",
    });

    const handleFormChange = useCallback(() => {
        onValidityChange(form.formState.isValid);
        onComplete(form.getValues());
    }, [form, onComplete, onValidityChange]);

    useEffect(() => {
        const subscription = form.watch(handleFormChange);
        return () => subscription.unsubscribe();
    }, [form, handleFormChange]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Form {...form}>
                <div className="space-y-6">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Полное имя</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Иван Иванов"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="ivan@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>О себе</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Расскажите немного о себе..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </Form>
        </motion.div>
    );
};
