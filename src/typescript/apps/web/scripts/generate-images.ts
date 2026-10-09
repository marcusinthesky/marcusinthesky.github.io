import { mkdir, readdir, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

import sharp from "sharp";

import {
  imageDeviceSizes,
  imageQuality,
  imageSizes,
  imageVariantPath,
} from "../src/lib/image-loader";

// Source rasters live in `images/` and are served from `/images/...` as
// resized WebP variants. Components reference the source path; the custom
// `next/image` loader maps each srcset width to its variant.
const sourceDir = join(import.meta.dir, "..", "images");
const outDir = join(import.meta.dir, "..", "public", "images");
const widths = [...imageSizes, ...imageDeviceSizes];

const isRaster = (name: string) => /\.(avif|jpe?g|png|webp)$/i.test(name);

const sources = (await readdir(sourceDir, { recursive: true })).filter(isRaster);

const isFresh = async (source: string, target: string) => {
  try {
    return (await stat(target)).mtimeMs >= (await stat(source)).mtimeMs;
  } catch {
    return false;
  }
};

let written = 0;
await Promise.all(
  sources.flatMap((name) =>
    widths.map(async (width) => {
      const source = join(sourceDir, name);
      const target = join(outDir, imageVariantPath(name, width));
      if (await isFresh(source, target)) return;
      await mkdir(dirname(target), { recursive: true });
      await sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: imageQuality })
        .toFile(target);
      written += 1;
    }),
  ),
);

console.log(
  `Image variants: ${written} written, ${sources.length * widths.length - written} fresh (${relative(process.cwd(), outDir)}).`,
);
