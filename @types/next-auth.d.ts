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
            premium?: boolean;
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
        premium?: boolean;
        error?: string;
    }
}
