import { NextResponse } from "next/server";
import YooKassa from "yookassa";

// Инициализация ЮKassa с тестовыми данными
const yooKassa = new YooKassa({
    shopId: process.env.YOOKASSA_SHOP_ID || "",
    secretKey: process.env.YOOKASSA_SECRET_KEY || "",
});

export async function POST(request: Request) {
    try {
        const { amount } = await request.json();

        // Создание платежа в ЮKassa
        const payment = await yooKassa.createPayment({
            amount: {
                value: amount.toFixed(2),
                currency: "RUB",
            },
            capture: true,
            confirmation: {
                type: "qr",
                locale: "ru_RU",
            },
            description: "Оплата менторской сессии",
            metadata: {
                paymentType: "sbp",
            },
        });

        return NextResponse.json({
            success: true,
            paymentId: payment.id,
            qrUrl: payment.confirmation.confirmation_url,
        });
    } catch (error) {
        console.error("Payment creation error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to create payment",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
