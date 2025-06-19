"use client";

import { useState, useRef, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
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
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import useAuthStore from "@/store/useAuthStore";

// Компонент формы смены пароля
const ChangePasswordForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Здесь будет логика смены пароля
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        toast.success("Пароль успешно изменен");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="current-password">Текущий пароль</Label>
                <Input type="password" id="current-password" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="new-password">Новый пароль</Label>
                <Input type="password" id="new-password" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                <Input type="password" id="confirm-password" required />
            </div>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Сохранение..." : "Сменить пароль"}
            </Button>
        </form>
    );
};

// Компонент формы смены email
const ChangeEmailForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Здесь будет логика смены email
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        toast.success("Email успешно изменен");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="new-email">Новый email</Label>
                <Input type="email" id="new-email" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Подтвердите пароль</Label>
                <Input type="password" id="password" required />
            </div>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Сохранение..." : "Сменить email"}
            </Button>
        </form>
    );
};

export function SettingsDialog({
    user,
}: {
    user: {
        id: string;
        name: string;
        email: string;
        avatar: string;
    };
}) {
    const { updateEmail, updatePassword } = useAuthStore();

    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState("ru");
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [name, setName] = useState(user?.name || "");
    const [hasChanges, setHasChanges] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const menuItems = [
        { id: "profile", label: "Профиль", icon: User },
        { id: "notifications", label: "Уведомления", icon: Bell },
        { id: "appearance", label: "Внешний вид", icon: Palette },
        { id: "security", label: "Безопасность", icon: Shield },
        { id: "privacy", label: "Приватность", icon: Key },
    ];

    // Функция для проверки изменений
    const checkChanges = () => {
        const changes =
            name !== user?.name ||
            notifications !== true ||
            language !== "ru" ||
            previewImage !== null;
        setHasChanges(changes);
    };

    // Отслеживаем изменения
    useEffect(() => {
        checkChanges();
    }, [name, notifications, language, previewImage]);

    const handleSave = async () => {
        toast.success("Изменения успешно сохранены");
        setHasChanges(false);
    };

    // Обработчики изменений для каждого раздела
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleNotificationsChange = (checked: boolean) => {
        setNotifications(checked);
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Файл слишком большой. Максимальный размер: 5MB");
                return;
            }

            if (!file.type.startsWith("image/")) {
                toast.error("Пожалуйста, загрузите изображение");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
                // Сохраняем в localStorage
                if (user?.id) {
                    localStorage.setItem(
                        `avatar-${user.id}`,
                        reader.result as string
                    );
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemovePhoto = async () => {
        setPreviewImage(null);
        if (user?.id) {
            localStorage.removeItem(`avatar-${user.id}`);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleEmailChange = async (newEmail: string, password: string) => {
        try {
            await updateEmail(newEmail, password);
            setShowEmailForm(false);
        } catch (error) {
            console.error("Error updating email:", error);
        }
    };

    const handlePasswordChange = async (
        currentPassword: string,
        newPassword: string
    ) => {
        try {
            await updatePassword(currentPassword, newPassword);
            setShowPasswordForm(false);
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full justify-start"
                >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Настройки</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-[90vw] h-[85vh] p-0">
                <DialogHeader className="sr-only">
                    <DialogTitle>Настройки профиля</DialogTitle>
                    <DialogDescription>
                        Управление настройками вашего профиля, уведомлениями и
                        внешним видом приложения
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="profile" className="flex h-full">
                    <TabsList className="hidden sm:flex h-full w-[240px] flex-col border-r bg-muted/40 p-2 space-y-1">
                        <div className="flex items-center gap-2 p-4 border-b">
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src={previewImage || user.avatar}
                                    alt={user.name}
                                />
                                <AvatarFallback className="bg-primary/10">
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
                        {menuItems.map((item) => (
                            <TabsTrigger
                                key={item.id}
                                value={item.id}
                                className="justify-start w-full gap-2 px-3 py-2 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="flex-1 overflow-y-auto">
                        <div className="h-full px-6 py-6">
                            <TabsContent
                                value="profile"
                                className="mt-0 border-0"
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
                                                        src={
                                                            previewImage ||
                                                            user.avatar
                                                        }
                                                        alt={user.name}
                                                    />
                                                    <AvatarFallback className="bg-primary/10 text-3xl">
                                                        {user.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                />
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="flex gap-2"
                                                        onClick={
                                                            handleUploadClick
                                                        }
                                                    >
                                                        <Upload className="h-4 w-4" />
                                                        Загрузить
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="flex gap-2"
                                                        onClick={
                                                            handleRemovePhoto
                                                        }
                                                        disabled={
                                                            !previewImage &&
                                                            !user.avatar
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Удалить
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="space-y-4 flex-1">
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name">
                                                            Имя
                                                        </Label>
                                                        <Input
                                                            id="name"
                                                            value={name}
                                                            onChange={
                                                                handleNameChange
                                                            }
                                                            className="bg-background"
                                                        />
                                                    </div>
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
                                        <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
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
                                                    handleNotificationsChange
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
                                        <div className="space-y-2 p-4 rounded-lg border bg-card">
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
                                                onChange={handleLanguageChange}
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
                        </div>
                    </div>
                </Tabs>
                {hasChanges && (
                    <div className="flex justify-end p-4 border-t bg-muted/40">
                        <Button
                            onClick={handleSave}
                            className="bg-primary hover:bg-primary/90"
                        >
                            Сохранить изменения
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
