import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/shared/providers";
import ClientLayout from "./ClientLayout"; // Импорт клиентского компонента
import { Toaster } from "@/components/ui/sonner";

// Кастомный шрифт
const BlobSpongey = localFont({
    src: [
        {
            path: "./fonts/BlobSpongeyLowercase.woff2",
            weight: "400",
            style: "normal",
        },
    ],
    variable: "--font-custom",
});

const montserrat = Montserrat({
    subsets: ["cyrillic"],
    variable: "--font-montserrat",
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap", // Оптимизация отображения шрифта
});

// Определяем метаданные для сервера
export const metadata: Metadata = {
    metadataBase: new URL("https://kubercode.ru"),
    title: {
        default: "KuberCode | Онлайн-обучение IT профессиям",
        template: "%s | KuberCode",
    },
    description:
        "Начни карьеру в IT вместе с нами. Мы поможем вам освоить востребованные навыки и найти работу мечты в технологической сфере. Более 5000 курсов от ведущих экспертов.",
    keywords: [
        "обучение IT",
        "программирование",
        "курсы разработки",
        "онлайн образование",
        "IT профессии",
        "обучение программированию",
        "курсы программирования",
        "курсы разработки",
        "курсы онлайн",
        "курсы для начинающих",
        "курсы для детей",
        "курсы для взрослых",
        "it курсы",
    ],
    authors: [{ name: "KuberCode Team" }],
    creator: "KuberCode",
    publisher: "KuberCode",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "KuberCode | Онлайн-обучение IT профессиям",
        description:
            "Начни карьеру в IT вместе с нами. Более 5000 курсов от ведущих экспертов.",
        url: "https://kubercode.ru",
        siteName: "KuberCode",
        locale: "ru_RU",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "google-site-verification=5neX398Z9s0tAO-HC0fgl60kisf6gyTnwP9BlpivPmw",
        yandex: "9fa408ddedb1f6cf",
        other: {
            "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "", // Для Bing (если понадобится)
        },
    },
    alternates: {
        canonical: "https://kubercode.ru",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru" className="!scroll-smooth">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=5"
                />
            </head>
            <body
                className={`${montserrat.variable} ${BlobSpongey.variable} overflow-x-hidden`}
            >
                <main className="min-h-screen">
                    <Providers>
                        <ClientLayout>{children}</ClientLayout>
                    </Providers>
                    <Toaster />
                </main>
            </body>
        </html>
    );
}
