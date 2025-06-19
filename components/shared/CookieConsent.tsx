"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Cookie, Shield, Settings } from "lucide-react";

type CookieType = "necessary" | "analytics" | "marketing";

interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
}

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    const handleAccept = () => {
        setIsVisible(false);
        localStorage.setItem("cookieConsent", "accepted");
        localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
        // Включение аналитики на основе предпочтений
        if (preferences.analytics) {
            // TODO: Включить Google Analytics
        }
    };

    const handleDecline = () => {
        setIsVisible(false);
        localStorage.setItem("cookieConsent", "declined");
        localStorage.setItem(
            "cookiePreferences",
            JSON.stringify({
                necessary: true,
                analytics: false,
                marketing: false,
            })
        );
    };

    const togglePreference = (type: CookieType) => {
        setPreferences((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        const savedPreferences = localStorage.getItem("cookiePreferences");

        if (savedPreferences) {
            setPreferences(JSON.parse(savedPreferences));
        }

        if (consent === "accepted" || consent === "declined") {
            setIsVisible(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 z-50 border border-gray-200 dark:border-gray-700 animate-fade-in">
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <Cookie className="w-5 h-5 text-[--purple]" />
                        <h3 className="text-lg font-semibold">
                            Настройки Cookie
                        </h3>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {!showSettings ? (
                    <>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            <p>
                                Мы используем файлы Cookie для улучшения работы
                                сайта, анализа трафика и персонализации
                                контента. Вы можете настроить свои предпочтения.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <button
                                onClick={handleDecline}
                                className="w-full sm:w-1/2 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                Отклонить
                            </button>
                            <button
                                onClick={handleAccept}
                                className="w-full sm:w-1/2 px-4 py-2.5 text-sm font-medium bg-[--purple] text-white rounded-lg hover:opacity-90 transition-all hover:scale-[1.02]"
                            >
                                Принять все
                            </button>
                        </div>
                        <button
                            onClick={() => setShowSettings(true)}
                            className="text-sm text-[--purple] hover:underline flex items-center gap-1"
                        >
                            <Settings className="w-4 h-4" />
                            Настроить предпочтения
                        </button>
                    </>
                ) : (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-[--purple]" />
                                    <span className="text-sm font-medium">
                                        Необходимые
                                    </span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={preferences.necessary}
                                        disabled
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[--purple]"></div>
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Эти файлы cookie необходимы для работы сайта
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Cookie className="w-4 h-4 text-[--purple]" />
                                    <span className="text-sm font-medium">
                                        Аналитика
                                    </span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={preferences.analytics}
                                        onChange={() =>
                                            togglePreference("analytics")
                                        }
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[--purple]"></div>
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Помогают нам анализировать использование сайта
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Cookie className="w-4 h-4 text-[--purple]" />
                                    <span className="text-sm font-medium">
                                        Маркетинг
                                    </span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={preferences.marketing}
                                        onChange={() =>
                                            togglePreference("marketing")
                                        }
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[--purple]"></div>
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Используются для персонализации рекламы
                            </p>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                Назад
                            </button>
                            <button
                                onClick={handleAccept}
                                className="flex-1 px-4 py-2 text-sm font-medium bg-[--purple] text-white rounded-lg hover:opacity-90 transition-all hover:scale-[1.02]"
                            >
                                Сохранить настройки
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
