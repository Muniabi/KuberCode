import { NextResponse } from "next/server";
import YooKassa from "yookassa";

const yooKassa = new YooKassa({
    shopId: process.env.YOOKASSA_SHOP_ID || "",
    secretKey: process.env.YOOKASSA_SECRET_KEY || "",
});

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const paymentId = searchParams.get("id");

        if (!paymentId) {
            return NextResponse.json(
                { error: "Payment ID is required" },
                { status: 400 }
            );
        }

        // Получение информации о платеже
        const payment = await yooKassa.getPayment(paymentId);

        return NextResponse.json({
            status: payment.status,
            paid: payment.paid,
            amount: payment.amount,
        });
    } catch (error) {
        console.error("Error checking payment status:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
