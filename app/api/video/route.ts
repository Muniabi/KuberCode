import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const videoUrl = url.searchParams.get("url");

    if (!videoUrl) {
        return new NextResponse("URL не указан", { status: 400 });
    }

    try {
        const response = await fetch(videoUrl);
        const blob = await response.blob();

        return new NextResponse(blob, {
            headers: {
                "Content-Type":
                    response.headers.get("Content-Type") || "video/mp4",
                "Content-Length": response.headers.get("Content-Length") || "",
                "Accept-Ranges": "bytes",
            },
        });
    } catch (error) {
        console.error("Error fetching video:", error);
        return new NextResponse("Ошибка при загрузке видео", { status: 500 });
    }
}
