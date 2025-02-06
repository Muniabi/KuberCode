"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { videos } from "@/lib/data/videos";

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

interface VideoSectionProps {
    initialVideoId?: string | null;
}

// Добавляем функцию форматирования просмотров
const formatViews = (views: number): string => {
    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
};

export const VideoSection = () => {
    return (
        <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {videos.map((video) => (
                <Link
                    key={video.id}
                    href={`/media/video/${video.id}`}
                    className="cursor-pointer group"
                >
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute bottom-2 right-2 px-1 py-0.5 bg-black/80 text-white text-xs rounded">
                            {video.duration}
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="flex gap-3">
                            <Image
                                src={video.author.avatar}
                                alt={video.author.name}
                                width={40}
                                height={40}
                                className="rounded-full w-10 h-10 object-cover"
                            />
                            <div>
                                <h3 className="font-medium line-clamp-2">
                                    {video.title}
                                </h3>
                                <div className="text-sm text-gray-500 space-y-1">
                                    <p>{video.author.name}</p>
                                    <p>{formatViews(video.views)} просмотров</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </motion.div>
    );
};
