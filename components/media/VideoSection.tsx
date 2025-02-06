"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    SkipForward,
    Maximize2,
    Settings,
    ThumbsUp,
    MessageSquare,
    Share2,
    Clock,
    BookmarkPlus,
    MoreVertical,
    ChevronLeft,
    ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

const videos = [
    {
        id: 1,
        title: "Введение в React: основы и хуки",
        description:
            "Подробный разбор основ React и работы с хуками. Изучим useState, useEffect и другие важные концепции.",
        thumbnail: "/course-school-bg.svg",
        videoUrl: "/BMW M8 Gran Coupe Venom.mp4",
        duration: "12:30",
        views: 1234,
        likes: 423,
        comments: 56,
        author: {
            name: "Александр Петров",
            avatar: "/avatar1.png",
            subscribers: "10.2K",
        },
        tags: ["React", "Frontend", "JavaScript"],
        uploadDate: "2024-01-15",
    },
    {
        id: 2,
        title: "TypeScript для начинающих",
        description: "Базовые концепции TypeScript, типы данных и интерфейсы",
        thumbnail: "/course-school-bg.svg",
        videoUrl: "/Akrapovic BMW M5 Stingray.mp4",
        duration: "15:45",
        views: 2300,
        likes: 567,
        comments: 89,
        author: {
            name: "Мария Иванова",
            avatar: "/avatar2.png",
            subscribers: "8.5K",
        },
        tags: ["TypeScript", "Frontend", "JavaScript"],
        uploadDate: "2024-01-20",
    },
    {
        id: 3,
        title: "Next.js 14: Что нового?",
        description: "Обзор новых возможностей Next.js 14 и Server Components",
        thumbnail: "/course-school-bg.svg",
        videoUrl: "/IMG_3434.MP4",
        duration: "20:15",
        views: 3500,
        likes: 890,
        comments: 145,
        author: {
            name: "Дмитрий Сидоров",
            avatar: "/avatar1.png",
            subscribers: "15.3K",
        },
        tags: ["Next.js", "React", "Frontend"],
        uploadDate: "2024-01-25",
    },
];

const relatedVideos = [
    {
        id: 2,
        title: "TypeScript для начинающих",
        duration: "15:45",
        views: "2.3K",
        thumbnail: "/course-school-bg.svg",
        author: "Мария Иванова",
    },
    {
        id: 3,
        title: "Next.js 14: Что нового?",
        duration: "20:15",
        views: "3.5K",
        thumbnail: "/course-school-bg.svg",
        author: "Дмитрий Сидоров",
    },
    {
        id: 4,
        title: "CSS Grid на практике",
        duration: "18:30",
        views: "1.8K",
        thumbnail: "/course-school-bg.svg",
        author: "Елена Попова",
    },
];

