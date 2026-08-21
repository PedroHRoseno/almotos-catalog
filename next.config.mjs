/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Virtual-hosted clássico: bucket.s3.amazonaws.com (uploads Kotlin)
      { protocol: "https", hostname: "*.s3.amazonaws.com" },
      // Regional FastAPI: bucket.s3.us-east-1.amazonaws.com
      { protocol: "https", hostname: "*.s3.*.amazonaws.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "**.amazonaws.com.cn" },
      { protocol: "https", hostname: "**.cloudfront.net" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
