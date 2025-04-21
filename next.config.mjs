/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "images.unsplash.com",
            "plus.unsplash.com",
            "cdn.jsdelivr.net",
            "raw.githubusercontent.com",
            "cdn.iconscout.com",
            "storage.yandexcloud.net",
        ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.iconscout.com",
                pathname: "/icon/**",
            },
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "cdn.jsdelivr.net",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "storage.yandexcloud.net",
                pathname: "/kuber-code/**",
            },
        ],
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
        minimumCacheTTL: 60,
    },
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    experimental: {
        optimizeCss: true,
        optimizePackageImports: [
            "@mui/icons-material",
            "@mui/material",
            "framer-motion",
        ],
    },
    webpack: (config) => {
        // Оптимизация медиафайлов
        config.module.rules.push({
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            type: "asset/resource",
            generator: {
                filename: "static/media/[name].[hash][ext]",
            },
        });
        return config;
    },
    headers: async () => {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "origin-when-cross-origin",
                    },
                ],
            },
            {
                source: "/fonts/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/images/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=86400, must-revalidate",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
