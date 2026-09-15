/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "*.notion-static.com" },
      { protocol: "https", hostname: "*.amazonaws.com" },
    ],
    // Notion's signed URLs expire hourly; keep optimized copies longer.
    minimumCacheTTL: 2592000,
  },
};

module.exports = nextConfig;
