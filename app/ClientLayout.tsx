"use client"; // Обязательно добавьте это в начало файла

import { Header } from "@/components/shared/index";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader } from "@/components/shared/loader";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAccountPage = pathname.startsWith("/account");
    const [isLoading, setIsLoading] = useState(false); // включить/выключить лоадер

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            {!isAccountPage && <Header />}
            {children}
        </>
    );
}
