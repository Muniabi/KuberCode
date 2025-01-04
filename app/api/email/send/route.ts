import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const { email, code } = await request.json();

        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        const mailOptions = {
            from: '"Kuber Code" <noreply@kubercode.com>',
            to: email,
            subject: "Подтверждение регистрации",
            html: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <style>
                            .email-container {
                                font-family: 'Arial', sans-serif;
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #ffffff;
                            }
                            .header {
                                text-align: center;
                                padding: 20px 0;
                            }
                            .logo {
                                font-size: 28px;
                                font-weight: bold;
                                color: #1B0934;
                                margin-bottom: 10px;
                            }
                            .title {
                                font-size: 24px;
                                color: #591F9C;
                                margin: 20px 0;
                            }
                            .code-container {
                                background: linear-gradient(135deg, #A559DD 0%, #591F9C 100%);
                                border-radius: 10px;
                                padding: 30px;
                                margin: 20px 0;
                                text-align: center;
                            }
                            .code {
                                font-size: 36px;
                                letter-spacing: 8px;
                                color: #ffffff;
                                font-weight: bold;
                                margin: 0;
                                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            }
                            .message {
                                color: #666666;
                                line-height: 1.6;
                                margin: 20px 0;
                            }
                            .footer {
                                text-align: center;
                                margin-top: 30px;
                                padding-top: 20px;
                                border-top: 1px solid #eeeeee;
                                color: #999999;
                                font-size: 12px;
                            }
                            .warning {
                                color: #666666;
                                font-size: 14px;
                                font-style: italic;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="header">
                                <div class="logo">Kuber Code</div>
                                <div style="color: #591F9C;">Платформа для изучения программирования</div>
                            </div>
                            
                            <h1 class="title">Подтверждение регистрации</h1>
                            
                            <p class="message">
                                Здравствуйте! Спасибо за регистрацию в Kuber Code. 
                                Для завершения процесса регистрации, пожалуйста, введите следующий код подтверждения:
                            </p>
                            
                            <div class="code-container">
                                <div class="code">${code}</div>
                            </div>
                            
                            <p class="warning">
                                Код действителен в течение 10 минут. Если вы не запрашивали этот код, 
                                пожалуйста, проигнорируйте это письмо.
                            </p>
                            
                            <div class="footer">
                                <p>© ${new Date().getFullYear()} Kuber Code. Все права защищены.</p>
                                <p>Это автоматическое письмо, пожалуйста, не отвечайте на него.</p>
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
        });
    } catch (error) {
        console.error("Ошибка при отправке email:", error);
        return NextResponse.json(
            { error: "Ошибка при отправке email" },
            { status: 500 }
        );
    }
}
