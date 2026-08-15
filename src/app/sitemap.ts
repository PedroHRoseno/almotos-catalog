import type { MetadataRoute } from "next";
import { getCatalogVehicles } from "@/lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://catalogo.almotoscaruaru.com.br"
  ).replace(/\/+$/, "");

  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
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
