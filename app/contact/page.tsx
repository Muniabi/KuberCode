import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/shared/contact-form";

export default function ContactPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold text-center mb-6">
                Свяжитесь с нами
            </h1>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Если у вас есть вопросы, предложения или вам нужна помощь,
                воспользуйтесь формой обратной связи или другими способами связи
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                <div>
                    <Card className="h-full">
                        <CardHeader className="bg-violet-50">
                            <CardTitle className="text-2xl">
                                Форма обратной связи
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <ContactForm />
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="h-full">
                        <CardHeader className="bg-violet-50">
                            <CardTitle className="text-2xl">
                                Контактная информация
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-violet-800">
                                    Техническая поддержка
                                </h3>
                                <div className="flex items-start space-x-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-violet-600 mt-1"
                                    >
                                        <rect
                                            width="20"
                                            height="16"
                                            x="2"
                                            y="4"
                                            rx="2"
                                        />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                    <div>
                                        <p className="font-medium">Email:</p>
                                        <p className="text-gray-700">
                                            support@kubercode.ru
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-violet-600 mt-1"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <div>
                                        <p className="font-medium">Телефон:</p>
                                        <p className="text-gray-700">
                                            +7 (999) 123-45-67
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            ПН-ПТ, 10:00-19:00 МСК
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-violet-800">
                                    Отдел продаж
                                </h3>
                                <div className="flex items-start space-x-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-violet-600 mt-1"
                                    >
                                        <rect
                                            width="20"
                                            height="16"
                                            x="2"
                                            y="4"
                                            rx="2"
                                        />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                    <div>
                                        <p className="font-medium">Email:</p>
                                        <p className="text-gray-700">
                                            sales@kubercode.ru
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-violet-600 mt-1"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <div>
                                        <p className="font-medium">Телефон:</p>
                                        <p className="text-gray-700">
                                            +7 (999) 765-43-21
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            ПН-ПТ, 10:00-19:00 МСК
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-violet-800">
                                    Юридический адрес
                                </h3>
                                <div className="flex items-start space-x-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-violet-600 mt-1"
                                    >
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <div>
                                        <p className="font-medium">Адрес:</p>
                                        <p className="text-gray-700">
                                            123456, г. Москва, ул. Примерная, д.
                                            123, офис 456
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-violet-800">
                                    Социальные сети
                                </h3>
                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className="bg-violet-100 hover:bg-violet-200 transition-colors p-2 rounded-full"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-violet-600"
                                        >
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="bg-violet-100 hover:bg-violet-200 transition-colors p-2 rounded-full"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-violet-600"
                                        >
                                            <rect
                                                width="20"
                                                height="20"
                                                x="2"
                                                y="2"
                                                rx="5"
                                                ry="5"
                                            />
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                            <line
                                                x1="17.5"
                                                x2="17.51"
                                                y1="6.5"
                                                y2="6.5"
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="bg-violet-100 hover:bg-violet-200 transition-colors p-2 rounded-full"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-violet-600"
                                        >
                                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="bg-violet-100 hover:bg-violet-200 transition-colors p-2 rounded-full"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-violet-600"
                                        >
                                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                            <rect
                                                width="4"
                                                height="12"
                                                x="2"
                                                y="9"
                                            />
                                            <circle cx="4" cy="4" r="2" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="bg-violet-100 hover:bg-violet-200 transition-colors p-2 rounded-full"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-violet-600"
                                        >
                                            <path d="M19.5 3h-15A2.5 2.5 0 0 0 2 5.5v13A2.5 2.5 0 0 0 4.5 21h15a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 19.5 3Z" />
                                            <path d="m10 9 5 3-5 3V9Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mb-12">
                <Card>
                    <CardHeader className="bg-violet-50">
                        <CardTitle className="text-2xl">
                            Часто задаваемые вопросы о поддержке
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Какое среднее время ответа службы поддержки?
                            </h3>
                            <p>
                                Мы стремимся отвечать на все запросы в течение
                                24 часов в рабочие дни. Для пользователей с
                                Премиум-подпиской предусмотрена приоритетная
                                поддержка с ответом в течение 4 часов.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Какие вопросы решает техническая поддержка?
                            </h3>
                            <p>Наша служба поддержки может помочь вам с:</p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Проблемами доступа к аккаунту</li>
                                <li>
                                    Техническими сложностями при работе с
                                    платформой
                                </li>
                                <li>Вопросами оплаты и подписки</li>
                                <li>Запросами на восстановление данных</li>
                                <li>Помощью в навигации по платформе</li>
                            </ul>
                            <p>
                                Однако, обратите внимание, что наша поддержка не
                                предоставляет прямую помощь в решении
                                образовательных задач - для этого существуют
                                форумы и сообщество.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Как подготовить информацию для обращения?
                            </h3>
                            <p>
                                Чтобы мы могли быстрее помочь вам, подготовьте:
                            </p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Детальное описание проблемы</li>
                                <li>Скриншоты ошибок (если применимо)</li>
                                <li>URL страницы, где возникла проблема</li>
                                <li>
                                    Информацию о вашем браузере и операционной
                                    системе
                                </li>
                                <li>Шаги, которые привели к проблеме</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="max-w-6xl mx-auto">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.3346827582477!2d37.618174098949384!3d55.75696447258026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0JrRgNC10LzQu9GM!5e0!3m2!1sru!2sru!4v1650536096339!5m2!1sru!2sru"
                    className="w-full h-96 rounded-lg border-2 border-violet-100"
                    loading="lazy"
                    title="Карта расположения офиса"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
