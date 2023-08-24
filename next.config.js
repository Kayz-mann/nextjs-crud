/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'https://www.redditinc.com',
      'https://logoeps.com',
      'avatars.dicebear.com',
      'pbs.twimg.com'
    ],
  }
}

module.exports = nextConfig
