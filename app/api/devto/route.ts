import { NextResponse } from "next/server";

const DEV_TO_API_URL = "https://dev.to/api/articles";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const perPage = parseInt(searchParams.get("perPage") || "10");
        const tag = searchParams.get("tag");

        console.log("Request params:", { page, perPage, tag });

        let url = DEV_TO_API_URL;
        const params = new URLSearchParams({
            page: page.toString(),
            per_page: perPage.toString(),
            state: "rising",
        });

        if (tag && tag !== "all") {
            params.append("tag", tag);
        }

        url += `?${params.toString()}`;

        const response = await fetch(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            next: { revalidate: 1800 }, // Кешируем на 30 минут
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch from Dev.to: ${response.status}`);
        }

        const articles = await response.json();

        // Преобразуем статьи в единый формат
        const formattedArticles = articles.map((article: any) => ({
            id: article.id.toString(),
            title: article.title,
            description: article.description || "",
            link: article.url,
            pubDate: article.published_at,
            author: {
                name: article.user.name,
                avatar: article.user.profile_image || "/default-avatar.jpg",
            },
            categories: article.tags,
            image:
                article.cover_image ||
                article.social_image ||
                "/default-article.jpg",
            source: "dev.to",
            reactions: article.public_reactions_count,
            comments: article.comments_count,
        }));

        // Получаем общее количество статей из заголовка
        const totalCount = parseInt(
            response.headers.get("X-Total-Count") || "0"
        );

        return NextResponse.json({
            articles: formattedArticles,
            total: totalCount || formattedArticles.length,
            pagesCount: Math.ceil(
                (totalCount || formattedArticles.length) / perPage
            ),
        });
    } catch (error) {
        console.error("Error fetching from Dev.to:", error);
        return NextResponse.json(
            {
                error: "Failed to fetch articles",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
