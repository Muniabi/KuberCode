"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared";

export const MediaHero = () => {
    return (
        <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-transparent to-blue-500/30 dark:from-purple-500/10 dark:to-blue-500/10 backdrop-blur-3xl" />

            <Container className="relative py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Медиа-платформа для IT-энтузиастов
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Погрузитесь в мир технологий через статьи, подкасты и
                        видео от экспертов индустрии
                    </p>
                </motion.div>
            </Container>
        </section>
    );
};
