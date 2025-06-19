// @types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            image?: string;
            avatar?: string;
            accessToken: string;
            refreshToken: string;
            isMentor: boolean;
            error?: string;
        };
    }

    interface User {
        id: string;
        email: string;
        name: string;
        image?: string;
        avatar?: string;
        accessToken: string;
        refreshToken: string;
        isMentor: boolean;
        error?: string;
    }
}

// Добавляем типы для API ответов
interface AuthResponse {
    message?: string;
    user: {
        id: string;
        email: string;
        name: string;
        avatar?: string;
        isMentor: boolean;
    };
    accessToken: string;
    refreshToken: string;
}

interface RegisterResponse {
    message: string;
}
