/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "ssl.cdn-redfin.com",
      "aceternity.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
