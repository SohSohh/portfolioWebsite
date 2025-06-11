/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NODE_ENV === 'production' ? '/portfolioWebsite' : '',
    trailingSlash: true,
};

export default nextConfig;
