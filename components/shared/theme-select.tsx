import React from "react";
import {
    Switch,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Props {
    className?: string;
}

export const ThemeSelect: React.FC<Props> = ({ className }) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (!savedTheme) {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        } else {
            setTheme(savedTheme);
        }

        setMounted(true);
    }, [setTheme]);

    if (!mounted) return null;

    const isDarkMode = theme === "dark";

    const onClick = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setTheme(newTheme);
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center justify-between text-sm">
                        {isDarkMode ? <p>Темная тема</p> : <p>Светлая тема</p>}
                        <Switch
                            className="my-2"
                            onClick={onClick}
                            checked={isDarkMode}
                        />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Сменить тему</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
