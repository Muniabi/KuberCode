"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundGradient = ({
    children,
    className,
    containerClassName,
    animate = true,
}: {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    animate?: boolean;
}) => {
    const mouseX = React.useRef(0);
    const mouseY = React.useRef(0);

    React.useEffect(() => {
        if (!animate) return;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX.current = event.clientX;
            mouseY.current = event.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [animate]);

    return (
        <div
            className={cn(
                "relative h-full w-full bg-white dark:bg-zinc-900",
                containerClassName
            )}
        >
            <div
                className={cn(
                    "relative h-full w-full rounded-[inherit] bg-white dark:bg-zinc-900",
                    "border border-black/[0.08] dark:border-white/[0.08]",
                    "overflow-hidden",
                    className
                )}
            >
                <div
                    className={cn(
                        "pointer-events-none absolute -inset-px opacity-0 transition duration-300",
                        "bg-[radial-gradient(650px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(0,163,255,0.12),transparent_80%)]",
                        "dark:bg-[radial-gradient(650px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(0,163,255,0.08),transparent_80%)]",
                        "group-hover:opacity-100"
                    )}
                    style={
                        {
                            "--mouse-x": `${mouseX.current}px`,
                            "--mouse-y": `${mouseY.current}px`,
                        } as React.CSSProperties
                    }
                />
                {children}
            </div>
        </div>
    );
};
