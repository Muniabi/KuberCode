import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/authOptions";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json(
                { message: "Пользователь не авторизован" },
                { status: 401 }
            );
        }

        let body;
        try {
            body = await request.json();
        } catch (e) {
            console.error("Ошибка парсинга JSON:", e);
            return NextResponse.json(
                { message: "Неверный формат данных" },
                { status: 400 }
            );
        }

        const { code, email } = body;

        if (!code || !email) {
            return NextResponse.json(
                { message: "Необходимо указать код и email" },
                { status: 400 }
            );
        }

        if (email !== session.user.email) {
            return NextResponse.json(
                { message: "Email не соответствует текущей сессии" },
                { status: 400 }
            );
        }

        console.log("Отправка запроса на верификацию:", {
            email,
            code,
            apiUrl: process.env.NEXT_PUBLIC_API_URL,
        });

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/otp/verify`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        code,
                    }),
                }
            );

            let responseData;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                try {
                    responseData = await response.json();
                } catch (e) {
                    console.error("Ошибка парсинга ответа от сервера:", e);
                    return NextResponse.json(
                        { message: "Ошибка обработки ответа от сервера" },
                        { status: 500 }
                    );
                }
            } else {
                responseData = await response.text();
                console.error("Неожиданный формат ответа:", responseData);
                return NextResponse.json(
                    { message: "Неверный формат ответа от сервера" },
                    { status: 500 }
                );
            }

            console.log("Ответ от сервера верификации:", responseData);

            if (!response.ok) {
                return NextResponse.json(
                    {
                        message:
                            responseData.message ||
                            "Неверный код подтверждения",
                    },
                    { status: response.status }
                );
            }

            // После успешной верификации возвращаем данные для авторизации
            return NextResponse.json({
                success: true,
                message: "Email успешно подтвержден",
                data: responseData,
            });
        } catch (error) {
            console.error("Ошибка при отправке запроса на верификацию:", error);
            return NextResponse.json(
                { message: "Ошибка при отправке запроса на верификацию" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Ошибка при верификации:", error);
        return NextResponse.json(
            { message: "Внутренняя ошибка сервера" },
            { status: 500 }
        );
    }
}
