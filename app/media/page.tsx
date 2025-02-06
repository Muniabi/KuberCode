import { Metadata } from "next";
import MediaContent from "./media-content";

export const metadata: Metadata = {
    title: "Kuber Code | Медиа",
    description: "Блог, подкасты и видео об IT и программировании",
};

export default function MediaPage({
    searchParams,
}: {
    searchParams: { tab?: string };
}) {
    return <MediaContent />;
}
