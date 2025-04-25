import { Metadata } from "next";
import MediaContent from "./media-content";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Kuber Code | Медиа-центр",
    description: "Актуальные новости и статьи из мира IT",
};

export default function MediaPage({
    searchParams,
}: {
    searchParams: { section?: string };
}) {
    return (
        <Suspense>
            <MediaContent />
        </Suspense>
    );
}
