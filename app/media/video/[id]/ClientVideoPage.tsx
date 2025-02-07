"use client";

import { VideoPlayer } from "@/components/media/VideoPlayer";
import { Toaster } from "@/components/ui/toaster";
import { videos } from "@/lib/data/videos";

export default function ClientVideoPage({ videoId }: { videoId: string }) {
    const video = videos.find((v) => v.id.toString() === videoId);

    if (!video) {
        return <div>Видео не найдено</div>;
    }

    return (
        <>
            <VideoPlayer video={video} />
            <Toaster />
        </>
    );
}
