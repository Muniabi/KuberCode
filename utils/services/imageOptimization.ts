import { ImageLoaderProps } from "next/image";

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    // Базовый URL для CDN или оптимизации изображений
    const baseURL = process.env.NEXT_PUBLIC_IMAGE_DOMAIN || "";

    // Если изображение уже оптимизировано или внешнее, возвращаем его как есть
    if (src.startsWith("http") || src.startsWith("data:")) {
        return src;
    }

    // Добавляем параметры оптимизации
    const params = new URLSearchParams({
        w: width.toString(),
        q: (quality || 75).toString(),
        auto: "format,compress",
    });

    return `${baseURL}${src}?${params.toString()}`;
};

export const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <linearGradient id="g">
                <stop stop-color="#f6f7f8" offset="0%" />
                <stop stop-color="#edeef1" offset="20%" />
                <stop stop-color="#f6f7f8" offset="40%" />
                <stop stop-color="#f6f7f8" offset="70%" />
            </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#f6f7f8" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
    </svg>
`;

export const toBase64 = (str: string) =>
    typeof window === "undefined"
        ? Buffer.from(str).toString("base64")
        : window.btoa(str);
