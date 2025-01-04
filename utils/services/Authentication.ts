import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";

export const IP = "http://localhost:8080";

interface RegisterResponse {
    status: number;
    data: {
        message: string;
    };
}

interface LoginResponse {
    [x: string]: any;
    data: {
        accessToken: {
            accessToken: {
                token: string;
            };
        };
        account: {
            email: string;
            isTeacher: boolean;
        };
    };
    status: number;
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
        // Сначала регистрируем пользователя
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    isTeacher,
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Ошибка при регистрации");
        }

        // После успешной регистрации сразу выполняем вход
        await login(email, password);
    } catch (error) {
        console.error("Ошибка при регистрации:", error);
        throw error;
    }
};
//

// Логин пользователя
export const login = async (email: string, password: string) => {
    try {
        console.log("Starting login process");
        console.log("Credentials:", { email, password: "***" });

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl: "/account",
        });

        console.log("SignIn complete. Result:", {
            ...result,
            error: result?.error || null,
            status: result?.status,
            ok: result?.ok,
        });

        if (result?.error) {
            if (result.error === "CredentialsSignin") {
                throw new Error("Неверный email или пароль");
            }
            throw new Error(`Ошибка авторизации: ${result.error}`);
        }

        if (!result?.ok) {
            throw new Error(`Ошибка входа. Статус: ${result?.status}`);
        }

        return result;
    } catch (error) {
        console.error("Login process failed:", error);
        throw error;
    }
};

export const logOut = async (): Promise<{
    status: number;
    data: { message: string };
}> => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${IP}/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Очищаем данные авторизации из localStorage
        localStorage.clear();

        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
            throw new Error("Ошибка авторизации.");
        } else if (err.response?.status === 500) {
            throw new Error("Ошибка сервера. Попробуйте позже.");
        } else {
            throw new Error("Ошибка. Проверьте соединение с интернетом.");
        }
    }
};

// Функция обновления токена
export const refreshAccessToken = async (refreshToken: string) => {
    try {
        const response = await fetch(`${IP}/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Failed to refresh token");
        }

        return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        };
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
    }
};

export const requestPasswordReset = async (
    email: string
): Promise<ResetPasswordResponse> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Ошибка при запросе сброса пароля");
        }

        return data;
    } catch (error) {
        console.error("Error requesting password reset:", error);
        throw error;
    }
};
