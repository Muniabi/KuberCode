"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [formStatus, setFormStatus] = useState<{
        submitted: boolean;
        success?: boolean;
        message?: string;
    }>({
        submitted: false,
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate form submission
        setFormStatus({
            submitted: true,
            success: undefined,
            message: "Отправка сообщения...",
        });

        // Simulate API call
        setTimeout(() => {
            setFormStatus({
                submitted: true,
                success: true,
                message:
                    "Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.",
            });

            // Reset form
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        }, 1500);
    };

    return (
        <div>
            {formStatus.submitted && formStatus.success ? (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
                    <p className="text-green-700">{formStatus.message}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 font-medium"
                        >
                            Ваше имя<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                            placeholder="Иванов Иван"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 font-medium"
                        >
                            Email<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                            placeholder="example@email.ru"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="subject"
                            className="block mb-2 font-medium"
                        >
                            Тема<span className="text-red-500">*</span>
                        </label>
                        <select
                            id="subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                        >
                            <option value="" disabled>
                                Выберите тему
                            </option>
                            <option value="technical">
                                Техническая поддержка
                            </option>
                            <option value="billing">Вопросы оплаты</option>
                            <option value="account">Аккаунт и доступ</option>
                            <option value="content">Содержание курсов</option>
                            <option value="bug">Сообщить об ошибке</option>
                            <option value="feature">
                                Предложить улучшение
                            </option>
                            <option value="other">Другое</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block mb-2 font-medium"
                        >
                            Сообщение<span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 transition resize-y"
                            placeholder="Опишите ваш вопрос или предложение..."
                        ></textarea>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="privacy"
                            required
                            className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="privacy"
                            className="text-sm text-gray-600"
                        >
                            Я согласен с{" "}
                            <a
                                href="/privacy"
                                className="text-violet-600 hover:underline"
                            >
                                политикой конфиденциальности
                            </a>{" "}
                            и обработкой моих персональных данных
                        </label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-violet-700 hover:bg-violet-800"
                        disabled={
                            formStatus.submitted &&
                            formStatus.success === undefined
                        }
                    >
                        {formStatus.submitted &&
                        formStatus.success === undefined ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Отправка...
                            </span>
                        ) : (
                            "Отправить сообщение"
                        )}
                    </Button>
                </form>
            )}
        </div>
    );
}
