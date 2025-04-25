import { NextResponse } from "next/server";

interface Article {
    id: string;
    title: string;
    description: string;
    link?: string;
    url?: string;
    pubDate: string;
    author: {
        name: string;
        avatar: string;
    };
    categories?: string[];
    category?: string;
    image: string;
    source: string;
    reactions?: number;
    comments?: number;
}

// Категории для маппинга
const CATEGORY_MAPPING: Record<string, string[]> = {
    programming: [
        "programming",
        "development",
        "coding",
        "javascript",
        "python",
        "java",
        "typescript",
    ],
    web: ["frontend", "backend", "web", "react", "vue", "angular", "node"],
    mobile: ["android", "ios", "mobile", "flutter", "react-native"],
    devops: ["devops", "docker", "kubernetes", "aws", "cloud"],
    ai: [
        "ai",
        "machine-learning",
        "data-science",
        "deep-learning",
        "neural-networks",
    ],
    security: ["security", "cybersecurity", "hacking", "encryption", "pentest"],
};

const DEV_TO_API_URL = "https://dev.to/api/articles";

async function fetchFromDevTo(page: number, perPage: number, tag?: string) {
    const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
        state: "rising",
    });

    if (tag && tag !== "all") {
        params.append("tag", tag);
    }

    const url = `${DEV_TO_API_URL}?${params.toString()}`;
    console.log("Fetching from Dev.to:", url);

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
        categories: article.tag_list || [],
        category: article.tag_list?.[0] || "",
        image:
            article.cover_image ||
            article.social_image ||
            "/default-article.jpg",
        source: "devto",
        reactions: article.public_reactions_count,
        comments: article.comments_count,
    }));

    // Группируем статьи по категориям
    const categorizedArticles = formattedArticles.reduce(
        (acc: Record<string, any[]>, article: any) => {
            if (article.categories && Array.isArray(article.categories)) {
                article.categories.forEach((category: string) => {
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(article);
                });
            }
            return acc;
        },
        {}
    );

    return {
        articles: formattedArticles,
        total: parseInt(
            response.headers.get("X-Total-Count") ||
                formattedArticles.length.toString()
        ),
        pagesCount: Math.ceil(formattedArticles.length / perPage),
        categorizedArticles,
    };
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const perPage = parseInt(searchParams.get("perPage") || "10");
        const tag = searchParams.get("tag") || undefined;

        console.log("Request params:", { page, perPage, tag });

        const data = await fetchFromDevTo(page, perPage, tag);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in news aggregator:", error);
        return NextResponse.json(
            {
                error: "Failed to fetch news",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

// Список языков программирования для GitHub
const PROGRAMMING_LANGUAGES = {
    javascript: true,
    typescript: true,
    python: true,
    java: true,
    go: true,
    rust: true,
    cpp: true,
    csharp: true,
    php: true,
    ruby: true,
    swift: true,
    kotlin: true,
};
