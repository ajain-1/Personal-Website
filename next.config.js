/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
    minimumCacheTTL: 2592000,
  },
  async redirects() {
    return [
      {
        source: "/aq-project",
        destination: "https://taskgen.54-186-98-155.sslip.io",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
