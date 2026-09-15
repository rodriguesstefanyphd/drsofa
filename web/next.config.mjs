/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportação estática: estas páginas não têm backend nenhum. Ficam ficheiros
  // soltos, que a Cloudflare Pages serve da rede dela — mais rápido, e a
  // velocidade entra no Índice de Qualidade do Google Ads.
  output: 'export',
  trailingSlash: true,
  // Sem servidor não há otimizador de imagens; as imagens já vão comprimidas.
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
