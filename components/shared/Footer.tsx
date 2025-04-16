"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="mb-6 text-2xl font-bold">
                            <span className="text-[--purple]  mr-1">
                                Kuber Code
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            Образовательная онлайн-платформа для изучения
                            IT-профессий. Более 5000 курсов от ведущих экспертов
                            индустрии.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href={"#"}
                                className="text-gray-500 dark:text-gray-400 dark:hover:text-white transition duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6c0-1.1.9-2 2-2h2V0h-3.1C12.2 0 9 2.3 9 6v2z"></path>
                                </svg>
                            </Link>
                            <Link
                                href={"#"}
                                className="text-gray-500 dark:text-gray-400 dark:hover:text-white transition duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.004 10.004 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482A13.96 13.96 0 011.64 3.161a4.822 4.822 0 00-.666 2.474c0 1.71.87 3.213 2.188 4.096a4.925 4.925 0 01-2.228-.616v.061a4.94 4.94 0 003.95 4.829 4.995 4.995 0 01-2.224.084 4.936 4.936 0 004.6 3.42 9.881 9.881 0 01-6.115 2.108c-.398 0-.791-.023-1.177-.069a13.95 13.95 0 007.548 2.209c9.054 0 14-7.497 14-13.986 0-.21-.005-.423-.014-.632A10.016 10.016 0 0024 4.59l-.046-.021z"></path>
                                </svg>
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-500 dark:text-gray-400 dark:hover:text-white transition duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4 dark:text-white">
                            Обучение
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/courses"
                                    className="text-gray-600 dark:text-gray-300 hover:text-kuber-purple transition duration-300"
                                >
                                    Все курсы
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/webinars"
                                    className="text-gray-600 dark:text-gray-300 hover:text-kuber-purple transition duration-300"
                                >
                                    Вебинары
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-gray-600 dark:text-gray-300 hover:text-kuber-purple transition duration-300"
                                >
                                    Блог
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/forum"
                                    className="text-gray-600 dark:text-gray-300 hover:text-kuber-purple transition duration-300"
                                >
                                    Форум
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4 dark:text-white">
                            Информация
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-600 dark:text-gray-300 hover:text-kuber-purple transition duration-300"
                                >
                                    О компании
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="text-gray-600 dark:text-gray-300 hover:text-kuber-purple transition duration-300"
                                >
                                    Карьера
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="text-gray-600 dark:text-gray-300 hover:text-kuber-purple transition duration-300"
                                >
                                    Частые вопросы
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contacts"
                                    className="text-gray-600 dark:text-gray-300 hover:text-kuber-purple transition duration-300"
                                >
                                    Контакты
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4 dark:text-white">
                            Контакты
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-kuber-purple mr-2 mt-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="text-gray-600 dark:text-gray-300 hover:text-kuber-purple transition duration-300">
                                    г. Москва, ул. Пушкина, д. 10
                                </span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-kuber-purple mr-2 mt-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <span className="text-gray-600 dark:text-gray-300 hover:text-kuber-purple transition duration-300">
                                    info@kubercode.ru
                                </span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-kuber-purple mr-2 mt-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <span className="text-gray-600 dark:text-gray-300 hover:text-kuber-purple transition duration-300">
                                    +7 (495) 123-45-67
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div className="mb-4 md:mb-0">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                &copy; {new Date().getFullYear()} KuberCode. Все
                                права защищены.
                            </p>
                        </div>
                        <div className="flex space-x-6">
                            <Link
                                href="/faq"
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-kuber-purple transition duration-300"
                            >
                                FAQ
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-kuber-purple transition duration-300"
                            >
                                Условия использования
                            </Link>
                            <Link
                                href="/privacy"
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-kuber-purple transition duration-300"
                            >
                                Политика конфиденциальности
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
