export interface Article {
    id: string;
    title: string;
    description: string;
    category?: string;
    categories?: string[];
    image: string;
    pubDate: string;
    likes?: number;
    comments?: number;
    reactions?: number;
    author: {
        name: string;
        avatar: string;
    };
    url?: string;
    link?: string;
    source: string;
    stats?: {
        stars?: number;
        forks?: number;
        watchers?: number;
    };
    language?: string;
    isPrivate?: boolean;
    license?: string;
    commentsCount?: number;
}
