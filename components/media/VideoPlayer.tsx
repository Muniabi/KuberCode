"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Video from "next-video";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronDown, Share2 } from "lucide-react";
import Image from "next/image";
import { videos } from "@/lib/data/videos";

type VideoPlayerProps = {
    video: (typeof videos)[0];
};

export const VideoPlayer = ({ video }: VideoPlayerProps) => {
    const router = useRouter();
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuality, setCurrentQuality] = useState<string>("auto");

    // Обработчики событий видео
    const handleError = useCallback(() => {
        setError(true);
        setIsLoading(false);
    }, []);

    const handleLoadStart = useCallback(() => {
        setIsLoading(true);
        setError(false);
    }, []);

    const handleLoadedData = useCallback(() => {
        setIsLoading(false);
    }, []);

    const handleShare = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Ссылка скопирована");
        } catch (error) {
            console.error("Ошибка:", error);
            toast.error("Не удалось скопировать ссылку");
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#000000] dark:bg-[#000000] bg-white">
            {/* Верхняя навигация */}
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
                        onClick={() => router.back()}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <Image
                            src={video.author.avatar}
                            alt={video.author.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <div>
                            <h2 className="text-black dark:text-white font-medium">
                                {video.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {video.author.name}
                            </p>
                        </div>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
                    onClick={handleShare}
                >
                    <Share2 className="h-5 w-5" />
                </Button>
            </div>

            {/* Основной контент */}
            <div className="flex flex-col lg:flex-row">
                <div className="flex-1">
                    {/* Видеоплеер */}
                    <div className="relative aspect-video bg-[#f5f5f5] dark:bg-[#111111]">
                        <Video
                            src={video.videoUrl}
                            poster={video.thumbnail}
                            controls
                            preload="metadata"
                            autoPlay
                            playsInline
                            className="absolute inset-0 w-full h-full object-contain"
                            style={{
                                backgroundColor: "#111111",
                                "--video-brand-color": "#FF4500",
                            }}
                            onError={handleError}
                            onLoadStart={handleLoadStart}
                            onLoadedData={handleLoadedData}
                        />
                        <style jsx global>{`
                            video::-webkit-media-controls-fullscreen-button {
                                display: block;
                            }

                            video:fullscreen,
                            video:-webkit-full-screen,
                            video:-moz-full-screen {
                                width: 100vw !important;
                                height: 100vh !important;
                                object-fit: contain !important;
                                background: black;
                            }
                        `}</style>

                        {/* Индикатор загрузки */}
                        {isLoading && !error && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                            </div>
                        )}

                        {/* Сообщение об ошибке */}
                        {error && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white">
                                <div className="text-center p-4">
                                    <p className="mb-2">
                                        Ошибка при загрузке видео
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setError(false);
                                            setIsLoading(true);
                                            // Перезагрузка видео
                                            const videoElement =
                                                document.querySelector("video");
                                            if (videoElement) {
                                                videoElement.load();
                                            }
                                        }}
                                    >
                                        Попробовать снова
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Информация о видео */}
                    <div className="p-6 bg-[#f5f5f5] dark:bg-[#111111] rounded-lg m-4">
                        <Collapsible onOpenChange={setIsInfoOpen}>
                            <CollapsibleTrigger asChild>
                                <div className="flex items-center justify-between cursor-pointer text-black dark:text-white">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            {video.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {video.views} просмотров
                                        </p>
                                    </div>
                                    <motion.div
                                        animate={{
                                            rotate: isInfoOpen ? 180 : 0,
                                        }}
                                    >
                                        <ChevronDown className="h-5 w-5" />
                                    </motion.div>
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: isInfoOpen ? "auto" : 0,
                                        opacity: isInfoOpen ? 1 : 0,
                                    }}
                                    className="mt-4 text-gray-700 dark:text-gray-300"
                                >
                                    <p>{video.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {video.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="bg-black/10 dark:bg-white/10 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </motion.div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>

                {/* Боковая панель с похожими видео */}
                <div className="lg:w-[400px] bg-[#f5f5f5] dark:bg-[#111111]">
                    <ScrollArea className="h-[calc(100vh-64px)]">
                        <div className="p-4">
                            <h3 className="text-black dark:text-white font-medium mb-4">
                                Похожие видео
                            </h3>
                            <div className="space-y-4">
                                {videos
                                    .filter((v) => v.id !== video.id)
                                    .map((relatedVideo) => (
                                        <div
                                            key={relatedVideo.id}
                                            className="flex gap-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg"
                                            onClick={() =>
                                                router.push(
                                                    `/media/video/${relatedVideo.id}`
                                                )
                                            }
                                        >
                                            <div className="relative w-40 aspect-video rounded-lg overflow-hidden">
                                                <Image
                                                    src={relatedVideo.thumbnail}
                                                    alt={relatedVideo.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-white text-xs rounded">
                                                    {relatedVideo.duration}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-black dark:text-white font-medium line-clamp-2">
                                                    {relatedVideo.title}
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                                    {relatedVideo.author.name}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                    {relatedVideo.views}{" "}
                                                    просмотров
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};
