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
import { LockKeyhole } from "lucide-react";
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
        // Проверяем наличие токена в localStorage
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

    if (status === "loading") {
        return (
            <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
            </div>
        );
    }

    // Показываем аватар если есть сессия или локальная авторизация
    if (status === "authenticated" || isLocalAuth) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href="/account" aria-label="Профиль">
                            <Avatar>
                                <AvatarImage
                                    src={avatarSrc || "/avatar1.png"} // Добавьте дефолтную аватарку
                                    alt={
                                        session?.user?.name ||
                                        localEmail ||
                                        "User"
                                    }
                                />
                                <AvatarFallback>
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

    if (status === "unauthenticated" && !isLocalAuth) {
        return (
            <div className="flex items-center gap-2">
                <Link href="/login">
                    <Button
                        variant="ghost"
                        className="dark:text-white"
                        aria-label="Войти"
                    >
                        <LockKeyhole size={24} />
                        Войти
                    </Button>
                </Link>
                <Link href="/register">
                    <Button>Регистрация</Button>
                </Link>
            </div>
        );
    }

    return null;
};
