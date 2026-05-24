/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: false, // Desactiva la optimización de CSS para evitar problemas con estilos dinámicos
  },
}

module.exports = nextConfig
