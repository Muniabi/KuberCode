import { CreditCard, Banknote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PaymentMethodsProps {
    amount: number;
    onSelect: (method: "card" | "sbp") => void;
}

const methods = [
    {
        id: "card",
        label: "Банковская карта",
        description: "Visa, Mastercard, МИР",
        icon: CreditCard,
    },
    {
        id: "sbp",
        label: "Система быстрых платежей",
        description: "Оплата через СБП",
        icon: Banknote,
    },
];

export default function PaymentMethods({
    amount,
    onSelect,
}: PaymentMethodsProps) {
    return (
        <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
                Выберите способ оплаты
            </h2>

            <RadioGroup
                defaultValue="card"
                onValueChange={(value) => onSelect(value as "card" | "sbp")}
                className="space-y-4"
            >
                {methods.map(({ id, label, description, icon: Icon }) => (
                    <div
                        key={id}
                        className={cn(
                            "flex items-center space-x-4 rounded-lg border p-4 cursor-pointer transition-colors",
                            "hover:border-[--purple] hover:bg-[--purple]/5"
                        )}
                        onClick={() => onSelect(id as "card" | "sbp")}
                    >
                        <RadioGroupItem value={id} id={id} />
                        <Icon className="w-6 h-6 text-[--purple]" />
                        <div className="flex-1">
                            <Label htmlFor={id} className="font-medium">
                                {label}
                            </Label>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {description}
                            </p>
                        </div>
                    </div>
                ))}
            </RadioGroup>
        </Card>
    );
}
