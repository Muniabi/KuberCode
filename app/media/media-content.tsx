"use client";

import { Container } from "@/components/shared";
import { MediaHero } from "@/components/media/MediaHero";
import { BlogSection } from "@/components/media/BlogSection";
import { PodcastSection } from "@/components/media/PodcastSection";
import { VideoSection } from "@/components/media/VideoSection";
import { DigestSection } from "@/components/media/DigestSection";
import { SuccessStories } from "@/components/media/SuccessStories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { BookText, Podcast, PlayCircle, Newspaper, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { useState, useEffect } from "react";

const tabs = [
    {
        value: "blog",
        label: "Блог",
        icon: BookText,
        color: "from-purple-500 to-pink-500",
        shadowColor: "shadow-purple-500/25",
    },
    {
        value: "podcasts",
        label: "Подкасты",
        icon: Podcast,
        color: "from-blue-500 to-cyan-500",
        shadowColor: "shadow-blue-500/25",
    },
    {
        value: "video",
        label: "Видео",
        icon: PlayCircle,
        color: "from-red-500 to-orange-500",
        shadowColor: "shadow-red-500/25",
    },
    {
        value: "digest",
        label: "IT-дайджест",
        icon: Newspaper,
        color: "from-green-500 to-emerald-500",
        shadowColor: "shadow-green-500/25",
    },
];

// Определяем тип для пропсов TabsTrigger
type CustomTabsTriggerProps = ComponentPropsWithoutRef<typeof TabsTrigger> & {
    children: (props: { selected: boolean }) => React.ReactNode;
};

const MediaContent = () => {
    const [activeTab, setActiveTab] = useState("blog");

    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-black">
            <MediaHero />

            <Container className="py-12">
                <Tabs
                    defaultValue="blog"
                    className="w-full"
                    onValueChange={setActiveTab}
                >
                    <TabsList className="w-full justify-start mb-8 bg-transparent border-none">
                        <div className="flex flex-wrap gap-2 md:gap-4">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="group relative"
                                >
                                    <motion.div
                                        className={cn(
                                            "relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer",
                                            "transition-all duration-300",
                                            "[data-state=active]&:bg-gradient-to-r [data-state=active]&:shadow-lg " +
                                                tab.color +
                                                " " +
                                                tab.shadowColor,
                                            "[data-state=inactive]&:bg-white/80 [data-state=inactive]&:dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-800"
                                        )}
                                        initial={false}
                                        animate={{
                                            scale:
                                                activeTab === tab.value
                                                    ? 1.05
                                                    : 1,
                                        }}
                                        transition={{
                                            type: "spring",
                                            bounce: 0.3,
                                        }}
                                    >
                                        <tab.icon
                                            className={cn(
                                                "w-5 h-5 transition-colors",
                                                "[data-state=active]&:text-white",
                                                "[data-state=inactive]&:text-gray-600 [data-state=inactive]&:dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                "font-medium transition-colors",
                                                "[data-state=active]&:text-white",
                                                "[data-state=inactive]&:text-gray-600 [data-state=inactive]&:dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            )}
                                        >
                                            {tab.label}
                                        </span>

                                        <motion.div
                                            className="absolute -bottom-1 left-2 right-2 h-0.5 bg-white rounded-full"
                                            layoutId="activeTab"
                                            initial={false}
                                            transition={{
                                                type: "spring",
                                                bounce: 0.3,
                                                duration: 0.6,
                                            }}
                                        />
                                    </motion.div>
                                </TabsTrigger>
                            ))}
                        </div>
                    </TabsList>

                    <TabsContent value="blog">
                        <BlogSection />
                    </TabsContent>

                    <TabsContent value="podcasts">
                        <PodcastSection />
                    </TabsContent>

                    <TabsContent value="video">
                        <VideoSection />
                    </TabsContent>

                    <TabsContent value="digest">
                        <DigestSection />
                    </TabsContent>
                </Tabs>
            </Container>
        </main>
    );
};

export default MediaContent;
