/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol : "https",
        hostname : "lh3.googleusercontent.com",
        port : ""
      }
    ]
  }
}

module.exports = nextConfig
