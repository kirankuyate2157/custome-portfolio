/** @type {import('next').NextConfig} */
import path  from "path"
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["imgix.bustle.com","https://firebasestorage.googleapis.com", "**"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;
