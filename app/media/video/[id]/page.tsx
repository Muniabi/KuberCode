import { Metadata } from "next";
import { videos } from "@/lib/data/videos";
import ClientVideoPage from "./ClientVideoPage";

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
    return <ClientVideoPage videoId={params.id} />;
}
