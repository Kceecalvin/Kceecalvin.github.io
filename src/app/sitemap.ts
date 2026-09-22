import type { MetadataRoute } from "next";
import { profile, projects, articles } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/work",
    "/contact",
    "/cv",
    "/insights",
    ...projects.map((p) => `/work/${p.slug}`),
    ...articles.map((a) => `/insights/${a.slug}`),
  ].map((path) => ({ url: `${profile.site}${path}` }));
}
