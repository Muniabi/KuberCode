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

        // После успешной регистрации выполняем вход через NextAuth
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
        await signOut({ redirect: false });
    } catch (error) {
        console.error("Ошибка выхода:", error);
        throw error;
    }
};

// Обновление токенов
export const refreshTokens = async (
    refreshToken: string
): Promise<TokenResponse> => {
    try {
        const response = await fetch(`${IP}/refresh-token`, {
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
        return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        };
    } catch (error) {
        console.error("Ошибка обновления токена:", error);
        // При ошибке обновления токена выходим из системы
        await signOut({ redirect: false });
        throw error;
    }
};

// Сброс пароля
export const requestPasswordReset = async (
    email: string
): Promise<ResetPasswordResponse> => {
    try {
        const response = await fetch(`${IP}/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Ошибка при запросе сброса пароля");
        }

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
        const response = await fetch(`${IP}/reset-password/confirm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                newPassword,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Ошибка при сбросе пароля");
        }

        return data;
    } catch (error) {
        console.error("Ошибка подтверждения сброса пароля:", error);
        throw error;
    }
};

// Создаем axios инстанс с перехватчиком для автоматического обновления токена
export const api = axios.create({
    baseURL: IP,
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;
        if (!originalRequest) return Promise.reject(error);

        // Если получили 401 и это не запрос на обновление токена
        if (
            error.response?.status === 401 &&
            originalRequest.url !== "/refresh-token"
        ) {
            try {
                // Получаем текущую сессию
                const session = await fetch("/api/auth/session");
                const sessionData = await session.json();

                if (!sessionData?.refreshToken) {
                    throw new Error("Нет refresh токена");
                }

                // Обновляем токены
                const tokens = await refreshTokens(sessionData.refreshToken);

                // Обновляем заголовок в оригинальном запросе
                originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

                // Повторяем оригинальный запрос
                return api(originalRequest);
            } catch (refreshError) {
                // Если не удалось обновить токен, выходим из системы
                await signOut({ redirect: false });
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
