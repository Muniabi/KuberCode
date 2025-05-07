"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-950 via-black to-blue-950 dark:from-black dark:via-purple-950 dark:to-blue-950">
            {/* Фоновые градиентные круги */}
            <div className="pointer-events-none absolute -top-32 -left-32 w-[400px] h-[400px] bg-gradient-to-br from-purple-600/40 to-blue-600/40 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-500/40 to-cyan-500/40 rounded-full blur-2xl" />

            {/* Центральный блок */}
            <div className="relative z-10 flex flex-col items-center justify-center p-8 rounded-3xl shadow-2xl bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-white/10 dark:border-white/10 max-w-lg w-full mx-4">
                {/* Крупная 404 с градиентом */}
                <div className="mb-2">
                    <span className="text-[90px] sm:text-[120px] font-extrabold select-none text-transparent bg-clip-text bg-gradient-to-br from-[#A559DD] via-blue-400 to-[#591F9C] drop-shadow-lg">
                        404
                    </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-[#A559DD] dark:text-[#A559DD] text-center">
                    Страница потерялась в облаках куберов…
                </h2>
                <p className="text-stone-700 dark:text-stone-300 mb-8 text-center max-w-xs mx-auto">
                    Такой страницы не существует или она отправилась в
                    путешествие по цифровому пространству. Но вы всегда можете
                    вернуться домой!
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-[#A559DD] to-[#591F9C] rounded-xl shadow-lg hover:opacity-90 transition-opacity duration-200"
                >
                    Вернуться на главную
                </Link>
                {/* Декоративный кубик */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#A559DD] to-[#591F9C] rounded-lg shadow-xl border-2 border-white/40 dark:border-white/10" />
                </div>
            </div>
        </div>
    );
}
