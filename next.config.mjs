/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "yorunoken.s-ul.eu" },
            { hostname: "cdn.discordapp.com" },
            { hostname: "raw.githubusercontent.com" },
        ],
    },
};

export default nextConfig;
