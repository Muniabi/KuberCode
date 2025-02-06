import { Metadata } from "next";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { videos } from "@/lib/data/videos";

type Props = {
    params: {
        id: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const video = videos.find((v) => v.id.toString() === params.id);

    return {
        title: video ? `${video.title} | Kuber Code` : "Видео | Kuber Code",
        description: video?.description,
    };
}

export default function VideoPage({ params }: Props) {
    const video = videos.find((v) => v.id.toString() === params.id);

    if (!video) {
        return <div>Видео не найдено</div>;
    }

    return <VideoPlayer video={video} />;
}
