import type { PublicVehicle } from "@/lib/types";

export async function fetchPublicVehicles(): Promise<PublicVehicle[]> {
  const res = await fetch("/api/catalog/vehicles", { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Falha ao carregar catálogo (HTTP ${res.status})`);
  }
  return (await res.json()) as PublicVehicle[];
}

export function buildWhatsAppLink(params: { model?: string } = {}) {
  const text = params.model
    ? `Olá! vi a ${params.model} no catálogo e gostaria de saber o preço e condições de financiamento.`
    : "Olá! vi o catálogo da Al Motos e gostaria de falar com um vendedor.";
  const base =
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    "https://api.whatsapp.com/message/B33EE6VD6SMLA1?autoload=1&app_absent=0&utm_source=ig";
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}text=${encodeURIComponent(text)}`;
}
