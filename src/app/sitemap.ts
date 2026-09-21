import type { MetadataRoute } from "next";
import { getCatalogVehicles } from "@/lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://almotoscaruaru.com.br"
  ).replace(/\/+$/, "");

  
  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    {
      url: `${base}/estoque`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  try {
    const vehicles = await getCatalogVehicles();
    for (const v of vehicles) {
      entries.push({
        url: `${base}/motos/${v.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    }
  } catch {
    /* sitemap still publishes the home */
  }

  return entries;
}
