import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { MOCK_COURSES } from "@/store/courses";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//     apiVersion: "17.6.0",
// });

export async function POST(request: Request) {
    // Ваша логика обработки POST-запроса
    return NextResponse.json({ message: "Purchase successful" });
}

// export async function POST(
//     request: Request,
//     { params }: { params: { courseId: string } }
// ) {
//     try {
//         const course = MOCK_COURSES.find((c) => c.id === params.courseId);
//         if (!course) {
//             return NextResponse.json(
//                 { error: "Course not found" },
//                 { status: 404 }
//             );
//         }

//         // Создаем сессию оплаты Stripe
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: "rub",
//                         product_data: {
//                             name: course.title,
//                             description: course.description,
//                             images: [course.image],
//                         },
//                         unit_amount: course.price.current * 100, // Конвертируем в копейки
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: "payment",
//             success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.id}/success?session_id={CHECKOUT_SESSION_ID}`,
//             cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.id}`,
//             metadata: {
//                 courseId: course.id,
//             },
//         });

//         return NextResponse.json({ sessionId: session.id });
//     } catch (error) {
//         console.error("Payment error:", error);
//         return NextResponse.json(
//             { error: "Failed to create payment session" },
//             { status: 500 }
//         );
//     }
// }
