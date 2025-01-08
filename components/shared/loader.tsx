"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
}

export const Loader: React.FC<Props> = ({ className }) => {
    const logoSquares = [
        // Вертикальная линия
        { x: 13, y: 11, width: 6, height: 28 },
        // Верхняя диагональ
        { x: 19, y: 21, width: 6, height: 6 },
        { x: 24, y: 16, width: 6, height: 6 },
        { x: 29, y: 11, width: 6, height: 6 },
        // Нижняя диагональ
        { x: 19, y: 23, width: 6, height: 6 },
        { x: 24, y: 28, width: 6, height: 6 },
        { x: 29, y: 33, width: 6, height: 6 },
    ];

    return (
        <div
            className={cn(
                "fixed inset-0 flex flex-col items-center justify-center",
                "bg-white dark:bg-black",
                className
            )}
        >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                <svg viewBox="0 0 50 50" className="w-full h-full">
                    {logoSquares.map((square, index) => (
                        <motion.rect
                            key={index}
                            x={square.x}
                            y={square.y}
                            width={square.width}
                            height={square.height}
                            fill="#A559DD"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 1, 1],
                                opacity: [0, 1, 1],
                                rotate: [0, 360, 360],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatDelay: 1,
                                times: [0, 0.8, 1],
                                ease: "easeInOut",
                            }}
                            style={{
                                transformOrigin: "25px 25px",
                            }}
                        />
                    ))}
                </svg>
            </div>

            <motion.div
                className={cn(
                    "mt-4 sm:mt-6 md:mt-8",
                    "text-lg sm:text-xl md:text-2xl",
                    "font-semibold",
                    "text-[#A559DD]",
                    "select-none"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: [0, 0, 1, 1],
                    y: [20, 0, 0, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1,
                    times: [0, 0.7, 0.8, 1],
                    ease: "easeInOut",
                }}
            >
                Kuber Code
            </motion.div>
        </div>
    );
};
