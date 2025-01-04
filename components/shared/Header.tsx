"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Container, AccountButton } from "./index";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/index";

const communitys: { title: string; href: string; description: string }[] = [
    {
        title: "Форум",
        href: "/docs/primitives/alert-dialog",
        description:
            "Общайтесь с другими студентами и преподавателями, задавайте вопросы и делитесь знаниями.",
    },
    {
        title: "Новости IT",
        href: "/docs/primitives/alert-dialog",
        description:
            "Получайте обновления о последних новостях в области информационных технологий.",
    },
];

const events: { title: string; href: string; description: string }[] = [
    {
        title: "Кодинг-баттлы",
        href: "/docs/primitives/hover-card",
        description:
            "Соревнуйтесь с другими программистами в кодинг-баттлах, демонстрируя свои навыки и креативность.",
    },
    {
        title: "Лидеры недели",
        href: "/docs/primitives/progress",
        description:
            "Следите за достижениями лучших студентов недели и вдохновляйтесь их успехами.",
    },
    {
        title: "Достижения",
        href: "/docs/primitives/scroll-area",
        description:
            "Получайте достижения за успехи в обучении и делитесь ими с сообществом.",
    },
];

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header
            className={cn(
                "w-full bg-white dark:bg-black border-b border-stone-200 dark:border-stone-200/10",
                className
            )}
        >
            <Container className="max-w-[1500px] mx-auto">
                <div className="flex items-center justify-between py-6 px-10">
                    {/* Логотип */}
                    <Link
                        href="/"
                        className="relative z-20 flex items-center space-x-3"
                    >
                        <div className="w-8 h-8">
                            <svg
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full text-[#A559DD]"
                            >
                                {/* Основная вертикальная линия */}
                                <rect
                                    x="4"
                                    y="2"
                                    width="6"
                                    height="28"
                                    fill="currentColor"
                                />

                                {/* Верхняя диагональ */}
                                <rect
                                    x="10"
                                    y="12"
                                    width="6"
                                    height="6"
                                    fill="currentColor"
                                />
                                <rect
                                    x="15"
                                    y="7"
                                    width="6"
                                    height="6"
                                    fill="currentColor"
                                />
                                <rect
                                    x="20"
                                    y="2"
                                    width="6"
                                    height="6"
                                    fill="currentColor"
                                />

                                {/* Нижняя диагональ */}
                                <rect
                                    x="10"
                                    y="14"
                                    width="6"
                                    height="6"
                                    fill="currentColor"
                                />
                                <rect
                                    x="15"
                                    y="19"
                                    width="6"
                                    height="6"
                                    fill="currentColor"
                                />
                                <rect
                                    x="20"
                                    y="24"
                                    width="6"
                                    height="6"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-semibold text-stone-900 dark:text-white">
                            Kuber Code
                        </span>
                    </Link>

                    {/* Десктопное меню */}
                    <div className="hidden lg:block">
                        <NavigationMenu>
                            <NavigationMenuList className="gap-1">
                                <NavigationMenuItem>
                                    <Link
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "bg-stone-100/80 text-stone-900 hover:bg-stone-200/80 hover:text-stone-900",
                                            "dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white"
                                        )}
                                        href="/"
                                    >
                                        Главная
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "bg-stone-100/80 text-stone-900 hover:bg-stone-200/80 hover:text-stone-900",
                                            "dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white"
                                        )}
                                        href="/courses"
                                    >
                                        Курсы
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-stone-100/80 text-stone-900 hover:bg-stone-200/80 hover:text-stone-900 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white">
                                        Мероприятия
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white dark:bg-black border border-stone-200 dark:border-stone-200/10 rounded-lg">
                                            <li className="row-span-4">
                                                <Link
                                                    href="/"
                                                    legacyBehavior
                                                    passHref
                                                >
                                                    <NavigationMenuLink asChild>
                                                        <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-[url('/hackaton.webp')] bg-cover from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                                                            <div className="mb-2 mt-4 text-white text-lg font-medium">
                                                                Хакатоны
                                                            </div>
                                                            <p className="text-sm leading-tight text-stone-200 text-muted-foreground">
                                                                Участвуйте в
                                                                хакатонах, где
                                                                сможете решать
                                                                реальные задачи
                                                                и развивать свои
                                                                навыки в
                                                                команде.
                                                            </p>
                                                        </a>
                                                    </NavigationMenuLink>
                                                </Link>
                                            </li>
                                            {events.map((event) => (
                                                <ListItem
                                                    key={event.title}
                                                    title={event.title}
                                                    href={event.href}
                                                >
                                                    {event.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-stone-100/80 text-stone-900 hover:bg-stone-200/80 hover:text-stone-900 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white">
                                        Авторы
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                            {communitys.map((community) => (
                                                <ListItem
                                                    key={community.title}
                                                    title={community.title}
                                                    href={community.href}
                                                >
                                                    {community.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "bg-stone-100/80 text-stone-900 hover:bg-stone-200/80 hover:text-stone-900",
                                            "dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white"
                                        )}
                                        href="/support"
                                    >
                                        Медиа
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Правая часть (аккаунт и мобильное меню) */}
                    <div className="flex items-center space-x-4">
                        <AccountButton />

                        {/* Мобильное меню */}
                        <div className="lg:hidden">
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-100/10"
                                    >
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="right"
                                    className="w-[300px] bg-white dark:bg-black border-stone-200 dark:border-stone-200/10"
                                >
                                    <div className="flex flex-col space-y-6 pt-6">
                                        <Link
                                            href="/"
                                            className="text-stone-700 hover:text-stone-900 dark:text-stone-200 dark:hover:text-white transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Главная
                                        </Link>
                                        <Link
                                            href="/courses"
                                            className="text-stone-700 hover:text-stone-900 dark:text-stone-200 dark:hover:text-white transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Курсы
                                        </Link>

                                        {/* Мероприятия */}
                                        <div className="space-y-4">
                                            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
                                                Мероприятия
                                            </p>
                                            <div className="pl-2 space-y-3">
                                                <Link
                                                    href="/"
                                                    className="block text-stone-700 hover:text-stone-900 dark:text-stone-200 dark:hover:text-white transition-colors"
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                >
                                                    Хакатоны
                                                </Link>
                                                {events.map((event) => (
                                                    <Link
                                                        key={event.title}
                                                        href={event.href}
                                                        className="block text-stone-700 hover:text-stone-900 dark:text-stone-200 dark:hover:text-white transition-colors"
                                                        onClick={() =>
                                                            setIsOpen(false)
                                                        }
                                                    >
                                                        {event.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Авторы */}
                                        <div className="space-y-4">
                                            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
                                                Авторы
                                            </p>
                                            <div className="pl-2 space-y-3">
                                                {communitys.map((community) => (
                                                    <Link
                                                        key={community.title}
                                                        href={community.href}
                                                        className="block text-stone-700 hover:text-stone-900 dark:text-stone-200 dark:hover:text-white transition-colors"
                                                        onClick={() =>
                                                            setIsOpen(false)
                                                        }
                                                    >
                                                        {community.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        <Link
                                            href="/support"
                                            className="text-stone-700 hover:text-stone-900 dark:text-stone-200 dark:hover:text-white transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Медиа
                                        </Link>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
