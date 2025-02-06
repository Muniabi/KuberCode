"use client";

import { useState, useRef, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    ListMusic,
    Clock,
    Share2,
} from "lucide-react";
import Image from "next/image";

const podcasts = [
    {
        id: 1,
        title: "Путь в IT: от джуна до тимлида",
        description: "История успеха и советы по построению карьеры в IT",
        duration: "45:30",
        image: "/hackaton.webp",
        date: "2024-01-20",
        author: "Мария Петрова",
        category: "Карьера",
    },
    // Добавьте больше подкастов...
];

const demoAudio = {
    url: "/OBLADAET â BRITNEY (256  kbps).mp3", // Путь к вашему демо-аудио
    title: "Путь в IT: от джуна до тимлида",
    author: "Мария Петрова",
};

export const PodcastSection = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(70);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSliderChange = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
            setCurrentTime(value[0]);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <audio
                ref={audioRef}
                src={demoAudio.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />

            {/* Плеер */}
            <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Обложка подкаста */}
                        <div className="relative w-full md:w-48 aspect-square rounded-lg overflow-hidden">
                            <Image
                                src="/hackaton.webp"
                                alt="Podcast cover"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Контролы плеера */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Сейчас играет
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {demoAudio.title}
                                </p>
                            </div>

                            {/* Прогресс-бар */}
                            <div className="space-y-2">
                                <Slider
                                    value={[currentTime]}
                                    max={duration}
                                    step={1}
                                    className="w-full"
                                    onValueChange={handleSliderChange}
                                />
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Кнопки управления */}
                            <div className="flex items-center justify-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        if (audioRef.current) {
                                            audioRef.current.currentTime -= 10;
                                        }
                                    }}
                                >
                                    <SkipBack className="h-5 w-5" />
                                </Button>
                                <Button
                                    size="icon"
                                    className="h-12 w-12 rounded-full"
                                    onClick={togglePlay}
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
                                    onClick={() => {
                                        if (audioRef.current) {
                                            audioRef.current.currentTime += 10;
                                        }
                                    }}
                                >
                                    <SkipForward className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Дополнительные контролы */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Volume2 className="h-4 w-4" />
                                    </Button>
                                    <Slider
                                        value={[volume]}
                                        max={100}
                                        step={1}
                                        className="w-24"
                                        onValueChange={(value) =>
                                            setVolume(value[0])
                                        }
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <ListMusic className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Список эпизодов */}
            <div className="grid gap-4">
                {podcasts.map((podcast) => (
                    <motion.div
                        key={podcast.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                            <CardContent className="p-4 flex gap-4">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src={podcast.image}
                                        alt={podcast.title}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="absolute inset-0 m-auto h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Play className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge
                                            variant="secondary"
                                            className="rounded-full"
                                        >
                                            {podcast.category}
                                        </Badge>
                                        <span className="text-sm text-gray-500">
                                            {new Date(
                                                podcast.date
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold mb-1">
                                        {podcast.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {podcast.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Clock className="h-4 w-4" />
                                    <span className="text-sm">
                                        {podcast.duration}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
