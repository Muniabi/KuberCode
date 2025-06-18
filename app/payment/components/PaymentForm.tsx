import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock, ArrowLeft } from "lucide-react";

interface PaymentFormProps {
    method: "card" | "paypal";
    onSubmit: (data: any) => void;
    amount: number;
    onBack: () => void;
}

export default function PaymentForm({
    method,
    onSubmit,
    amount,
    onBack,
}: PaymentFormProps) {
    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(cardData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Форматирование номера карты
        if (name === "number") {
            formattedValue = value
                .replace(/\D/g, "")
                .replace(/(\d{4})/g, "$1 ")
                .trim()
                .slice(0, 19);
        }

        // Форматирование срока действия
        if (name === "expiry") {
            formattedValue = value
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d{0,2})/, "$1/$2")
                .slice(0, 5);
        }

        // Форматирование CVC
        if (name === "cvc") {
            formattedValue = value.replace(/\D/g, "").slice(0, 3);
        }

        setCardData((prev) => ({
            ...prev,
            [name]: formattedValue,
        }));
    };

    if (method === "paypal") {
        return (
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="text-zinc-500 hover:text-zinc-900"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Назад
                    </Button>
                </div>
                <h2 className="text-xl font-semibold mb-4">
                    Оплата через PayPal
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    Вы будете перенаправлены на сайт PayPal для завершения
                    оплаты.
                </p>
                <Button
                    onClick={() => onSubmit({ method: "paypal" })}
                    className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white"
                >
                    Перейти к оплате через PayPal
                </Button>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="text-zinc-500 hover:text-zinc-900"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад
                </Button>
                <h2 className="text-xl font-semibold">Данные карты</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="number">Номер карты</Label>
                    <div className="relative">
                        <Input
                            id="number"
                            name="number"
                            value={cardData.number}
                            onChange={handleInputChange}
                            placeholder="0000 0000 0000 0000"
                            className="pl-10"
                            required
                        />
                        <CreditCard className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name">Имя держателя карты</Label>
                    <Input
                        id="name"
                        name="name"
                        value={cardData.name}
                        onChange={handleInputChange}
                        placeholder="IVAN IVANOV"
                        className="uppercase"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="expiry">Срок действия</Label>
                        <Input
                            id="expiry"
                            name="expiry"
                            value={cardData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <div className="relative">
                            <Input
                                id="cvc"
                                name="cvc"
                                value={cardData.cvc}
                                onChange={handleInputChange}
                                placeholder="000"
                                className="pl-10"
                                required
                            />
                            <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <Button
                        type="submit"
                        className="w-full bg-[--purple] hover:bg-[--button-bg] text-white"
                    >
                        Оплатить {amount.toLocaleString()} ₽
                    </Button>

                    <p className="text-xs text-center mt-4 text-zinc-500">
                        Платёж безопасен и защищен SSL-шифрованием
                    </p>
                </div>
            </form>
        </Card>
    );
}
