"use client";

import { motion } from "framer-motion";

export const Hero3D = () => {
    return (
        <div className="relative w-full h-full">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]">
                    {/* Основная сфера */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-blue-600/30 dark:from-purple-600/30 dark:to-blue-600/30 rounded-full blur-2xl" />

                    {/* Плавающие элементы */}
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-10 sm:top-20 left-10 sm:left-20 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400 rounded-2xl shadow-xl"
                    />

                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-20 sm:bottom-40 right-10 sm:right-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 rounded-full shadow-xl"
                    />

                    {/* Кодовые элементы */}
                    <motion.div
                        animate={{
                            x: [0, 10, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-20 sm:top-40 right-20 sm:right-40 p-3 sm:p-4 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-xl shadow-xl border border-black/10 dark:border-white/20"
                    >
                        <pre className="text-[14px] sm:text-sm text-purple-600 dark:text-purple-300">
                            {`function code() {
  return magic;
}`}
                        </pre>
                    </motion.div>

                    <motion.div
                        animate={{
                            x: [0, -10, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-10 sm:bottom-20 left-20 sm:left-40 p-3 sm:p-4 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-xl shadow-xl border border-black/10 dark:border-white/20"
                    >
                        <pre className="text-[14px] sm:text-sm text-blue-600 dark:text-blue-300">
                            {`const future = {
  skills: "∞"
};`}
                        </pre>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
