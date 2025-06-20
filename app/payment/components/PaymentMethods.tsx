import { CreditCard, Banknote, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PaymentMethodsProps {
    amount: number;
    onSelect: (method: "card" | "sbp") => void;
}

const methods = [
    {
        id: "card",
        label: "Банковская карта",
        description: "Visa, Mastercard, МИР через ЮKassa",
        icon: CreditCard,
        benefits: [
            "Мгновенное зачисление",
            "Без комиссии",
            "Безопасная оплата",
        ],
    },
    {
        id: "sbp",
        label: "Система быстрых платежей",
        description: "Оплата через СБП",
        icon: Banknote,
        benefits: ["Быстрый способ оплаты", "Поддержка всех банков"],
    },
];

export default function PaymentMethods({
    amount,
    onSelect,
}: PaymentMethodsProps) {
    return (
        <Card className="p-6 border-2">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold">
                        Выберите способ оплаты
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Все способы оплаты безопасны и защищены
                    </p>
                </div>
                <Shield className="w-5 h-5 text-green-500" />
            </div>

            <RadioGroup
                defaultValue="card"
                onValueChange={(value: string) =>
                    onSelect(value as "card" | "sbp")
                }
                className="space-y-4"
            >
                {methods.map(
                    (
                        { id, label, description, icon: Icon, benefits },
                        index
                    ) => (
                        <motion.div
                            key={id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div
                                className={cn(
                                    "relative flex items-start space-x-4 rounded-xl border-2 p-4 cursor-pointer transition-all duration-200",
                                    "hover:border-[--purple] hover:bg-[--purple]/5",
                                    "focus-within:border-[--purple] focus-within:ring-2 focus-within:ring-[--purple]/20"
                                )}
                                onClick={() => onSelect(id as "card" | "sbp")}
                            >
                                <RadioGroupItem
                                    value={id}
                                    id={id}
                                    className="mt-1"
                                />
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Icon className="w-5 h-5 text-[--purple]" />
                                            <Label
                                                htmlFor={id}
                                                className="font-medium cursor-pointer"
                                            >
                                                {label}
                                            </Label>
                                        </div>
                                    </div>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                        {description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {benefits.map((benefit, i) => (
                                            <span
                                                key={i}
                                                className="inline-flex items-center px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                                            >
                                                {benefit}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                )}
            </RadioGroup>
        </Card>
    );
}
