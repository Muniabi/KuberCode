import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const { email, code, isMentor } = await request.json();

        if (!code) {
            return NextResponse.json(
                { error: "Код подтверждения не предоставлен" },
                { status: 400 }
            );
        }

        // --- SMTP Яндекс.Почта ---
        // Для работы с Яндекс.Почтой используйте следующие настройки:
        // host: 'smtp.yandex.ru',
        // port: 465,
        // secure: true,
        // auth: {
        //     user: 'ВАШ_ЯНДЕКС_ЛОГИН', // например, example@yandex.ru
        //     pass: 'ВАШ_ПАРОЛЬ_ИЛИ_ПАРОЛЬ_ПРИЛОЖЕНИЯ'
        // }
        // ---

        // Пример для Ethereal (оставьте как есть для тестов, замените на Яндекс для продакшена):
        // const testAccount = await nodemailer.createTestAccount();

        // const transporter = nodemailer.createTransport({
        //     host: "smtp.ethereal.email",
        //     port: 587,
        //     secure: false,
        //     auth: {
        //         user: testAccount.user,
        //         pass: testAccount.pass,
        //     },
        // });

        // --- Яндекс.Почта ---
        const transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true,
            auth: {
                user: "infotkahn@yandex.ru",
                pass: "rpdsdtdsgoudoebq",
            },
        });

        const mailOptions = {
            from: '"Kuber Code" <infotkahn@yandex.ru>',
            to: email,
            subject: "Подтверждение регистрации",
            html: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
                            body {
                                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                background: #f5f5f5;
                                margin: 0;
                                padding: 0;
                            }
                            .bg-svg {
                                position: absolute;
                                top: 0; left: 0; right: 0; height: 220px;
                                width: 100%;
                                z-index: 0;
                                pointer-events: none;
                            }
                            .email-container {
                                max-width: 600px;
                                margin: 40px auto;
                                background: #fff;
                                border-radius: 20px;
                                box-shadow: 0 8px 32px rgba(89,31,156,0.10), 0 1.5px 8px rgba(165,89,221,0.08);
                                overflow: hidden;
                                position: relative;
                            }
                            .header {
                                background: linear-gradient(120deg, #A559DD 0%, #591F9C 100%);
                                padding: 48px 20px 32px 20px;
                                text-align: center;
                                position: relative;
                            }
                            .logo {
                                font-size: 36px;
                                font-weight: 700;
                                color: #fff;
                                letter-spacing: -1px;
                                margin-bottom: 8px;
                                z-index: 2;
                                position: relative;
                            }
                            .subtitle {
                                color: rgba(255,255,255,0.92);
                                font-size: 17px;
                                font-weight: 500;
                                z-index: 2;
                                position: relative;
                            }
                            .robot {
                                margin: 0 auto 0 auto;
                                display: block;
                                width: 64px;
                                height: 64px;
                                border-radius: 12px;
                                background: #fff;
                                box-shadow: 0 2px 8px rgba(165,89,221,0.08);
                            }
                            .content {
                                padding: 40px 32px 32px 32px;
                                background: transparent;
                                position: relative;
                                z-index: 2;
                            }
                            .title {
                                font-size: 26px;
                                font-weight: 700;
                                color: #1B0934;
                                margin-bottom: 24px;
                                text-align: center;
                                letter-spacing: -0.5px;
                            }
                            .message {
                                color: #4A5568;
                                font-size: 17px;
                                margin-bottom: 32px;
                                text-align: center;
                            }
                            .code-3d {
                                background: linear-gradient(120deg, #F7F9FC 0%, #E9E3F5 100%);
                                border-radius: 18px;
                                padding: 36px 0 28px 0;
                                margin: 32px 0 24px 0;
                                text-align: center;
                                box-shadow: 0 6px 24px rgba(89,31,156,0.10), 0 1.5px 8px rgba(165,89,221,0.08);
                                border: 1.5px solid #E2E8F0;
                                position: relative;
                                perspective: 400px;
                                transform: rotateX(4deg) scale(1.01);
                            }
                            .code {
                                font-size: 44px;
                                letter-spacing: 16px;
                                color: #591F9C;
                                font-weight: 700;
                                font-family: 'Inter', monospace;
                                text-shadow: 0 2px 8px rgba(165,89,221,0.08);
                                display: inline-block;
                                position: relative;
                            }
                            .warning {
                                color: #718096;
                                font-size: 15px;
                                text-align: center;
                                margin: 24px 0 0 0;
                                padding: 16px;
                                background-color: #F7FAFC;
                                border-radius: 10px;
                                border: 1px solid #E2E8F0;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 8px;
                            }
                            .footer {
                                text-align: center;
                                padding: 24px 32px;
                                background-color: #F7FAFC;
                                border-top: 1px solid #E2E8F0;
                                color: #718096;
                                font-size: 13px;
                            }
                            .social-links {
                                margin: 16px 0 8px 0;
                            }
                            .social-links a {
                                display: inline-block;
                                margin: 0 8px;
                                color: #591F9C;
                                text-decoration: none;
                                font-weight: 600;
                            }
                            @media (max-width: 480px) {
                                .email-container { margin: 0; border-radius: 0; }
                                .content { padding: 24px 8px; }
                                .code { font-size: 32px; letter-spacing: 8px; }
                                .code-3d { padding: 24px 0 18px 0; }
                            }
                        </style>
                        <script type="text/javascript">
                        // Пасхалка: приветствие при клике на робота
                        function greet() {
                            alert('Привет от Kuber Code! Успехов в обучении 🚀');
                        }
                        </script>
                    </head>
                    <body style="position:relative; min-height:100vh;">
                        <div class="email-container">
                            <div class="header">
                                <svg class="bg-svg" width="100%" height="220" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="40" y="40" width="60" height="60" rx="12" fill="#fff" fill-opacity="0.07"/>
                                    <rect x="120" y="20" width="40" height="40" rx="8" fill="#fff" fill-opacity="0.10"/>
                                    <rect x="500" y="60" width="50" height="50" rx="10" fill="#fff" fill-opacity="0.08"/>
                                    <rect x="300" y="30" width="70" height="70" rx="14" fill="#fff" fill-opacity="0.06"/>
                                    <rect x="400" y="120" width="30" height="30" rx="6" fill="#fff" fill-opacity="0.10"/>
                                    <rect x="200" y="100" width="40" height="40" rx="8" fill="#fff" fill-opacity="0.09"/>
                                </svg>
                                <div class="logo">Kuber Code</div>
                                <div class="subtitle">Платформа для изучения программирования</div>
                                <img src="./robot.svg" width="64" height="64" alt="Kuber Robot" class="robot" style="display:block;margin:18px auto 0 auto;" />
                            </div>
                            <div class="content">
                                <h1 class="title">Подтверждение регистрации</h1>
                                <p class="message">
                                    Добро пожаловать в Kuber Code! Для завершения регистрации <br>введите код подтверждения ниже:
                                </p>
                                <div class="code-3d">
                                    <span class="code">${code}</span>
                                </div>
                                <div class="warning">
                                    <span style="font-size:18px;">⚠️</span>
                                    Код действителен в течение 10 минут. Если вы не запрашивали этот код, проигнорируйте это письмо.
                                </div>
                            </div>
                            <div class="footer">
                                <div class="social-links">
                                    <a href="https://twitter.com/kubercode">Twitter</a>
                                    <a href="https://github.com/kubercode">GitHub</a>
                                    <a href="https://discord.gg/kubercode">Discord</a>
                                </div>
                                <p>© ${new Date().getFullYear()} Kuber Code. Все права защищены.</p>
                                <p style="margin-top: 8px; color: #A0AEC0;">Это автоматическое письмо, пожалуйста, не отвечайте на него.</p>
                            </div>
                        </div>
                    </body>
                </html>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return NextResponse.json({
            success: true,
            previewUrl: nodemailer.getTestMessageUrl(info),
            code, // Возвращаем код для отладки
        });
    } catch (error) {
        console.error("Ошибка при отправке email:", error);
        return NextResponse.json(
            { error: "Ошибка при отправке email" },
            { status: 500 }
        );
    }
}