export const VideoSection = () => {
    const [selectedVideo, setSelectedVideo] = useState<
        (typeof videos)[0] | null
    >(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(70);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const controlsTimeoutRef = useRef<NodeJS.Timeout>();

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

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && videoRef.current) {
                setIsPlaying(!videoRef.current.paused);
            }
        };

        const handleKeyPress = (e: KeyboardEvent) => {
            if (document.fullscreenElement && e.code === "Space") {
                e.preventDefault();
                togglePlay();
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [togglePlay]);

    const handleVideoSelect = (video: (typeof videos)[0]) => {
        setSelectedVideo(video);
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 2000);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const formatViews = (views: number) => {
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        }
        if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`;
        }
        return views.toString();
    };

    return (
        <div className="space-y-6">
            {/* Сетка видео */}
            {!selectedVideo && (
                <motion.div
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {videos.map((video) => (
                        <Card
                            key={video.id}
                            className="cursor-pointer group overflow-hidden"
                            onClick={() => handleVideoSelect(video)}
                        >
                            <div className="relative aspect-video">
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-sm rounded">
                                    {video.duration}
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex gap-3">
                                    <Image
                                        src={video.author.avatar}
                                        alt={video.author.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full w-10 h-10 object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold line-clamp-2">
                                            {video.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {video.author.name}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span>
                                                {formatViews(video.views)}{" "}
                                                просмотров
                                            </span>
                                            <span>•</span>
                                            <span>
                                                {new Date(
                                                    video.uploadDate
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </motion.div>
            )}

            {/* Полноэкранный просмотр видео */}
            {selectedVideo && (
                <motion.div className="fixed inset-0 bg-background z-50">
                    {/* ПК версия */}
                    <div className="hidden lg:flex h-full flex-col">
                        <div className="h-full flex flex-col">
                            {/* Верхняя панель */}
                            <div className="flex items-center p-4 border-b">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSelectedVideo(null)}
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                                <h2 className="ml-4 font-semibold line-clamp-1">
                                    {selectedVideo.title}
                                </h2>
                            </div>

                            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                                {/* Основная область с видео */}
                                <div className="flex-1 overflow-y-auto">
                                    {/* Видеоплеер */}
                                    <div
                                        className="relative group"
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={() =>
                                            setShowControls(false)
                                        }
                                    >
                                        <video
                                            ref={videoRef}
                                            src={selectedVideo.videoUrl}
                                            className="w-full aspect-video bg-black"
                                            onClick={togglePlay}
                                            onTimeUpdate={() => {
                                                if (videoRef.current) {
                                                    setCurrentTime(
                                                        videoRef.current
                                                            .currentTime
                                                    );
                                                }
                                            }}
                                            onLoadedMetadata={() => {
                                                if (videoRef.current) {
                                                    setDuration(
                                                        videoRef.current
                                                            .duration
                                                    );
                                                }
                                            }}
                                            onEnded={() => setIsPlaying(false)}
                                        />

                                        {/* Оверлей с контролами */}
                                        <AnimatePresence>
                                            {(showControls || !isPlaying) && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                                                >
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-4">
                                                        <Slider
                                                            value={[
                                                                currentTime,
                                                            ]}
                                                            max={duration}
                                                            step={1}
                                                            className="w-full"
                                                            onValueChange={(
                                                                value
                                                            ) => {
                                                                if (
                                                                    videoRef.current
                                                                ) {
                                                                    videoRef.current.currentTime =
                                                                        value[0];
                                                                    setCurrentTime(
                                                                        value[0]
                                                                    );
                                                                }
                                                            }}
                                                        />

                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-white hover:bg-white/20"
                                                                    onClick={
                                                                        togglePlay
                                                                    }
                                                                >
                                                                    {isPlaying ? (
                                                                        <Pause className="h-6 w-6" />
                                                                    ) : (
                                                                        <Play className="h-6 w-6" />
                                                                    )}
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-white hover:bg-white/20"
                                                                    onClick={() => {
                                                                        if (
                                                                            videoRef.current
                                                                        ) {
                                                                            videoRef.current.currentTime += 10;
                                                                        }
                                                                    }}
                                                                >
                                                                    <SkipForward className="h-5 w-5" />
                                                                </Button>
                                                                <div className="flex items-center gap-2">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="text-white hover:bg-white/20"
                                                                        onClick={() => {
                                                                            setIsMuted(
                                                                                !isMuted
                                                                            );
                                                                            if (
                                                                                videoRef.current
                                                                            ) {
                                                                                videoRef.current.muted =
                                                                                    !isMuted;
                                                                            }
                                                                        }}
                                                                    >
                                                                        {isMuted ? (
                                                                            <VolumeX className="h-5 w-5" />
                                                                        ) : (
                                                                            <Volume2 className="h-5 w-5" />
                                                                        )}
                                                                    </Button>
                                                                    <Slider
                                                                        value={[
                                                                            isMuted
                                                                                ? 0
                                                                                : volume,
                                                                        ]}
                                                                        max={
                                                                            100
                                                                        }
                                                                        step={1}
                                                                        className="w-24"
                                                                        onValueChange={(
                                                                            value
                                                                        ) => {
                                                                            setVolume(
                                                                                value[0]
                                                                            );
                                                                            setIsMuted(
                                                                                value[0] ===
                                                                                    0
                                                                            );
                                                                            if (
                                                                                videoRef.current
                                                                            ) {
                                                                                videoRef.current.volume =
                                                                                    value[0] /
                                                                                    100;
                                                                                videoRef.current.muted =
                                                                                    value[0] ===
                                                                                    0;
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                                <span className="text-sm text-white">
                                                                    {formatTime(
                                                                        currentTime
                                                                    )}{" "}
                                                                    /{" "}
                                                                    {formatTime(
                                                                        duration
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-white hover:bg-white/20"
                                                                >
                                                                    <Settings className="h-5 w-5" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-white hover:bg-white/20"
                                                                    onClick={() => {
                                                                        if (
                                                                            !document.fullscreenElement
                                                                        ) {
                                                                            videoRef.current?.requestFullscreen();
                                                                        } else {
                                                                            document.exitFullscreen();
                                                                        }
                                                                    }}
                                                                >
                                                                    <Maximize2 className="h-5 w-5" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Информация о видео */}
                                    <div className="p-4 space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                            <div>
                                                <h1 className="text-xl sm:text-2xl font-semibold">
                                                    {selectedVideo.title}
                                                </h1>
                                                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
                                                    <span>
                                                        {formatViews(
                                                            selectedVideo.views
                                                        )}{" "}
                                                        просмотров
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                        {new Date(
                                                            selectedVideo.uploadDate
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <Button className="gap-2">
                                                    <ThumbsUp className="h-5 w-5" />
                                                    <span>
                                                        {selectedVideo.likes}
                                                    </span>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="gap-2"
                                                >
                                                    <Share2 className="h-5 w-5" />
                                                    <span className="hidden sm:inline">
                                                        Поделиться
                                                    </span>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                >
                                                    <BookmarkPlus className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Информация об авторе */}
                                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                                            <div className="flex items-center gap-4">
                                                <Image
                                                    src={
                                                        selectedVideo.author
                                                            .avatar
                                                    }
                                                    alt={
                                                        selectedVideo.author
                                                            .name
                                                    }
                                                    width={48}
                                                    height={48}
                                                    className="rounded-full w-12 h-12 object-cover"
                                                />
                                                <div>
                                                    <h3 className="font-semibold">
                                                        {
                                                            selectedVideo.author
                                                                .name
                                                        }
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {
                                                            selectedVideo.author
                                                                .subscribers
                                                        }{" "}
                                                        подписчиков
                                                    </p>
                                                </div>
                                            </div>
                                            <Button>Подписаться</Button>
                                        </div>

                                        {/* Описание */}
                                        <Card className="p-4">
                                            <p className="whitespace-pre-line">
                                                {selectedVideo.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {selectedVideo.tags.map(
                                                    (tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="secondary"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    )
                                                )}
                                            </div>
                                        </Card>
                                    </div>
                                </div>

                                {/* Боковая панель с рекомендациями */}
                                <div className="border-t lg:border-t-0 lg:border-l lg:w-[400px] h-[300px] lg:h-auto">
                                    <ScrollArea className="h-full">
                                        <div className="p-4 space-y-4">
                                            <h3 className="font-semibold mb-4">
                                                Похожие видео
                                            </h3>
                                            {relatedVideos.map((video) => (
                                                <div
                                                    key={video.id}
                                                    className="flex gap-3 cursor-pointer hover:bg-muted rounded-lg p-2"
                                                    onClick={() =>
                                                        handleVideoSelect(
                                                            videos.find(
                                                                (v) =>
                                                                    v.id ===
                                                                    video.id
                                                            )!
                                                        )
                                                    }
                                                >
                                                    <div className="relative w-40 aspect-video rounded-lg overflow-hidden">
                                                        <Image
                                                            src={
                                                                video.thumbnail
                                                            }
                                                            alt={video.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 text-white text-xs rounded">
                                                            {video.duration}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium line-clamp-2">
                                                            {video.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            {video.author}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {video.views}{" "}
                                                            просмотров
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Мобильная версия */}
                    <div className="lg:hidden h-full flex flex-col">
                        {/* Видеоплеер */}
                        <div className="relative aspect-video bg-black">
                            <video
                                ref={videoRef}
                                src={selectedVideo.videoUrl}
                                className="w-full aspect-video bg-black"
                                onClick={togglePlay}
                                onTimeUpdate={() => {
                                    if (videoRef.current) {
                                        setCurrentTime(
                                            videoRef.current.currentTime
                                        );
                                    }
                                }}
                                onLoadedMetadata={() => {
                                    if (videoRef.current) {
                                        setDuration(videoRef.current.duration);
                                    }
                                }}
                                onEnded={() => setIsPlaying(false)}
                            />
                        </div>

                        {/* Скроллируемый контент */}
                        <ScrollArea className="flex-1">
                            <div className="p-4 space-y-4">
                                {/* Заголовок и базовая информация */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h1 className="text-lg font-semibold">
                                            {selectedVideo.title}
                                        </h1>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span>
                                                {formatViews(
                                                    selectedVideo.views
                                                )}{" "}
                                                просмотров
                                            </span>
                                            <span>•</span>
                                            <span>
                                                {new Date(
                                                    selectedVideo.uploadDate
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setSelectedVideo(null)}
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </Button>
                                </div>

                                {/* Кнопки действий */}
                                <div className="flex items-center justify-between py-2">
                                    <Button className="gap-2">
                                        <ThumbsUp className="h-5 w-5" />
                                        <span>{selectedVideo.likes}</span>
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Share2 className="h-5 w-5" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <BookmarkPlus className="h-5 w-5" />
                                    </Button>
                                </div>

                                {/* Информация об авторе и описание */}
                                <Collapsible>
                                    <CollapsibleTrigger asChild>
                                        <div className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={
                                                            selectedVideo.author
                                                                .avatar
                                                        }
                                                        alt={
                                                            selectedVideo.author
                                                                .name
                                                        }
                                                    />
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">
                                                        {
                                                            selectedVideo.author
                                                                .name
                                                        }
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {
                                                            selectedVideo.author
                                                                .subscribers
                                                        }{" "}
                                                        подписчиков
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronDown className="h-5 w-5" />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="mt-4 space-y-2">
                                            <p className="text-sm">
                                                {selectedVideo.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedVideo.tags.map(
                                                    (tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="secondary"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>

                                {/* Разделитель */}
                                <Separator className="my-4" />

                                {/* Рекомендованные видео */}
                                <div className="space-y-4">
                                    <h3 className="font-medium">
                                        Похожие видео
                                    </h3>
                                    {relatedVideos.map((video) => (
                                        <div
                                            key={video.id}
                                            className="flex gap-3 cursor-pointer"
                                            onClick={() =>
                                                handleVideoSelect(
                                                    videos.find(
                                                        (v) => v.id === video.id
                                                    )!
                                                )
                                            }
                                        >
                                            <div className="relative w-40 aspect-video rounded-lg overflow-hidden">
                                                <Image
                                                    src={video.thumbnail}
                                                    alt={video.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 text-white text-xs rounded">
                                                    {video.duration}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium line-clamp-2">
                                                    {video.title}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    {video.author}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {video.views} просмотров
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
