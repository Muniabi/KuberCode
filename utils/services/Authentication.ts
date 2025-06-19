import axios, { AxiosError } from "axios";
import { signIn, signOut } from "next-auth/react";
import { toast } from "sonner";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AuthResponse {
    token: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        name: string;
        avatar?: string;
        isMentor: boolean;
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

interface RegisterResponse {
    message: string;
    user: {
        id: string;
        email: string;
        name: string;
        avatar?: string;
        isMentor: boolean;
        premium?: boolean;
    };
}

// Регистрация пользователя
export const register = async (
    email: string,
    password: string,
    isMentor: boolean
): Promise<RegisterResponse> => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/auth/signup`, {
            email,
            password,
            isMentor,
            deviceToken: "web",
        });

        if (!response.data?.message) {
            throw new Error("Некорректный ответ от сервера");
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 409) {
                throw new Error("Пользователь с таким email уже существует");
            }
            throw new Error(
                error.response?.data?.message || "Ошибка при регистрации"
            );
        }
        throw new Error("Произошла ошибка при регистрации");
    }
};

// Вход через NextAuth credentials
export const login = async (email: string, password: string) => {
    try {
        console.log("Attempting login with credentials:", { email });

        const result = await signIn("credentials", {
            email,
            password,
            deviceToken: "web",
            redirect: false,
        });

        console.log("SignIn result:", result);

        if (result?.error) {
            console.error("SignIn error:", result.error);
            if (result.error === "CredentialsSignin") {
                throw new Error("Неверный email или пароль");
            }
            throw new Error(`Ошибка авторизации: ${result.error}`);
        }

        if (!result?.ok) {
            console.error("SignIn not OK:", result);
            throw new Error("Не удалось выполнить вход");
        }

        return result;
    } catch (error) {
        console.error("Login error:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Произошла ошибка при входе");
    }
};

// Выход
export const logout = async () => {
    try {
        await signOut({ redirect: false });
    } catch (error) {
        console.error("Ошибка при выходе:", error);
        throw error;
    }
};

// Обновление токенов
export const refreshTokens = async (
    refreshToken: string
): Promise<TokenResponse> => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/auth/refresh`, {
            refreshToken,
        });

        await axios.post("/api/auth/session", {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
        });

        return {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
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
        const { data } = await axios.post("/resetPassword", { email });
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
        const { data } = await axios.post("/confirmResetPassword", {
            token,
            newPassword,
        });
        return data;
    } catch (error) {
        console.error("Ошибка подтверждения сброса пароля:", error);
        throw error;
    }
};

// Создаем axios инстанс с базовым URL
export const api = axios.create({
    baseURL: API_URL,
});

// Добавляем перехватчик для добавления токена к запросам
api.interceptors.request.use(
    async (config) => {
        try {
            const response = await axios.get("/api/auth/session");
            const session = response.data;

            if (session?.user?.accessToken) {
                config.headers.Authorization = `Bearer ${session.user.accessToken}`;
            }
            return config;
        } catch (error) {
            return config;
        }
    },
    (error) => Promise.reject(error)
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
                const session = await axios.post("/api/auth/session");
                const sessionData = session.data;

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
