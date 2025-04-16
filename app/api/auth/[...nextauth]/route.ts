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
                    formSchema.parse({
                        email: credentials.email,
                        password: credentials.password,
                    });

                    console.log("Attempting to authenticate with:", {
                        email: credentials.email,
                        apiUrl: "http://localhost:8080",
                    });

                    const response = await axios.post(
                        `http://localhost:8080/api/v1/auth/login`,
                        {
                            email: credentials.email,
                            password: credentials.password,
                        },
                        {
                            headers: { "Content-Type": "application/json" },
                        }
                    );

                    const data = response.data;
                    console.log(
                        "Authentication successful. Raw response:",
                        JSON.stringify(data)
                    );
                    console.log("User data:", JSON.stringify(data.user));

                    const user = {
                        id: data.user.id,
                        email: data.user.email,
                        name: data.user.email,
                        image: data.user.avatar || "",
                        avatar: data.user.avatar || "",
                        isMentor: data.user.isMentor,
                        premium: data.user.premium || false,
                        accessToken: data.access_token,
                        refreshToken: data.refresh_token,
                    };

                    console.log("Processed user data:", JSON.stringify(user));
                    return user;
                } catch (e) {
                    console.error("Authorization error:", e);
                    if (axios.isAxiosError(e)) {
                        console.error("Axios error details:", {
                            status: e.response?.status,
                            data: e.response?.data,
                            message: e.message,
                        });
                    }
                    throw new Error("Неверный email или пароль");
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
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.accessToken = token.accessToken as string;
                session.user.refreshToken = token.refreshToken as string;
                session.user.isMentor = token.isMentor as boolean;
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
