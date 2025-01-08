import NextAuth from "next-auth";
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
                if (!credentials) return null;

                try {
                    formSchema.parse({
                        email: credentials.email,
                        password: credentials.password,
                    });

                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/login`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    );

                    const data = await response.json();

                    if (!response.ok) {
                        return null;
                    }

                    return {
                        id: credentials.email,
                        email: data.email,
                        name: data.email,
                        image: data.avatar || "",
                        avatar: data.avatar || "",
                        isTeacher: data.isTeacher,
                        premium: data.premium || false,
                        accessToken: data.token,
                        refreshToken: data.token,
                    };
                } catch (e) {
                    console.error("Authorization error:", e);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.isTeacher = user.isTeacher;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.accessToken = token.accessToken as string;
                session.user.refreshToken = token.refreshToken as string;
                session.user.isTeacher = token.isTeacher as boolean;
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
