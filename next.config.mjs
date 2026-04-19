/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  basePath: "/Alice-zhao-portfolio",
  assetPrefix: "/Alice-zhao-portfolio/",
};

export default nextConfig;