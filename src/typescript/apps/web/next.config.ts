import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

import { imageDeviceSizes, imageQuality, imageSizes } from "./src/lib/image-loader";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["@marcusinthesky/content", "@marcusinthesky/ui"],
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [...imageDeviceSizes],
    imageSizes: [...imageSizes],
    qualities: [imageQuality],
  },
};

export default withMDX(nextConfig);
