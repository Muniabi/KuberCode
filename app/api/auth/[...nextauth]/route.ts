import NextAuth from "next-auth";
import axios from "axios";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import VkProvider from "next-auth/providers/vk";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import type { AuthOptions } from "next-auth";

// Схема валидации
const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
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
                    console.error("No credentials provided");
                    return null;
                }

                try {
                    // Валидация входных данных
                    const validatedData = formSchema.parse({
                        email: credentials.email,
                        password: credentials.password,
                    });

                    console.log("Attempting to authenticate with:", {
                        email: validatedData.email,
                        apiUrl: process.env.NEXT_PUBLIC_API_URL,
                    });

                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
                        {
                            email: validatedData.email,
                            password: validatedData.password,
                        },
                        {
                            headers: { "Content-Type": "application/json" },
                        }
                    );

                    const data = response.data;
                    console.log("Raw login response:", data);

                    // Проверяем наличие необходимых данных
                    if (!data) {
                        throw new Error("No data received from login endpoint");
                    }

                    // Адаптивное извлечение данных
                    const user = {
                        id:
                            data.id ||
                            data.user?.id ||
                            data.userId ||
                            "unknown",
                        email: validatedData.email,
                        name: validatedData.email,
                        image: data.avatar || data.user?.avatar || "",
                        avatar: data.avatar || data.user?.avatar || "",
                        isMentor: data.isMentor || data.user?.isMentor || false,
                        premium: data.premium || data.user?.premium || false,
                        accessToken:
                            data.access_token || data.accessToken || data.token,
                        refreshToken: data.refresh_token || data.refreshToken,
                    };

                    console.log("Processed user data:", user);
                    return user;
                } catch (e) {
                    console.error("Authorization error:", e);
                    if (axios.isAxiosError(e)) {
                        console.error("Axios error details:", {
                            status: e.response?.status,
                            data: e.response?.data,
                            message: e.message,
                            config: {
                                url: e.config?.url,
                                method: e.config?.method,
                                headers: e.config?.headers,
                            },
                        });
                    }
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.isMentor = user.isMentor;
                token.email = user.email;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.accessToken = token.accessToken as string;
                session.user.refreshToken = token.refreshToken as string;
                session.user.isMentor = token.isMentor as boolean;
                session.user.email = token.email as string;
                session.user.id = token.id as string;
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
    },
};

// Создаем handler с помощью NextAuth
const handler = NextAuth(authOptions);

// Экспортируем функции GET и POST отдельно
export { handler as GET, handler as POST };

// Не экспортируем authOptions напрямую
