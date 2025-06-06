"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeSwitcher() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        // Check if theme is stored in localStorage
        const storedTheme = localStorage.getItem("theme") as
            | "light"
            | "dark"
            | null;
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.setAttribute("data-theme", storedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 rounded-full"
            onClick={toggleTheme}
        >
            {theme === "light" ? (
                <Moon className="h-4 w-4 text-[--text-color] transition-colors" />
            ) : (
                <Sun className="h-4 w-4 text-[--text-color] transition-colors" />
            )}
            <span className="sr-only">Переключить тему</span>
        </Button>
    );
}
