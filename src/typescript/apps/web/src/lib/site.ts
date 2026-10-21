export const site = {
  name: "Marcus Gawronsky",
  title: "Marcus Gawronsky — Research made operational",
  description:
    "Marcus Gawronsky is a Cape Town-based quantitative researcher and AI founder working across financial econometrics, machine learning and research engineering.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcusinthesky.github.io").replace(/\/$/, ""),
} as const;

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
