"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_COURSES } from "@/store/courses";
import { Container } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
    Loader2,
    CheckCircle,
    CreditCard,
    Shield,
    Smartphone,
    Wallet,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { IMaskInput } from "react-imask";
import { motion } from "framer-motion";

type PaymentMethod = "card" | "sbp" | "yoomoney";

const PaymentMethodIcons = {
    card: <CreditCard className="w-5 h-5" />,
    sbp: <Smartphone className="w-5 h-5" />,
    yoomoney: <Wallet className="w-5 h-5" />,
};

const PaymentMethodTitles = {
    card: "Банковская карта",
    sbp: "Система быстрых платежей",
    yoomoney: "ЮMoney",
};

const PurchaseContent = ({ courseId }: { courseId: string }) => {
    const course = MOCK_COURSES.find((c) => c.id === courseId);
    const router = useRouter();
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
    const [cardData, setCardData] = useState({
        number: "",
        expiry: "",
        cvv: "",
    });

    if (!course) return null;

    const handleDemoPurchase = async () => {
        setIsProcessing(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast({
            title: "Успешная покупка!",
            description: "Вы получили доступ к курсу",
            duration: 5000,
        });
        router.push(`/courses/${courseId}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-black py-12"
        >
            <Container>
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                            Оформление покупки
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Курс: {course.title}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="md:col-span-2 space-y-6"
                        >
                            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
                                <h3 className="font-medium mb-4 text-gray-900 dark:text-white">
                                    Выберите способ оплаты
                                </h3>
                                <RadioGroup
                                    value={paymentMethod}
                                    onValueChange={(value) =>
                                        setPaymentMethod(value as PaymentMethod)
                                    }
                                    className="space-y-3"
                                >
                                    {(
                                        Object.keys(
                                            PaymentMethodTitles
                                        ) as PaymentMethod[]
                                    ).map((method) => (
                                        <motion.div
                                            key={method}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                                        >
                                            <RadioGroupItem
                                                value={method}
                                                id={method}
                                                className="border-2"
                                            />
                                            <Label
                                                htmlFor={method}
                                                className="flex items-center flex-1 cursor-pointer"
                                            >
                                                <span className="bg-gray-100 dark:bg-zinc-700 p-2 rounded-md mr-3">
                                                    {PaymentMethodIcons[method]}
                                                </span>
                                                <span className="text-gray-900 dark:text-white">
                                                    {
                                                        PaymentMethodTitles[
                                                            method
                                                        ]
                                                    }
                                                </span>
                                            </Label>
                                        </motion.div>
                                    ))}
                                </RadioGroup>
                            </div>

                            {paymentMethod === "card" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
                                >
                                    <h3 className="font-medium mb-4 text-gray-900 dark:text-white">
                                        Данные карты
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                                Номер карты
                                            </label>
                                            <IMaskInput
                                                mask="0000 0000 0000 0000"
                                                value={cardData.number}
                                                onAccept={(value) =>
                                                    setCardData({
                                                        ...cardData,
                                                        number: value,
                                                    })
                                                }
                                                placeholder="0000 0000 0000 0000"
                                                className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 dark:text-white transition-all"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                                    Срок действия
                                                </label>
                                                <IMaskInput
                                                    mask="00/00"
                                                    value={cardData.expiry}
                                                    onAccept={(value) =>
                                                        setCardData({
                                                            ...cardData,
                                                            expiry: value,
                                                        })
                                                    }
                                                    placeholder="MM/YY"
                                                    className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 dark:text-white transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                                    CVV
                                                </label>
                                                <IMaskInput
                                                    mask="000"
                                                    value={cardData.cvv}
                                                    onAccept={(value) =>
                                                        setCardData({
                                                            ...cardData,
                                                            cvv: value,
                                                        })
                                                    }
                                                    placeholder="000"
                                                    className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 dark:text-white transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {paymentMethod === "sbp" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
                                >
                                    <div className="text-center p-6">
                                        <Smartphone className="w-16 h-16 mx-auto mb-4 text-purple-500" />
                                        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                                            Оплата через СБП
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            После нажатия кнопки "Оплатить"
                                            откроется приложение вашего банка
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {paymentMethod === "yoomoney" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
                                >
                                    <div className="text-center p-6">
                                        <Wallet className="w-16 h-16 mx-auto mb-4 text-purple-500" />
                                        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                                            Оплата через ЮMoney
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Вы будете перенаправлены на страницу
                                            оплаты ЮMoney
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <Shield className="w-5 h-5 text-green-500" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Безопасная оплата через шифрованное
                                        соединение
                                    </span>
                                </div>
                                <Button
                                    className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-all"
                                    size="lg"
                                    onClick={handleDemoPurchase}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex items-center"
                                        >
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Обработка...
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex items-center"
                                        >
                                            {PaymentMethodIcons[paymentMethod]}
                                            <span className="ml-2">
                                                Оплатить {course.price.current}{" "}
                                                ₽
                                            </span>
                                        </motion.div>
                                    )}
                                </Button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                                <h3 className="font-medium mb-4">
                                    Информация о заказе
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Стоимость курса
                                        </span>
                                        <span className="font-medium">
                                            {course.price.current} ₽
                                        </span>
                                    </div>
                                    {course.price.old && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">
                                                Скидка
                                            </span>
                                            <span className="text-green-500">
                                                -
                                                {course.price.old -
                                                    course.price.current}{" "}
                                                ₽
                                            </span>
                                        </div>
                                    )}
                                    <div className="pt-4 border-t">
                                        <div className="flex justify-between font-medium">
                                            <span>Итого</span>
                                            <span>
                                                {course.price.current} ₽
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                                <h3 className="font-medium mb-4">
                                    Что вы получаете
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Пожизненный доступ к материалам
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Доступ к сообществу студентов
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Сертификат о прохождении
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </motion.div>
    );
};

export default PurchaseContent;
