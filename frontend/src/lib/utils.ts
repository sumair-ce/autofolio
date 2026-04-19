import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function normalizeTechStack(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getShareUrl(code: string) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

  if (siteUrl) {
    return `${siteUrl}/p/${code}`;
  }

  return `/p/${code}`;
}

export function formatViews(views: number) {
  return Intl.NumberFormat("en-US", {
    notation: views > 999 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(views);
}

export function pickProjectThumbnail(images: { url: string; is_thumbnail: boolean }[]) {
  return images.find((image) => image.is_thumbnail) ?? images[0] ?? null;
}
