import NextAuth from "next-auth";
import axios from "axios";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import VkProvider from "next-auth/providers/vk";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import type { AuthOptions } from "next-auth";

// Схема валидации
const loginSchema = z.object({
    email: z.string().email("Некорректный email"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

// Конфигурация NextAuth
const authOptions: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        VkProvider({
            clientId: process.env.VK_CLIENT_ID || "",
            clientSecret: process.env.VK_CLIENT_SECRET || "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("Не предоставлены учетные данные");
                }

                try {
                    // Валидация входных данных
                    const validatedData = loginSchema.parse({
                        email: credentials.email,
                        password: credentials.password,
                    });

                    console.log("Attempting login with:", {
                        email: validatedData.email,
                        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
                    });

                    // Запрос к API для входа
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
                        {
                            email: validatedData.email,
                            password: validatedData.password,
                            deviceToken: "web",
                        }
                    );

                    console.log("Login response:", response.data);

                    const data = response.data;

                    // Проверяем формат ответа от сервера
                    if (!data || !data.access_token || !data.user) {
                        console.error("Invalid response format:", data);
                        throw new Error("Некорректный ответ от сервера");
                    }

                    // Формируем объект пользователя для сессии
                    return {
                        id: data.user.id,
                        email: data.user.email,
                        name: data.user.email,
                        image: undefined,
                        accessToken: data.access_token,
                        refreshToken: data.refresh_token,
                        isMentor: data.user.is_mentor,
                    };
                } catch (error) {
                    console.error("Login error:", error);
                    if (axios.isAxiosError(error)) {
                        console.error("Axios error details:", {
                            status: error.response?.status,
                            data: error.response?.data,
                        });
                        throw new Error(
                            error.response?.data?.message ||
                                "Ошибка авторизации"
                        );
                    }
                    throw error;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.isMentor = user.isMentor;
                token.email = user.email;
                token.id = user.id;
                token.avatar = user.avatar;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.accessToken = token.accessToken as string;
                session.user.refreshToken = token.refreshToken as string;
                session.user.isMentor = token.isMentor as boolean;
                session.user.avatar = token.avatar as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 дней
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
