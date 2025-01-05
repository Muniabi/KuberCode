"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";

const formSchema = z.object({
    studyTime: z.enum(["morning", "afternoon", "evening"]),
    notifications: z.boolean(),
    emailUpdates: z.boolean(),
});

export const PreferencesStep = ({
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
            studyTime: "morning",
            notifications: true,
            emailUpdates: true,
        },
    });

    useEffect(() => {
        onValidityChange(true);

        const subscription = form.watch(() => {
            onComplete(form.getValues());
        });

        return () => subscription.unsubscribe();
    }, [form, onComplete, onValidityChange]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Form {...form}>
                <div className="space-y-8">
                    <FormField
                        control={form.control}
                        name="studyTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Предпочтительное время для обучения
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="grid grid-cols-3 gap-4"
                                    >
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem
                                                    value="morning"
                                                    className="peer sr-only"
                                                />
                                            </FormControl>
                                            <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                <span>Утро</span>
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem
                                                    value="afternoon"
                                                    className="peer sr-only"
                                                />
                                            </FormControl>
                                            <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                <span>День</span>
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem
                                                    value="evening"
                                                    className="peer sr-only"
                                                />
                                            </FormControl>
                                            <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                <span>Вечер</span>
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="notifications"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel>Уведомления</FormLabel>
                                    <div className="text-sm text-muted-foreground">
                                        Получать уведомления о новых уроках и
                                        событиях
                                    </div>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="emailUpdates"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel>Email рассылка</FormLabel>
                                    <div className="text-sm text-muted-foreground">
                                        Получать новости и обновления на email
                                    </div>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </Form>
        </motion.div>
    );
};
