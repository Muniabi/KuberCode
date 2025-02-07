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
        <div className="min-h-screen bg-background">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <h2 className="ml-4 font-semibold line-clamp-1">
                        {video.title}
                    </h2>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleShare}
                    title="Поделиться"
                >
                    <Share2 className="h-5 w-5" />
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row">
                <div className="flex-1">
                    <div className="relative aspect-video bg-black">
                        <Video
                            src={video.videoUrl}
                            poster={video.thumbnail}
                            controls
                            preload="metadata"
                            autoPlay
                            playsInline
                            className="absolute inset-0 w-full h-full object-contain"
                            style={{
                                backgroundColor: "black",
                                "--video-brand-color": "var(--primary)",
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

                    <div className="p-4">
                        <Collapsible onOpenChange={setIsInfoOpen}>
                            <CollapsibleTrigger asChild>
                                <div className="flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={video.author.avatar}
                                            alt={video.author.name}
                                            width={48}
                                            height={48}
                                            className="rounded-full w-12 h-12 object-cover"
                                        />
                                        <div>
                                            <h3 className="font-medium">
                                                {video.author.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {video.author.subscribers}{" "}
                                                подписчиков
                                            </p>
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{
                                            rotate: isInfoOpen ? 180 : 0,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <ChevronDown className="h-5 w-5" />
                                    </motion.div>
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent forceMount>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: isInfoOpen ? "auto" : 0,
                                        opacity: isInfoOpen ? 1 : 0,
                                    }}
                                    transition={{
                                        height: {
                                            duration: 0.3,
                                            ease: "easeInOut",
                                        },
                                        opacity: {
                                            duration: 0.2,
                                            delay: isInfoOpen ? 0.1 : 0,
                                        },
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 space-y-2">
                                        <p className="text-sm">
                                            {video.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {video.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>

                <div className="lg:w-[400px] border-t lg:border-t-0 lg:border-l">
                    <ScrollArea className="h-[calc(100vh-64px)]">
                        <div className="p-4">
                            <h3 className="font-medium mb-4">Похожие видео</h3>
                            <div className="space-y-4">
                                {videos
                                    .filter((v) => v.id !== video.id)
                                    .map((relatedVideo) => (
                                        <div
                                            key={relatedVideo.id}
                                            className="flex gap-3 cursor-pointer"
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
                                                <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 text-white text-xs rounded">
                                                    {relatedVideo.duration}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium line-clamp-2">
                                                    {relatedVideo.title}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    {relatedVideo.author.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
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
