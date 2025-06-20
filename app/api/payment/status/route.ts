import { NextResponse } from "next/server";

// Получаем данные магазина из переменных окружения
const SHOP_ID = process.env.YOOKASSA_SHOP_ID || "1078686";
const SECRET_KEY =
    process.env.YOOKASSA_SECRET_KEY ||
    "test_sOrAwhfzGmwKpTrpu79wOYwnP6qzQCAAvNMETMGg87E";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const paymentId = searchParams.get("paymentId");

        console.log("Status check request - Payment ID:", paymentId);
        console.log(
            "All search params:",
            Object.fromEntries(searchParams.entries())
        );

        if (!paymentId) {
            console.log("No payment ID provided");
            return NextResponse.json(
                { success: false, message: "Payment ID is required" },
                { status: 400 }
            );
        }

        console.log("Making request to ЮKassa API for payment:", paymentId);

        // Запрашиваем статус платежа через API ЮKassa
        const response = await fetch(
            `https://api.yookassa.ru/v3/payments/${paymentId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `${SHOP_ID}:${SECRET_KEY}`
                    ).toString("base64")}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("ЮKassa API response status:", response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("ЮKassa API error:", errorData);
            throw new Error(`ЮKassa API error: ${response.status}`);
        }

        const payment = await response.json();
        console.log("Payment data from ЮKassa:", payment);

        return NextResponse.json({
            success: true,
            status: payment.status,
            paid: payment.paid,
            amount: payment.amount,
            description: payment.description,
        });
    } catch (error) {
        console.error("Payment status check error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to check payment status",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
