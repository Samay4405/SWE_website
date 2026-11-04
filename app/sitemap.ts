import type { MetadataRoute } from "next";
import { events } from "@/content/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://swe-mitwpu.vercel.app";

  const staticRoutes = [
    "",
    "/events",
    "/team",
    "/impact",
    "/gallery",
    "/contact",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const eventRoutes = events.map((event) => ({
    url: `${base}/events/${event.slug}`,
    lastModified: new Date(event.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes];
}
