"use client";

import { useState, useRef } from "react";
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
} from "lucide-react";
import Image from "next/image";

const videos = [
    {
        id: 1,
        title: "Введение в React: основы и хуки",
        description:
            "Подробный разбор основ React и работы с хуками. Изучим useState, useEffect и другие важные концепции.",
        thumbnail: "/videos/thumbnails/react-intro.jpg",
        videoUrl: "/BMW M8 Gran Coupe Venom.mp4",
        duration: "12:30",
        views: 1234,
        likes: 423,
        comments: 56,
        author: {
            name: "Александр Петров",
            avatar: "/avatars/alex.jpg",
            subscribers: "10.2K",
        },
        tags: ["React", "Frontend", "JavaScript"],
        uploadDate: "2024-01-15",
    },
    {
        id: 2,
        title: "TypeScript для начинающих",
        description: "Базовые концепции TypeScript, типы данных и интерфейсы",
        thumbnail: "/videos/thumbnails/typescript.jpg",
        videoUrl: "/Akrapovic BMW M5 Stingray.mp4",
        duration: "15:45",
        views: 2300,
        likes: 567,
        comments: 89,
        author: {
            name: "Мария Иванова",
            avatar: "/avatars/maria.jpg",
            subscribers: "8.5K",
        },
        tags: ["TypeScript", "Frontend", "JavaScript"],
        uploadDate: "2024-01-20",
    },
    {
        id: 3,
        title: "Next.js 14: Что нового?",
        description: "Обзор новых возможностей Next.js 14 и Server Components",
        thumbnail: "/videos/thumbnails/nextjs.jpg",
        videoUrl: "/IMG_3434.MP4",
        duration: "20:15",
        views: 3500,
        likes: 890,
        comments: 145,
        author: {
            name: "Дмитрий Сидоров",
            avatar: "/avatars/dmitry.jpg",
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
        thumbnail: "/videos/thumbnails/typescript.jpg",
        author: "Мария Иванова",
    },
    {
        id: 3,
        title: "Next.js 14: Что нового?",
        duration: "20:15",
        views: "3.5K",
        thumbnail: "/videos/thumbnails/nextjs.jpg",
        author: "Дмитрий Сидоров",
    },
    {
        id: 4,
        title: "CSS Grid на практике",
        duration: "18:30",
        views: "1.8K",
        thumbnail: "/videos/thumbnails/css-grid.jpg",
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

    const handleVideoSelect = (video: (typeof videos)[0]) => {
        setSelectedVideo(video);
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
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
                                        className="rounded-full"
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
                <motion.div
                    className="fixed inset-0 bg-background z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
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
                            <h2 className="ml-4 font-semibold">
                                {selectedVideo.title}
                            </h2>
                        </div>

                        <div className="flex-1 flex overflow-hidden">
                            {/* Основная область с видео */}
                            <div className="flex-1 overflow-y-auto">
                                {/* Видеоплеер */}
                                <div
                                    className="relative group"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={() => setShowControls(false)}
                                >
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
                                                setDuration(
                                                    videoRef.current.duration
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
                                                        value={[currentTime]}
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
                                                                    max={100}
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
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h1 className="text-2xl font-semibold">
                                                {selectedVideo.title}
                                            </h1>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
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
                                        <div className="flex items-center gap-2">
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
                                                Поделиться
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                            >
                                                <BookmarkPlus className="h-5 w-5" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Информация об авторе */}
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={
                                                    selectedVideo.author.avatar
                                                }
                                                alt={selectedVideo.author.name}
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                            />
                                            <div>
                                                <h3 className="font-semibold">
                                                    {selectedVideo.author.name}
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
                                            {selectedVideo.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </Card>
                                </div>
                            </div>

                            {/* Боковая панель с рекомендациями */}
                            <div className="w-[400px] border-l">
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
                                </ScrollArea>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
