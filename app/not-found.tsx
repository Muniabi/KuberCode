"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-black to-blue-950 dark:from-black dark:via-purple-950 dark:to-blue-950">
            <div className="flex flex-col md:flex-row w-full h-full max-w-none rounded-none shadow-none border-none overflow-hidden">
                {/* Левая часть: минимализм, тёмный блок, 404 на фоне */}
                <div className="relative flex flex-col justify-center items-start md:w-1/2 w-full h-full p-10 bg-black/80">
                    {/* 404 как фон */}
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[180px] sm:text-[260px] font-extrabold text-white/10 select-none pointer-events-none leading-none pl-2">
                        404
                    </span>
                    <div className="relative z-10 flex flex-col justify-between h-full w-full">
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-8 leading-tight">
                                СТРАНИЦА
                                <br />
                                НЕ НАЙДЕНА
                            </h2>
                            <p className="text-stone-300 mb-6 max-w-md text-xl">
                                Пока вы тут, у нас проблема,
                                <br />
                                но мы скоро это починим!
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 transition-colors duration-200 mt-2"
                            >
                                Окэй, на главную
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Правая часть: картинка с размытым фоном и мягкими краями */}
                <div className="relative flex items-center justify-center bg-neutral-900 md:w-1/2 w-full h-full p-0 overflow-hidden">
                    {/* Размытый фон из той же картинки */}
                    <img
                        src="/404.webp"
                        alt="404 blurred background"
                        className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-60 select-none pointer-events-none"
                        aria-hidden="true"
                    />
                    {/* Основная картинка с мягкими краями */}
                    <img
                        src="/404.webp"
                        alt="404 cat hoodie"
                        className="relative z-10 max-h-[95vh] max-w-[95%] object-contain mx-auto"
                        style={{
                            maskImage:
                                "radial-gradient(circle at center, white 70%, transparent 100%)",
                            WebkitMaskImage:
                                "radial-gradient(circle at center, white 70%, transparent 100%)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
