"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export const CompletionStep = ({ data }: { data: any }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
        >
            <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/30">
                <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Профиль настроен!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Теперь вы можете начать обучение. Мы подобрали для вас курсы на
                основе ваших предпочтений и уровня знаний.
            </p>
        </motion.div>
    );
};
