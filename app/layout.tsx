import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/providers";
import ClientLayout from "./ClientLayout"; // Импорт клиентского компонента
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
    subsets: ["cyrillic"],
    variable: "--font-montserrat",
    weight: ["400", "500", "600", "700", "800", "900"],
});

// Определяем метаданные для сервера
export const metadata: Metadata = {
    title: "KuberCode | Главная", // Общие метаданные
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru" className="!scroll-smooth">
            <body className={`${montserrat.className} overflow-x-hidden`}>
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
