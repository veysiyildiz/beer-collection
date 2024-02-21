/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.punkapi.com" },
      { hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
