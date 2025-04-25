"use client";

import { Container } from "@/components/shared";
import { BlogSection } from "@/components/media/BlogSection";
import { DigestSection } from "@/components/media/DigestSection";
import { motion } from "framer-motion";
import { BookText, Newspaper, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const sections = [
    {
        value: "blog",
        label: "Блог",
        icon: BookText,
        color: "from-purple-500 to-pink-500",
        shadowColor: "shadow-purple-500/25",
    },
    {
        value: "digest",
        label: "IT-дайджест",
        icon: Newspaper,
        color: "from-green-500 to-emerald-500",
        shadowColor: "shadow-green-500/25",
    },
];

const MediaContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultSection = searchParams.get("section") || "blog";
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const handleSectionChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("section", value);
        router.push(`/media?${params.toString()}`, { scroll: false });
    };

    const handleSearch = () => {
        setIsSearching(true);
        const params = new URLSearchParams(searchParams);
        if (searchQuery) {
            params.set("search", searchQuery);
        } else {
            params.delete("search");
        }
        router.push(`/media?${params.toString()}`, { scroll: false });
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 dark:from-zinc-900 dark:via-black dark:to-zinc-900">
            <Container className="py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-4 sm:gap-8">
                    {/* Заголовок */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center px-4"
                    >
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Медиа-центр
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Актуальные новости и статьи из мира IT
                        </p>
                    </motion.div>

                    {/* Поиск */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full max-w-xl px-4"
                    >
                        <div className="relative flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    type="text"
                                    placeholder="Поиск статей..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && handleSearch()
                                    }
                                    className="pl-10 pr-4 py-6 text-lg rounded-full shadow-lg border-gray-200 dark:border-zinc-700 focus:border-purple-500 dark:focus:border-purple-500"
                                />
                            </div>
                            <Button
                                onClick={handleSearch}
                                className="px-6 py-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Переключатель разделов */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex justify-center w-full px-4"
                    >
                        <div className="inline-flex p-1 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-700">
                            {sections.map((section) => (
                                <Button
                                    key={section.value}
                                    variant="ghost"
                                    className={cn(
                                        "relative group px-4 sm:px-6 py-2 rounded-xl",
                                        "transition-all duration-300",
                                        "hover:bg-gray-100 dark:hover:bg-zinc-700",
                                        defaultSection === section.value &&
                                            "bg-gradient-to-r " + section.color
                                    )}
                                    onClick={() =>
                                        handleSectionChange(section.value)
                                    }
                                >
                                    <motion.div
                                        className="flex items-center gap-2"
                                        initial={false}
                                        animate={{
                                            scale:
                                                defaultSection === section.value
                                                    ? 1.05
                                                    : 1,
                                        }}
                                        transition={{
                                            type: "spring",
                                            bounce: 0.3,
                                        }}
                                    >
                                        <section.icon
                                            className={cn(
                                                "w-4 h-4 sm:w-5 sm:h-5",
                                                defaultSection === section.value
                                                    ? "text-white"
                                                    : "text-gray-600 dark:text-gray-400"
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                "text-sm font-medium whitespace-nowrap",
                                                defaultSection === section.value
                                                    ? "text-white"
                                                    : "text-gray-600 dark:text-gray-400"
                                            )}
                                        >
                                            {section.label}
                                        </span>
                                    </motion.div>
                                </Button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Контент */}
                    <motion.div
                        key={defaultSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-7xl mx-auto"
                    >
                        {defaultSection === "blog" ? (
                            <BlogSection
                                searchQuery={searchQuery}
                                isSearching={isSearching}
                            />
                        ) : (
                            <DigestSection
                                searchQuery={searchQuery}
                                isSearching={isSearching}
                            />
                        )}
                    </motion.div>
                </div>
            </Container>
        </main>
    );
};

export default MediaContent;
