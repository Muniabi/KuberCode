"use client";

import { Container } from "@/components/shared";
import { MediaHero } from "@/components/media/MediaHero";
import { BlogSection } from "@/components/media/BlogSection";
import { PodcastSection } from "@/components/media/PodcastSection";
import { VideoSection } from "@/components/media/VideoSection";
import { DigestSection } from "@/components/media/DigestSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { BookText, Podcast, PlayCircle, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const tabs = [
    {
        value: "blog",
        label: "Блог",
        icon: BookText,
        color: "from-purple-500 to-pink-500",
        shadowColor: "shadow-purple-500/25",
    },
    {
        value: "podcast",
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
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultTab = searchParams.get("tab") || "blog";
    const videoId = searchParams.get("videoId");

    const handleTabChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("tab", value);
        // Удаляем videoId при смене таба
        params.delete("videoId");
        router.push(`/media?${params.toString()}`, { scroll: false });
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-black">
            {/* <MediaHero /> */}

            <Container className="py-8 mx-4">
                <Tabs
                    defaultValue={defaultTab}
                    className="w-full"
                    onValueChange={handleTabChange}
                >
                    <div className="flex justify-center w-full mb-8">
                        <TabsList className="w-full max-w-2xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm p-2 rounded-2xl">
                            <div className="flex justify-center gap-2 w-full">
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
                                                "[data-state=inactive]&:hover:bg-white dark:[data-state=inactive]&:hover:bg-zinc-700"
                                            )}
                                            initial={false}
                                            animate={{
                                                scale:
                                                    defaultTab === tab.value
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
                                                    "w-4 h-4",
                                                    "[data-state=active]&:text-white",
                                                    "[data-state=inactive]&:text-gray-600 dark:[data-state=inactive]&:text-gray-400"
                                                )}
                                            />
                                            <span
                                                className={cn(
                                                    "hidden sm:block text-sm font-medium",
                                                    "[data-state=active]&:text-white",
                                                    "[data-state=inactive]&:text-gray-600 dark:[data-state=inactive]&:text-gray-400"
                                                )}
                                            >
                                                {tab.label}
                                            </span>
                                        </motion.div>
                                    </TabsTrigger>
                                ))}
                            </div>
                        </TabsList>
                    </div>

                    <TabsContent value="video">
                        <VideoSection initialVideoId={videoId} />
                    </TabsContent>
                    <TabsContent value="podcast">
                        <PodcastSection />
                    </TabsContent>
                    <TabsContent value="blog">
                        <BlogSection />
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
