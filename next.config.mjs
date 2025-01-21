/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "images.unsplash.com",
            "plus.unsplash.com",
            "cdn.jsdelivr.net",
            "raw.githubusercontent.com",
            "cdn.iconscout.com",
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
        ],
    },
};

export default nextConfig;
