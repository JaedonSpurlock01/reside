/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ssl.cdn-redfin.com", "aceternity.com"],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
