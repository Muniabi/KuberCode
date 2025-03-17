"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleAccept = () => {
        setIsVisible(false);
        localStorage.setItem("cookieConsent", "accepted");
        // Включение аналитики и других трекеров
    };

    const handleDecline = () => {
        setIsVisible(false);
        // Здесь позже добавим логику для отказа
    };

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (consent === "accepted") {
            setIsVisible(false);
            return;
        }

        // Добавляем задержку 5 секунд перед показом
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 z-50 border border-gray-200 dark:border-gray-700 animate-fade-in">
            <div className="flex flex-col gap-6">
                <div className="w-full h-32 relative">
                    <Image
                        src="/cookie.avif"
                        alt="Cookie иллюстрация"
                        fill
                        className="object-cover rounded-md"
                    />
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p>
                        Мы используем файлы cookie для улучшения работы сайта,
                        анализа трафика и персонализации контента. Продолжая
                        использовать наш сайт, вы соглашаетесь на использование
                        cookies.
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
                        className="w-full sm:w-1/2 px-4 py-2.5 text-sm font-medium bg-[--lime] text-black dark:bg-[--purple] dark:text-white rounded-lg hover:opacity-90 transition-all hover:scale-[1.02]"
                    >
                        Принять все
                    </button>
                </div>
            </div>
        </div>
    );
};
