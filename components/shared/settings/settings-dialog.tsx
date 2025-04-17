"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Settings,
    User,
    Bell,
    Palette,
    Shield,
    Key,
    Upload,
    Trash2,
    Mail,
    Globe,
    Moon,
    Sun,
    Smartphone,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface SettingsDialogProps {
    user: {
        name: string;
        email: string;
        avatar: string;
    };
}

export function SettingsDialog({ user }: SettingsDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState("ru");

    const menuItems = [
        { id: "profile", label: "Профиль", icon: User },
        { id: "notifications", label: "Уведомления", icon: Bell },
        { id: "appearance", label: "Внешний вид", icon: Palette },
        { id: "security", label: "Безопасность", icon: Shield },
        { id: "privacy", label: "Приватность", icon: Key },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    className="w-full"
                    onSelect={(e) => e.preventDefault()}
                >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Настройки</span>
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-[90vw] h-[85vh] p-0">
                <Tabs defaultValue="profile" className="flex h-full">
                    {/* Боковая панель с вкладками */}
                    <div className="hidden sm:flex h-full w-[240px] flex-col border-r">
                        <div className="flex items-center gap-2 p-4 border-b">
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src={user.avatar}
                                    alt={user.name}
                                />
                                <AvatarFallback>
                                    {user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                    {user.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {user.email}
                                </span>
                            </div>
                        </div>
                        <TabsList className="flex flex-col h-full w-full rounded-none border-none bg-transparent p-2 space-y-1">
                            {menuItems.map((item) => (
                                <TabsTrigger
                                    key={item.id}
                                    value={item.id}
                                    className="justify-start w-full gap-2 px-3 py-2 text-sm font-medium"
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {/* Мобильная навигация */}
                    <div className="sm:hidden w-full border-b px-4 py-3">
                        <div className="flex items-center gap-4 mb-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src={user.avatar}
                                    alt={user.name}
                                />
                                <AvatarFallback>
                                    {user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                    {user.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {user.email}
                                </span>
                            </div>
                        </div>
                        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-12 space-x-2">
                            {menuItems.map((item) => (
                                <TabsTrigger
                                    key={item.id}
                                    value={item.id}
                                    className="gap-2 px-3 py-2"
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {/* Основной контент */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="h-full px-6 py-6">
                            <TabsContent
                                value="profile"
                                className="mt-0 border-0 h-full"
                            >
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold tracking-tight">
                                            Профиль
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Управление настройками вашего
                                            профиля
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-8">
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            <div className="flex flex-col items-center space-y-4">
                                                <Avatar className="h-28 w-28">
                                                    <AvatarImage
                                                        src={user.avatar}
                                                        alt={user.name}
                                                    />
                                                    <AvatarFallback className="text-3xl">
                                                        {user.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="flex gap-2"
                                                    >
                                                        <Upload className="h-4 w-4" />
                                                        Загрузить
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="flex gap-2"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Удалить
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="space-y-4 flex-1">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">
                                                        Имя
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        defaultValue={user.name}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">
                                                        Email
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        defaultValue={
                                                            user.email
                                                        }
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="notifications"
                                className="mt-0 border-0"
                            >
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold tracking-tight">
                                            Уведомления
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Настройте способы получения
                                            уведомлений
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between pb-4 border-b">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4" />
                                                    <Label>
                                                        Email-уведомления
                                                    </Label>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Получать уведомления на
                                                    почту
                                                </p>
                                            </div>
                                            <Switch
                                                checked={notifications}
                                                onCheckedChange={
                                                    setNotifications
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pb-4 border-b">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center gap-2">
                                                    <Smartphone className="h-4 w-4" />
                                                    <Label>
                                                        Push-уведомления
                                                    </Label>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Получать уведомления в
                                                    браузере
                                                </p>
                                            </div>
                                            <Switch
                                                checked={notifications}
                                                onCheckedChange={
                                                    setNotifications
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="appearance"
                                className="mt-0 border-0"
                            >
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold tracking-tight">
                                            Внешний вид
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Настройте внешний вид приложения
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between pb-4 border-b">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center gap-2">
                                                    {darkMode ? (
                                                        <Moon className="h-4 w-4" />
                                                    ) : (
                                                        <Sun className="h-4 w-4" />
                                                    )}
                                                    <Label>Темная тема</Label>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Переключить тему оформления
                                                </p>
                                            </div>
                                            <Switch
                                                checked={darkMode}
                                                onCheckedChange={setDarkMode}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4" />
                                                <Label htmlFor="language">
                                                    Язык интерфейса
                                                </Label>
                                            </div>
                                            <select
                                                id="language"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                value={language}
                                                onChange={(e) =>
                                                    setLanguage(e.target.value)
                                                }
                                            >
                                                <option value="ru">
                                                    Русский
                                                </option>
                                                <option value="en">
                                                    English
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="security"
                                className="mt-0 border-0"
                            >
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold tracking-tight">
                                            Безопасность
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Настройте параметры безопасности
                                            вашего аккаунта
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                        >
                                            Изменить пароль
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                        >
                                            Двухфакторная аутентификация
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                        >
                                            История входов
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="privacy"
                                className="mt-0 border-0"
                            >
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold tracking-tight">
                                            Приватность
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Управление настройками приватности
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between pb-4 border-b">
                                            <div className="space-y-0.5">
                                                <Label>Публичный профиль</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Разрешить другим
                                                    пользователям видеть ваш
                                                    профиль
                                                </p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between pb-4 border-b">
                                            <div className="space-y-0.5">
                                                <Label>Показывать статус</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Показывать ваш онлайн статус
                                                </p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
