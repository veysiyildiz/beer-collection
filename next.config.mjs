/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { hostname: "images.punkapi.com" },
      { hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
