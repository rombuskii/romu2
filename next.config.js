/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com", "gogocdn.net"]
  },
  reactStrictMode: true,
}

module.exports = nextConfig
