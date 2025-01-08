import axios, { AxiosError } from "axios";
import { signIn, signOut } from "next-auth/react";

export const IP = process.env.NEXT_PUBLIC_API_URL;

interface AuthResponse {
    token: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        name: string;
        avatar?: string;
        isTeacher: boolean;
        premium?: boolean;
    };
}

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

interface ResetPasswordResponse {
    success: boolean;
    message: string;
}

// Регистрация пользователя
export const register = async (
    email: string,
    password: string,
    isTeacher: boolean
): Promise<void> => {
    try {
        const response = await fetch(`${IP}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                isTeacher,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Ошибка при регистрации");
        }

        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
    } catch (error) {
        console.error("Ошибка при регистрации:", error);
        throw error;
    }
};

// Логин через NextAuth
export const login = async (email: string, password: string) => {
    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            throw new Error(
                result.error === "CredentialsSignin"
                    ? "Неверный email или пароль"
                    : `Ошибка авторизации: ${result.error}`
            );
        }

        return result;
    } catch (error) {
        console.error("Ошибка входа:", error);
        throw error;
    }
};

// Выход
export const logout = async () => {
    try {
        const session = await fetch("/api/auth/session");
        const sessionData = await session.json();

        if (sessionData?.accessToken) {
            await api.post("/logout", {
                accessToken: sessionData.accessToken,
            });
        }

        await signOut({ redirect: false });
    } catch (error) {
        console.error("Ошибка выхода:", error);
        await signOut({ redirect: false });
        throw error;
    }
};

// Обновление токенов
export const refreshTokens = async (
    refreshToken: string
): Promise<TokenResponse> => {
    try {
        const response = await fetch(`${IP}/updateToken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            throw new Error("Не удалось обновить токен");
        }

        const data = await response.json();

        await fetch("/api/auth/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            }),
        });

        return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        };
    } catch (error) {
        console.error("Ошибка обновления токена:", error);
        await signOut({ redirect: false });
        throw error;
    }
};

// Сброс пароля
export const requestPasswordReset = async (
    email: string
): Promise<ResetPasswordResponse> => {
    try {
        const { data } = await api.post("/resetPassword", { email });
        return data;
    } catch (error) {
        console.error("Ошибка запроса сброса пароля:", error);
        throw error;
    }
};

// Подтверждение сброса пароля
export const confirmPasswordReset = async (
    token: string,
    newPassword: string
): Promise<{ success: boolean; message: string }> => {
    try {
        const { data } = await api.post("/confirmResetPassword", {
            token,
            newPassword,
        });
        return data;
    } catch (error) {
        console.error("Ошибка подтверждения сброса пароля:", error);
        throw error;
    }
};

// Создаем axios инстанс с перехватчиками
export const api = axios.create({
    baseURL: IP,
});

// Добавляем токен к каждому запросу
api.interceptors.request.use(
    async (config) => {
        // Получаем текущую сессию
        const session = await fetch("/api/auth/session");
        const sessionData = await session.json();

        if (sessionData?.accessToken) {
            config.headers.Authorization = `Bearer ${sessionData.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Обработка ответов и обновление токена при необходимости
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;
        if (!originalRequest) return Promise.reject(error);

        if (
            error.response?.status === 401 &&
            originalRequest.url !== "/updateToken"
        ) {
            try {
                const session = await fetch("/api/auth/session");
                const sessionData = await session.json();

                if (!sessionData?.refreshToken) {
                    throw new Error("Нет refresh токена");
                }

                // Обновляем токены
                const tokens = await refreshTokens(sessionData.refreshToken);

                // Обновляем заголовок и повторяем запрос
                originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                await signOut({ redirect: false });
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
