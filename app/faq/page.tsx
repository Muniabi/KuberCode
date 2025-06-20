import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function FAQPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold text-center mb-6">
                Часто задаваемые вопросы
            </h1>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Ответы на самые популярные вопросы о платформе Kuber Code
            </p>

            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                {/* О платформе */}
                <Card className="mb-6">
                    <CardHeader className="bg-violet-50 dark:bg-violet-900">
                        <CardTitle className="text-2xl">
                            О платформе Kuber Code
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Что такое Kuber Code?
                            </h3>
                            <p>
                                Kuber Code — это онлайн-платформа для обучения
                                программированию, предназначенная как для
                                начинающих, так и для опытных разработчиков.
                                Платформа предлагает интерактивные задачи, курсы
                                и сообщество для изучения программирования на
                                различных языках.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Чем Kuber Code отличается от других платформ?
                            </h3>
                            <p>
                                Kuber Code создана с акцентом на практическое
                                обучение через решение реальных задач. Наши
                                особенности:
                            </p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>
                                    Система автоматической проверки кода с
                                    детальным анализом
                                </li>
                                <li>Наставничество от опытных разработчиков</li>
                                <li>
                                    Структурированный путь обучения,
                                    адаптированный под уровень пользователя
                                </li>
                                <li>
                                    Активное сообщество разработчиков для обмена
                                    опытом
                                </li>
                                <li>
                                    Современные и актуальные учебные материалы
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Какие языки программирования поддерживает
                                платформа?
                            </h3>
                            <p>
                                На платформе доступны курсы и задачи по
                                следующим языкам и технологиям:
                            </p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>JavaScript и TypeScript</li>
                                <li>Python</li>
                                <li>Java</li>
                                <li>C# и .NET</li>
                                <li>Go</li>
                                <li>Rust</li>
                                <li>Swift</li>
                                <li>React, Angular, Vue.js</li>
                                <li>Node.js</li>
                                <li>SQL и базы данных</li>
                                <li>И другие технологии</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Учебный процесс */}
                <Card className="mb-6">
                    <CardHeader className="bg-violet-50 dark:bg-violet-900">
                        <CardTitle className="text-2xl">
                            Учебный процесс
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Как устроен учебный процесс?
                            </h3>
                            <p>
                                Обучение на платформе проходит через
                                структурированные курсы и индивидуальные задачи:
                            </p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Изучение теоретического материала</li>
                                <li>Выполнение практических заданий</li>
                                <li>Решение алгоритмических задач</li>
                                <li>Работа над проектами</li>
                                <li>Получение обратной связи от наставников</li>
                                <li>Взаимодействие с сообществом</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Сколько времени занимает обучение?
                            </h3>
                            <p>
                                Время обучения зависит от выбранной программы,
                                вашего уровня и количества времени, которое вы
                                готовы уделять:
                            </p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Короткие курсы — от 2 до 4 недель</li>
                                <li>
                                    Полные курсы по языку программирования — от
                                    2 до 6 месяцев
                                </li>
                                <li>
                                    Профессиональные треки — от 6 до 12 месяцев
                                </li>
                            </ul>
                            <p>
                                Вы можете заниматься в своем темпе, без жестких
                                временных ограничений.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Как проверяются мои решения?
                            </h3>
                            <p>
                                Все решения проверяются автоматически с помощью
                                тестов. Система проверяет:
                            </p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Корректность работы кода</li>
                                <li>Соответствие требованиям задачи</li>
                                <li>Эффективность решения</li>
                                <li>Качество и стиль кода</li>
                            </ul>
                            <p>
                                Для некоторых заданий доступна также проверка
                                наставниками, которые могут предоставить более
                                детальный анализ и рекомендации по улучшению
                                решения.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Регистрация и аккаунт */}
                <Card className="mb-6">
                    <CardHeader className="bg-violet-50 dark:bg-violet-900">
                        <CardTitle className="text-2xl">
                            Регистрация и аккаунт
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Как зарегистрироваться на платформе?
                            </h3>
                            <p>Для регистрации:</p>
                            <ol className="list-decimal pl-8 space-y-2">
                                <li>
                                    Нажмите кнопку "Регистрация" на главной
                                    странице
                                </li>
                                <li>Укажите свой email и придумайте пароль</li>
                                <li>
                                    Подтвердите email, перейдя по ссылке в
                                    письме
                                </li>
                                <li>Заполните информацию профиля</li>
                            </ol>
                            <p>
                                Также доступна быстрая регистрация через GitHub,
                                Google или Facebook.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Могу ли я сменить имя пользователя или email?
                            </h3>
                            <p>
                                Вы можете изменить имя пользователя в настройках
                                профиля в любое время. Для смены email адреса
                                необходимо отправить запрос в службу поддержки с
                                указанием нового адреса и причины смены.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Как удалить свой аккаунт?
                            </h3>
                            <p>Для удаления аккаунта:</p>
                            <ol className="list-decimal pl-8 space-y-2">
                                <li>Перейдите в "Настройки аккаунта"</li>
                                <li>
                                    Прокрутите вниз до раздела "Удаление
                                    аккаунта"
                                </li>
                                <li>
                                    Нажмите "Удалить аккаунт" и подтвердите
                                    действие
                                </li>
                            </ol>
                            <p>
                                Обратите внимание, что все ваши данные, включая
                                прогресс обучения и решения задач, будут
                                безвозвратно удалены.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Подписки и оплата */}
                <Card className="mb-6">
                    <CardHeader className="bg-violet-50 dark:bg-violet-900">
                        <CardTitle className="text-2xl">
                            Подписки и оплата
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Какие типы подписок доступны?
                            </h3>
                            <p>На платформе доступны следующие планы:</p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>
                                    <strong>Бесплатный план</strong> — доступ к
                                    ограниченному набору задач и курсов
                                </li>
                                <li>
                                    <strong>Базовая подписка</strong> — полный
                                    доступ к задачам и курсам
                                </li>
                                <li>
                                    <strong>Премиум подписка</strong> — включает
                                    наставничество и персональные рекомендации
                                </li>
                                <li>
                                    <strong>Корпоративный план</strong> — для
                                    команд и компаний
                                </li>
                            </ul>
                            <p>
                                Детальное сравнение планов доступно на странице
                                подписок.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Какие способы оплаты принимаются?
                            </h3>
                            <p>Платформа принимает следующие способы оплаты:</p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>
                                    Банковские карты (Visa, MasterCard, МИР)
                                </li>
                                <li>PayPal</li>
                                <li>Электронные кошельки (Юmoney, QIWI)</li>
                                <li>
                                    Банковский перевод (для корпоративных
                                    клиентов)
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Можно ли отменить подписку?
                            </h3>
                            <p>
                                Да, вы можете отменить подписку в любое время
                                через настройки аккаунта. После отмены подписка
                                будет активна до конца оплаченного периода,
                                после чего автоматически не продлится.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Предоставляете ли вы возврат средств?
                            </h3>
                            <p>
                                Мы предоставляем полный возврат средств в
                                течение 14 дней после оплаты, если вы не
                                удовлетворены сервисом. Для оформления возврата
                                обратитесь в службу поддержки.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Технические вопросы */}
                <Card className="mb-6">
                    <CardHeader className="bg-violet-50 dark:bg-violet-900">
                        <CardTitle className="text-2xl">
                            Технические вопросы
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Какие браузеры поддерживаются?
                            </h3>
                            <p>
                                Платформа оптимизирована для работы со
                                следующими браузерами:
                            </p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Google Chrome (последние 2 версии)</li>
                                <li>Mozilla Firefox (последние 2 версии)</li>
                                <li>Safari (последние 2 версии)</li>
                                <li>Microsoft Edge (последние 2 версии)</li>
                            </ul>
                            <p>
                                Для наилучшего опыта рекомендуем использовать
                                последнюю версию Google Chrome.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Нужно ли устанавливать дополнительное ПО?
                            </h3>
                            <p>
                                Нет, для основной работы с платформой не
                                требуется устанавливать дополнительное ПО. Все
                                задачи можно решать в онлайн-редакторе кода.
                            </p>
                            <p>
                                Однако, для более продвинутых проектов вы можете
                                использовать локальную среду разработки, а затем
                                загружать решения на платформу.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Как работает онлайн-редактор кода?
                            </h3>
                            <p>Наш онлайн-редактор кода предлагает:</p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>
                                    Подсветку синтаксиса для всех поддерживаемых
                                    языков
                                </li>
                                <li>Автодополнение кода</li>
                                <li>Встроенный отладчик</li>
                                <li>Возможность запуска и тестирования кода</li>
                                <li>Сохранение истории изменений</li>
                                <li>
                                    Интеграцию с Git (для продвинутых
                                    пользователей)
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Что делать, если я столкнулся с техническими
                                проблемами?
                            </h3>
                            <p>
                                Если вы столкнулись с техническими проблемами:
                            </p>
                            <ol className="list-decimal pl-8 space-y-2">
                                <li>
                                    Проверьте наш раздел "Известные проблемы" в
                                    Центре поддержки
                                </li>
                                <li>
                                    Очистите кэш браузера и попробуйте снова
                                </li>
                                <li>
                                    Используйте форму обратной связи, указав
                                    детали проблемы
                                </li>
                                <li>
                                    Напишите на support@kubercode.ru, приложив
                                    скриншоты и описание ошибки
                                </li>
                            </ol>
                            <p>
                                Наша техническая поддержка обычно отвечает в
                                течение 24 часов.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Сертификация */}
                <Card className="mb-6">
                    <CardHeader className="bg-violet-50 dark:bg-violet-900 ">
                        <CardTitle className="text-2xl">
                            Сертификация и достижения
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Какие сертификаты я могу получить?
                            </h3>
                            <p>
                                По завершении курсов вы можете получить
                                следующие сертификаты:
                            </p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>
                                    Сертификат о прохождении отдельного курса
                                </li>
                                <li>
                                    Сертификат об освоении языка
                                    программирования
                                </li>
                                <li>
                                    Сертификат о завершении профессионального
                                    трека
                                </li>
                                <li>
                                    Сертификат об участии в хакатоне или
                                    соревновании
                                </li>
                            </ul>
                            <p>
                                Все сертификаты имеют уникальный код
                                верификации, который можно проверить на нашем
                                сайте.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Имеют ли сертификаты ценность для работодателей?
                            </h3>
                            <p>
                                Да, наши сертификаты признаются многими
                                работодателями как подтверждение практических
                                навыков. Они особенно ценны в сочетании с
                                портфолио проектов, которые вы создадите во
                                время обучения.
                            </p>
                            <p>
                                Мы также сотрудничаем с компаниями-партнерами,
                                которые рассматривают выпускников наших программ
                                в приоритетном порядке.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Как отслеживать свой прогресс?
                            </h3>
                            <p>
                                Ваш прогресс отображается в личном кабинете, где
                                вы можете видеть:
                            </p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Процент завершения курсов</li>
                                <li>Количество решенных задач</li>
                                <li>Полученные достижения и значки</li>
                                <li>Статистику активности</li>
                                <li>Рейтинг среди других учащихся</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Контакты */}
                <Card className="mb-6">
                    <CardHeader className="bg-violet-50 dark:bg-violet-900">
                        <CardTitle className="text-2xl">
                            Контакты и поддержка
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Как связаться с поддержкой?
                            </h3>
                            <p>
                                Вы можете связаться с нами следующими способами:
                            </p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Email: support@kubercode.ru</li>
                                <li>
                                    Чат поддержки на сайте (доступен в рабочие
                                    дни с 9:00 до 21:00 МСК)
                                </li>
                                <li>Форма обратной связи в личном кабинете</li>
                                <li>
                                    Телефон: +7 (999) 123-45-67 (ПН-ПТ,
                                    10:00-19:00 МСК)
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Каково среднее время ответа поддержки?
                            </h3>
                            <p>
                                Мы стремимся отвечать на все запросы в течение
                                24 часов. Для пользователей Премиум-подписки
                                предусмотрена приоритетная поддержка с ответом в
                                течение 4 часов в рабочее время.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-violet-800">
                                Есть ли у вас сообщество для общения?
                            </h3>
                            <p>
                                Да, мы поддерживаем активное сообщество для
                                общения студентов и преподавателей:
                            </p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Форум на сайте платформы</li>
                                <li>Discord-сервер для живого общения</li>
                                <li>Telegram-канал с новостями и анонсами</li>
                                <li>Ежемесячные онлайн-встречи сообщества</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Дополнительные вопросы */}
                <Card className="mb-10">
                    <CardHeader className="bg-violet-50 dark:bg-violet-900">
                        <CardTitle className="text-2xl">
                            Вы не нашли ответ на свой вопрос?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <p className="mb-4">
                            Если вы не нашли ответ на свой вопрос, пожалуйста,
                            свяжитесь с нами через форму обратной связи или
                            напишите нам на email support@kubercode.ru.
                        </p>
                        <p>
                            Мы постоянно обновляем этот раздел, добавляя ответы
                            на часто задаваемые вопросы.
                        </p>
                        <div className="mt-6 text-center">
                            <Link
                                href="/contact"
                                className="inline-block px-8 py-3 bg-violet-700 text-white rounded-lg font-medium hover:bg-violet-800 transition-colors"
                            >
                                Задать вопрос
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
