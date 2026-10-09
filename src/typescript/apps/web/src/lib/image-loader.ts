import type { ImageLoaderProps } from "next/image";

// A static export has no image-optimisation server, so `next/image` resolves
// each srcset width to a variant that `scripts/generate-images.ts` wrote at
// build time. Both sides read the same widths and quality from here.
export const imageDeviceSizes = [640, 960, 1280, 1440] as const;
export const imageSizes = [320] as const;
export const imageQuality = 75;

export const imageVariantPath = (src: string, width: number) =>
  src.replace(/\.[a-z0-9]+$/i, `-${width}w.webp`);

export default function imageLoader({ src, width }: ImageLoaderProps) {
  return imageVariantPath(src, width);
}
