import { NextResponse } from "next/server";

// Получаем данные магазина из переменных окружения
const SHOP_ID = process.env.YOOKASSA_SHOP_ID || "1078686";
const SECRET_KEY =
    process.env.YOOKASSA_SECRET_KEY ||
    "test_sOrAwhfzGmwKpTrpu79wOYwnP6qzQCAAvNMETMGg87E";

export async function POST(request: Request) {
    try {
        const {
            amount,
            mentorId,
            mentorName,
            sessionDate,
            sessionTime,
            duration,
        } = await request.json();

        console.log("Creating payment with data:", {
            amount,
            mentorId,
            mentorName,
            sessionDate,
            sessionTime,
            duration,
        });

        // Генерируем уникальный ключ идемпотентности
        const idempotenceKey = `payment_${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 9)}`;

        // Формируем описание платежа
        const description = `Сессия с ментором ${mentorName} на ${sessionDate} в ${sessionTime} (${duration} ч)`;

        // Данные для создания платежа в ЮKassa
        const paymentData = {
            amount: {
                value: amount.toFixed(2),
                currency: "RUB",
            },
            capture: true,
            confirmation: {
                type: "redirect",
                return_url: `${
                    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
                }/payment/success`,
            },
            description: description.substring(0, 128), // Ограничение ЮKassa
            metadata: {
                mentorId: mentorId.toString(),
                mentorName,
                sessionDate,
                sessionTime,
                duration,
            },
        };

        console.log("Payment data for ЮKassa:", paymentData);

        // Создаем платеж через API ЮKassa
        const response = await fetch("https://api.yookassa.ru/v3/payments", {
            method: "POST",
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${SHOP_ID}:${SECRET_KEY}`
                ).toString("base64")}`,
                "Idempotence-Key": idempotenceKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
        });

        console.log("ЮKassa API response status:", response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("ЮKassa API error:", errorData);
            throw new Error(`ЮKassa API error: ${response.status}`);
        }

        const payment = await response.json();
        console.log("Payment created successfully:", payment);

        return NextResponse.json({
            success: true,
            paymentId: payment.id,
            confirmationUrl: payment.confirmation.confirmation_url,
            status: payment.status,
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
