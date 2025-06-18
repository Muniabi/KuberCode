import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { amount } = await request.json();

        // Временная заглушка для тестирования
        const mockPayment = {
            id: `mock_${Date.now()}`,
            confirmation: {
                confirmation_url: "https://example.com/qr-code",
            },
        };

        // Имитация задержки сети
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json({
            success: true,
            paymentId: mockPayment.id,
            qrUrl: mockPayment.confirmation.confirmation_url,
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
