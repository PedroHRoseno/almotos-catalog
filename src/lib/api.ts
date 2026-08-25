import type { PublicVehicle } from "@/lib/types";
import { formatBRL } from "@/lib/vehicle";

export async function fetchPublicVehicles(): Promise<PublicVehicle[]> {
  const res = await fetch("/api/catalog/vehicles", { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Falha ao carregar catálogo (HTTP ${res.status})`);
  }
  return (await res.json()) as PublicVehicle[];
}

export function buildWhatsAppLink(params: {
  model?: string;
  suggestedPrice?: number | null;
} = {}) {
  let text = "Olá! Vi o catálogo da Al Motos e gostaria de falar com um vendedor.";
  if (params.model && params.suggestedPrice != null) {
    text = `Olá! Vi a ${params.model} no catálogo por ${formatBRL(params.suggestedPrice)} e gostaria de saber as condições.`;
  } else if (params.model) {
    text = `Olá! Vi a ${params.model} no catálogo e gostaria de saber o preço e condições de financiamento.`;
  }
  const base =
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    "https://api.whatsapp.com/message/B33EE6VD6SMLA1?autoload=1&app_absent=0&utm_source=ig";
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}text=${encodeURIComponent(text)}`;
}
