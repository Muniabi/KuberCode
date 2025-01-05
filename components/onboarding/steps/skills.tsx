"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    skills: z.array(z.string()).min(1, "Выберите хотя бы один навык"),
    experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
});

export const SkillsStep = ({
    initialData,
    onComplete,
    onValidityChange,
}: {
    initialData: any;
    onComplete: (data: any) => void;
    onValidityChange: (isValid: boolean) => void;
}) => {
    const skills = [
        { id: "html", label: "HTML", icon: "🌐", color: "bg-orange-500" },
        { id: "css", label: "CSS", icon: "🎨", color: "bg-blue-500" },
        {
            id: "javascript",
            label: "JavaScript",
            icon: "⚡",
            color: "bg-yellow-500",
        },
        { id: "react", label: "React", icon: "⚛️", color: "bg-cyan-500" },
        {
            id: "typescript",
            label: "TypeScript",
            icon: "📘",
            color: "bg-blue-600",
        },
        { id: "node", label: "Node.js", icon: "🟢", color: "bg-green-600" },
        { id: "python", label: "Python", icon: "🐍", color: "bg-yellow-600" },
        { id: "java", label: "Java", icon: "☕", color: "bg-red-600" },
    ] as const;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            skills: [],
            experienceLevel: "beginner",
        },
        mode: "onChange",
    });

    useEffect(() => {
        const subscription = form.watch(() => {
            onValidityChange(form.formState.isValid);
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
                        name="skills"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold">
                                    Выберите ваши навыки
                                </FormLabel>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                    {skills.map((skill) => {
                                        const isSelected =
                                            field.value?.includes(skill.id);
                                        return (
                                            <motion.div
                                                key={skill.id}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const value =
                                                            field.value || [];
                                                        if (isSelected) {
                                                            field.onChange(
                                                                value.filter(
                                                                    (v) =>
                                                                        v !==
                                                                        skill.id
                                                                )
                                                            );
                                                        } else {
                                                            field.onChange([
                                                                ...value,
                                                                skill.id,
                                                            ]);
                                                        }
                                                    }}
                                                    className={cn(
                                                        "w-full p-4 rounded-xl transition-all duration-200",
                                                        "border-2 flex flex-col items-center gap-2",
                                                        "hover:border-primary",
                                                        isSelected
                                                            ? "border-primary bg-primary/5 dark:bg-primary/10"
                                                            : "border-muted bg-card hover:bg-accent/50"
                                                    )}
                                                >
                                                    <div
                                                        className={cn(
                                                            "w-12 h-12 rounded-lg flex items-center justify-center text-2xl",
                                                            "bg-gradient-to-br from-primary/10 to-primary/30"
                                                        )}
                                                    >
                                                        {skill.icon}
                                                    </div>
                                                    <span className="font-medium">
                                                        {skill.label}
                                                    </span>
                                                </button>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="experienceLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold">
                                    Уровень опыта
                                </FormLabel>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    {[
                                        {
                                            value: "beginner",
                                            label: "Начинающий",
                                            icon: "🌱",
                                        },
                                        {
                                            value: "intermediate",
                                            label: "Средний",
                                            icon: "🌿",
                                        },
                                        {
                                            value: "advanced",
                                            label: "Продвинутый",
                                            icon: "🌳",
                                        },
                                    ].map((level) => (
                                        <motion.div
                                            key={level.value}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    field.onChange(level.value)
                                                }
                                                className={cn(
                                                    "w-full p-4 rounded-xl transition-all duration-200",
                                                    "border-2 flex flex-col items-center gap-2",
                                                    "hover:border-primary",
                                                    field.value === level.value
                                                        ? "border-primary bg-primary/5 dark:bg-primary/10"
                                                        : "border-muted bg-card hover:bg-accent/50"
                                                )}
                                            >
                                                <span className="text-2xl">
                                                    {level.icon}
                                                </span>
                                                <span className="font-medium">
                                                    {level.label}
                                                </span>
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </Form>
        </motion.div>
    );
};
