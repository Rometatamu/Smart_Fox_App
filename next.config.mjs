/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    SERVER_URL: "https://smart-fox-api.onrender.com",
    JWT_KEY: "fox_app_jwt",
  },
};

export default nextConfig;
