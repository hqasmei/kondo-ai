/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["replicate.delivery", "res.cloudinary.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
