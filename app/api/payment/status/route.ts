import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const paymentId = searchParams.get("paymentId");

        if (!paymentId) {
            return NextResponse.json(
                { success: false, message: "Payment ID is required" },
                { status: 400 }
            );
        }

        // Имитация задержки сети
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Временная заглушка: случайным образом возвращаем статус платежа
        const statuses = ["pending", "succeeded", "canceled"];
        const randomStatus =
            statuses[Math.floor(Math.random() * statuses.length)];

        return NextResponse.json({
            success: true,
            status: randomStatus,
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
