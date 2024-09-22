/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    SERVER_URL: "http://localhost:3002",
    JWT_KEY: "fox_app_jwt",
  },
};

export default nextConfig;
