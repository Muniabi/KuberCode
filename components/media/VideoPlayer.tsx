"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    ChevronDown,
    Play,
    Pause,
    Volume1,
    VolumeX,
    Maximize2,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { videos } from "@/lib/data/videos";
// ... остальные импорты

type VideoPlayerProps = {
    video: (typeof videos)[0];
};

export const VideoPlayer = ({ video }: VideoPlayerProps) => {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                if (videoRef.current.readyState >= 2) {
                    videoRef.current.play().catch(() => {
                        setIsPlaying(false);
                    });
                }
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const formatViews = (views: number): string => {
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        }
        if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`;
        }
        return views.toString();
    };

    const handleMouseEnter = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
    };

    const handleMouseLeave = () => {
        if (isPlaying) {
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 5000);
        }
    };

    // Добавляем обработчик для полноэкранного режима
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                // Сбрасываем масштаб при выходе из полноэкранного режима
                const metaViewport = document.querySelector(
                    "meta[name=viewport]"
                );
                if (metaViewport) {
                    metaViewport.setAttribute(
                        "content",
                        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                    );
                }

                // Дополнительно сбрасываем масштаб через timeout
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    document.body.style.zoom = "1";
                    document.body.style.transform = "scale(1)";
                }, 100);
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            setShowControls(true);
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 5000);
        } else {
            setShowControls(true); // Показываем контролы, если на паузе
        }

        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, [isPlaying]);

    return (
        <div
            className="min-h-screen bg-background"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Верхняя панель */}
            <div className="flex items-center p-4 border-b">
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

            {/* Основной контент */}
            <div className="flex flex-col lg:flex-row">
                {/* Видео и информация */}
                <div className="flex-1">
                    {/* Видеоплеер */}
                    <div className="relative aspect-video bg-black">
                        <video
                            ref={videoRef}
                            src={video.videoUrl}
                            className="w-full h-full"
                            onClick={togglePlay}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={() => setIsPlaying(false)}
                            poster={video.thumbnail}
                        />

                        {/* Центральная кнопка play/pause - уменьшаем размер для мобильных */}
                        <div
                            className={cn(
                                "absolute inset-0 flex items-center justify-center",
                                "pointer-events-none"
                            )}
                        >
                            <Button
                                size="icon"
                                variant="ghost"
                                className={cn(
                                    "w-12 h-12 lg:w-20 lg:h-20 rounded-full bg-black/50 hover:bg-black/70 text-white",
                                    "pointer-events-auto",
                                    showControls || !isPlaying
                                        ? "opacity-100"
                                        : "opacity-0"
                                )}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePlay();
                                }}
                            >
                                {isPlaying ? (
                                    <Pause className="h-6 w-6 lg:h-10 lg:w-10" />
                                ) : (
                                    <Play className="h-6 w-6 lg:h-10 lg:w-10 ml-1" />
                                )}
                            </Button>
                        </div>

                        {/* Контролы плеера - делаем компактнее */}
                        <div
                            className={cn(
                                "absolute inset-x-0 bottom-0 p-2 lg:p-4",
                                "bg-gradient-to-t from-black/90 via-black/60 to-transparent",
                                "pointer-events-none",
                                showControls || !isPlaying
                                    ? "opacity-100"
                                    : "opacity-0"
                            )}
                        >
                            <div className="pointer-events-auto">
                                {/* Прогресс-бар */}
                                <div className="space-y-1 lg:space-y-2 mb-1 lg:mb-4">
                                    <Slider
                                        value={[currentTime]}
                                        max={duration}
                                        step={1}
                                        className="cursor-pointer h-1 lg:h-2"
                                        onValueChange={(value) => {
                                            if (videoRef.current) {
                                                videoRef.current.currentTime =
                                                    value[0];
                                                setCurrentTime(value[0]);
                                            }
                                        }}
                                    />
                                    <div className="flex justify-between text-[10px] lg:text-xs text-white">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                </div>

                                {/* Нижняя панель с кнопками */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 lg:gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 lg:h-10 lg:w-10 text-white hover:bg-white/20"
                                            onClick={togglePlay}
                                        >
                                            {isPlaying ? (
                                                <Pause className="h-4 w-4 lg:h-5 lg:w-5" />
                                            ) : (
                                                <Play className="h-4 w-4 lg:h-5 lg:w-5" />
                                            )}
                                        </Button>

                                        <div className="flex items-center group relative">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 lg:h-10 lg:w-10 text-white hover:bg-white/20"
                                                onClick={toggleMute}
                                            >
                                                {isMuted ? (
                                                    <VolumeX className="h-4 w-4 lg:h-5 lg:w-5" />
                                                ) : (
                                                    <Volume1 className="h-4 w-4 lg:h-5 lg:w-5" />
                                                )}
                                            </Button>
                                            <div className="w-20 lg:w-24 scale-0 group-hover:scale-100 origin-left transition-transform">
                                                <Slider
                                                    value={[volume]}
                                                    max={100}
                                                    step={1}
                                                    className="cursor-pointer h-1 lg:h-2"
                                                    onValueChange={(value) => {
                                                        setVolume(value[0]);
                                                        if (videoRef.current) {
                                                            videoRef.current.volume =
                                                                value[0] / 100;
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 lg:h-10 lg:w-10 text-white hover:bg-white/20"
                                        onClick={() => {
                                            if (!document.fullscreenElement) {
                                                videoRef.current?.requestFullscreen();
                                            } else {
                                                document.exitFullscreen();
                                            }
                                        }}
                                    >
                                        <Maximize2 className="h-4 w-4 lg:h-5 lg:w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Информация о видео */}
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

                {/* Рекомендации */}
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
                                                    {formatViews(
                                                        relatedVideo.views
                                                    )}{" "}
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
