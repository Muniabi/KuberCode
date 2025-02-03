import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
    try {
        const body = await request.text();
        const signature = headers().get("stripe-signature")!;

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            webhookSecret
        );

        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const courseId = session.metadata?.courseId;
                const userId = session.client_reference_id;

                if (courseId && userId) {
                    // Здесь добавляем логику для:
                    // 1. Предоставления доступа к курсу
                    // 2. Создания записи о покупке
                    // 3. Отправки email с подтверждением
                    await Promise.all([
                        grantCourseAccess(userId, courseId),
                        createPurchaseRecord(userId, courseId, session),
                        sendConfirmationEmail(userId, courseId),
                    ]);
                }
                break;
            }
            // Добавьте обработку других событий при необходимости
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 400 }
        );
    }
}

async function grantCourseAccess(userId: string, courseId: string) {
    // Реализация предоставления доступа к курсу
}

async function createPurchaseRecord(
    userId: string,
    courseId: string,
    session: Stripe.Checkout.Session
) {
    // Реализация создания записи о покупке
}

async function sendConfirmationEmail(userId: string, courseId: string) {
    // Реализация отправки email
}
