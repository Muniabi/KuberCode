"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

const skills = [
    { id: "html", label: "HTML" },
    { id: "css", label: "CSS" },
    { id: "javascript", label: "JavaScript" },
    { id: "react", label: "React" },
    { id: "typescript", label: "TypeScript" },
    { id: "node", label: "Node.js" },
    { id: "python", label: "Python" },
    { id: "java", label: "Java" },
] as const;

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
                        render={() => (
                            <FormItem>
                                <FormLabel>Выберите ваши навыки</FormLabel>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                                    {skills.map((skill) => (
                                        <FormField
                                            key={skill.id}
                                            control={form.control}
                                            name="skills"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(
                                                                skill.id
                                                            )}
                                                            onCheckedChange={(
                                                                checked
                                                            ) => {
                                                                const value =
                                                                    field.value ||
                                                                    [];
                                                                if (checked) {
                                                                    field.onChange(
                                                                        [
                                                                            ...value,
                                                                            skill.id,
                                                                        ]
                                                                    );
                                                                } else {
                                                                    field.onChange(
                                                                        value.filter(
                                                                            (
                                                                                v
                                                                            ) =>
                                                                                v !==
                                                                                skill.id
                                                                        )
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        {skill.label}
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
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
                                <FormLabel>Уровень опыта</FormLabel>
                                <div className="grid grid-cols-3 gap-4 mt-2">
                                    {[
                                        "beginner",
                                        "intermediate",
                                        "advanced",
                                    ].map((level) => (
                                        <Button
                                            key={level}
                                            type="button"
                                            variant={
                                                field.value === level
                                                    ? "default"
                                                    : "outline"
                                            }
                                            className="w-full"
                                            onClick={() =>
                                                field.onChange(level)
                                            }
                                        >
                                            {level === "beginner" &&
                                                "Начинающий"}
                                            {level === "intermediate" &&
                                                "Средний"}
                                            {level === "advanced" &&
                                                "Продвинутый"}
                                        </Button>
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
