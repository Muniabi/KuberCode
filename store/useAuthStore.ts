import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as AuthService from "@/utils/services/Authentication";
import { toast } from "sonner";

interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    isMentor: boolean;
    premium?: boolean;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    register: (
        email: string,
        password: string,
        isMentor: boolean
    ) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
    updateAvatar: (file: File) => Promise<void>;
    updateEmail: (newEmail: string, password: string) => Promise<void>;
    updatePassword: (
        currentPassword: string,
        newPassword: string
    ) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    confirmResetPassword: (token: string, newPassword: string) => Promise<void>;

    // Getters
    getUser: () => User | null;
    getUserId: () => string | null;
    getUserEmail: () => string | null;
    getUserName: () => string | null;
    getUserAvatar: () => string | undefined;
    getIsMentor: () => boolean;
    getIsPremium: () => boolean;
    getIsAuthenticated: () => boolean;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // Actions
            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });
                try {
                    const result = await AuthService.login(email, password);
                    if (result?.ok) {
                        // Предполагаем, что у нас есть метод получения данных пользователя
                        const session = await AuthService.api.get(
                            "/api/auth/session"
                        );
                        const userData = session.data?.user;
                        set({
                            user: userData,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                        toast.success("Вы успешно вошли в систему");
                    }
                } catch (error) {
                    const errorMessage =
                        error instanceof Error ? error.message : "Ошибка входа";
                    set({ error: errorMessage, isLoading: false });
                    toast.error(errorMessage);
                    throw error;
                }
            },

            register: async (
                email: string,
                password: string,
                isMentor: boolean
            ) => {
                set({ isLoading: true, error: null });
                try {
                    await AuthService.register(email, password, isMentor);
                    // После успешной регистрации выполняем вход
                    await get().login(email, password);
                    toast.success("Регистрация успешно завершена");
                } catch (error) {
                    const errorMessage =
                        error instanceof Error
                            ? error.message
                            : "Ошибка регистрации";
                    set({ error: errorMessage, isLoading: false });
                    toast.error(errorMessage);
                    throw error;
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    await AuthService.logout();
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                    toast.success("Вы успешно вышли из системы");
                } catch (error) {
                    set({ isLoading: false });
                    toast.error("Ошибка при выходе из системы");
                }
            },

            updateProfile: async (data: Partial<User>) => {
                set({ isLoading: true });
                try {
                    // Здесь должен быть запрос к API для обновления профиля
                    const response = await AuthService.api.patch(
                        "/api/v1/users/profile",
                        data
                    );
                    set((state) => ({
                        user: { ...state.user, ...response.data },
                        isLoading: false,
                    }));
                    toast.success("Профиль успешно обновлен");
                } catch (error) {
                    set({ isLoading: false });
                    toast.error("Ошибка при обновлении профиля");
                    throw error;
                }
            },

            updateAvatar: async (file: File) => {
                set({ isLoading: true });
                try {
                    const formData = new FormData();
                    formData.append("avatar", file);

                    const response = await AuthService.api.post(
                        "/api/v1/users/avatar",
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );

                    set((state) => ({
                        user: state.user
                            ? { ...state.user, avatar: response.data.avatar }
                            : null,
                        isLoading: false,
                    }));
                    toast.success("Фото профиля обновлено");
                } catch (error) {
                    set({ isLoading: false });
                    toast.error("Ошибка при обновлении фото профиля");
                    throw error;
                }
            },

            updateEmail: async (newEmail: string, password: string) => {
                set({ isLoading: true });
                try {
                    await AuthService.api.patch("/api/v1/users/email", {
                        email: newEmail,
                        password,
                    });
                    set((state) => ({
                        user: state.user
                            ? { ...state.user, email: newEmail }
                            : null,
                        isLoading: false,
                    }));
                    toast.success("Email успешно обновлен");
                } catch (error) {
                    set({ isLoading: false });
                    toast.error("Ошибка при обновлении email");
                    throw error;
                }
            },

            updatePassword: async (
                currentPassword: string,
                newPassword: string
            ) => {
                set({ isLoading: true });
                try {
                    await AuthService.api.patch("/api/v1/users/password", {
                        currentPassword,
                        newPassword,
                    });
                    set({ isLoading: false });
                    toast.success("Пароль успешно обновлен");
                } catch (error) {
                    set({ isLoading: false });
                    toast.error("Ошибка при обновлении пароля");
                    throw error;
                }
            },

            resetPassword: async (email: string) => {
                set({ isLoading: true });
                try {
                    await AuthService.requestPasswordReset(email);
                    set({ isLoading: false });
                    toast.success(
                        "Инструкции по сбросу пароля отправлены на ваш email"
                    );
                } catch (error) {
                    set({ isLoading: false });
                    toast.error("Ошибка при запросе сброса пароля");
                    throw error;
                }
            },

            confirmResetPassword: async (
                token: string,
                newPassword: string
            ) => {
                set({ isLoading: true });
                try {
                    await AuthService.confirmPasswordReset(token, newPassword);
                    set({ isLoading: false });
                    toast.success("Пароль успешно сброшен");
                } catch (error) {
                    set({ isLoading: false });
                    toast.error("Ошибка при сбросе пароля");
                    throw error;
                }
            },

            // Getters
            getUser: () => get().user,
            getUserId: () => get().user?.id ?? null,
            getUserEmail: () => get().user?.email ?? null,
            getUserName: () => get().user?.name ?? null,
            getUserAvatar: () => get().user?.avatar,
            getIsMentor: () => get().user?.isMentor ?? false,
            getIsPremium: () => get().user?.premium ?? false,
            getIsAuthenticated: () => get().isAuthenticated,
        }),
        {
            name: "auth-storage", // имя для localStorage
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }), // сохраняем только эти поля
        }
    )
);

export default useAuthStore;
