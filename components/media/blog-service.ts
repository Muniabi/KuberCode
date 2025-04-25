import { Article } from "./types";

interface ArticlesResponse {
    articles: Article[];
    total: number;
    pagesCount: number;
    categories: string[];
    sources: string[];
    categorizedArticles?: Record<string, Article[]>;
}

interface FetchArticlesOptions {
    page?: number;
    perPage?: number;
    category?: string;
    sources?: string[];
    query?: string;
}

const DEFAULT_OPTIONS: Required<
    Pick<FetchArticlesOptions, "page" | "perPage">
> = {
    page: 1,
    perPage: 10,
};

export const fetchArticles = async (
    options: FetchArticlesOptions = {}
): Promise<ArticlesResponse> => {
    try {
        const { page, perPage, category } = {
            ...DEFAULT_OPTIONS,
            ...options,
        };

        const params = new URLSearchParams({
            page: String(page),
            perPage: String(perPage),
        });

        if (category) {
            params.append("tag", category);
        }

        const response = await fetch(`/api/news?${params.toString()}`);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error:", errorData);
            throw new Error(errorData.details || "Failed to fetch articles");
        }

        const data = await response.json();
        console.log("API Response:", data);

        return {
            articles: data.articles,
            total: data.total,
            pagesCount: data.pagesCount,
            categories: Object.keys(data.categorizedArticles || {}),
            sources: ["devto"],
            categorizedArticles: data.categorizedArticles,
        };
    } catch (error) {
        console.error("Error fetching articles:", error);
        return {
            articles: [],
            total: 0,
            pagesCount: 0,
            categories: [],
            sources: ["devto"],
            categorizedArticles: {},
        };
    }
};

export const searchArticles = async (
    query: string,
    options: FetchArticlesOptions = {}
): Promise<ArticlesResponse> => {
    try {
        const { page, perPage } = { ...DEFAULT_OPTIONS, ...options };

        const params = new URLSearchParams({
            page: String(page),
            perPage: String(perPage),
            query: query,
        });

        const response = await fetch(`/api/news?${params.toString()}`);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error:", errorData);
            throw new Error(errorData.details || "Failed to search articles");
        }

        const data = await response.json();
        console.log("API Response:", data);

        return {
            articles: data.articles,
            total: data.total,
            pagesCount: data.pagesCount,
            categories: Object.keys(data.categorizedArticles || {}),
            sources: ["devto"],
            categorizedArticles: data.categorizedArticles,
        };
    } catch (error) {
        console.error("Error searching articles:", error);
        return {
            articles: [],
            total: 0,
            pagesCount: 0,
            categories: [],
            sources: ["devto"],
            categorizedArticles: {},
        };
    }
};
