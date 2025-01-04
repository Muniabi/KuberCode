"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
} from "@/components/ui/index";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
    className?: string;
}

function getAvatarFromLocalStorage(userId: string | undefined): string | null {
    if (!userId) return null;
    return localStorage.getItem(`avatar-${userId}`);
}

export const AccountButton: React.FC<Props> = ({ className }) => {
    const { data: session, status } = useSession();
    const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
    const [isLocalAuth, setIsLocalAuth] = useState(false);
    const [localEmail, setLocalEmail] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const email = localStorage.getItem("email");

        if (token) {
            setIsLocalAuth(true);
            setLocalEmail(email);
        }

        if (session?.user) {
            const userId = session.user.id;
            let avatar = session.user.avatar;

            if (!avatar) {
                avatar = getAvatarFromLocalStorage(userId) || "";
            }

            setAvatarSrc(avatar);
        }
    }, [session]);

    // Показываем скелетон только при начальной загрузке
    if (status === "loading") {
        return <Skeleton className="h-10 w-10 rounded-full" />;
    }

    // Если пользователь авторизован (через NextAuth или локально)
    if (status === "authenticated" || isLocalAuth) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href="/account" aria-label="Профиль">
                            <Avatar className="transition-transform hover:scale-105">
                                <AvatarImage
                                    src={avatarSrc || "/avatar1.png"}
                                    alt={
                                        session?.user?.name ||
                                        localEmail ||
                                        "User"
                                    }
                                />
                                <AvatarFallback className="bg-gradient-to-r from-[#A559DD] to-[#591F9C] text-white">
                                    {session?.user?.name
                                        ? session.user.name.charAt(0)
                                        : localEmail
                                        ? localEmail.charAt(0).toUpperCase()
                                        : "?"}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Профиль</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    // Если пользователь не авторизован
    return (
        <Link href="/login">
            <Button
                className="bg-gradient-to-r from-[#A559DD] to-[#591F9C] text-white hover:opacity-90 transition-opacity"
                aria-label="Войти"
            >
                Войти
            </Button>
        </Link>
    );
};
