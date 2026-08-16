import type { PublicVehicle } from "@/lib/types";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function withSlugs(vehicles: PublicVehicle[]): PublicVehicle[] {
  const used = new Set<string>();
  return vehicles.map((v) => {
    if (v.slug && !used.has(v.slug)) {
      used.add(v.slug);
      return v;
    }
    let slug = [slugify(v.brand), slugify(v.model), String(v.year)]
      .filter(Boolean)
      .join("-") || "moto";
    let n = 2;
    while (used.has(slug)) slug = `${slugify(v.model)}-${v.year}-${n++}`;
    used.add(slug);
    return { ...v, slug };
  });
}

export async function getCatalogVehicles(): Promise<PublicVehicle[]> {
  const ai = process.env.ALMOTOS_AI_URL?.replace(/\/+$/, "");
  if (!ai) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ALMOTOS_AI_URL é obrigatória em produção (ADR-003)");
    }
  } else {
    const res = await fetch(`${ai}/v1/inventory`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`Falha ao carregar catálogo (HTTP ${res.status})`);
    }
    return (await res.json()) as PublicVehicle[];
  }

  const kotlin = (
    process.env.KOTLIN_BASE_URL || "http://localhost:8080"
  ).replace(/\/+$/, "");
  const res = await fetch(`${kotlin}/api/public/vehicles`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Falha ao carregar catálogo (HTTP ${res.status})`);
  }
  const raw = (await res.json()) as PublicVehicle[];
  return withSlugs(raw);
}

export async function getCatalogVehicle(
  slug: string
): Promise<PublicVehicle | null> {
  const ai = process.env.ALMOTOS_AI_URL?.replace(/\/+$/, "");
  if (!ai) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ALMOTOS_AI_URL é obrigatória em produção (ADR-003)");
    }
  } else {
    const res = await fetch(`${ai}/v1/inventory/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`Falha ao carregar moto (HTTP ${res.status})`);
    }
    return (await res.json()) as PublicVehicle;
  }

  const vehicles = await getCatalogVehicles();
  return vehicles.find((v) => v.slug === slug) ?? null;
}
