/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Вмикаємо пусту конфігурацію Turbopack, щоб заглушити помилку Webpack
  turbopack: {},
};

export default nextConfig;

