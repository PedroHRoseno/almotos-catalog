/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // S3 (virtual-hosted e path-style), e CDN comum (CloudFront)
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "**.amazonaws.com.cn" },
      { protocol: "https", hostname: "**.cloudfront.net" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;

