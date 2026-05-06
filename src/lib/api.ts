import type { PublicVehicle } from "@/lib/types";

function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ||
    "http://localhost:8080"
  );
}

export async function fetchPublicVehicles(): Promise<PublicVehicle[]> {
  const url = `${getApiBaseUrl()}/api/public/vehicles`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Falha ao carregar catálogo (HTTP ${res.status})`);
  }
  return (await res.json()) as PublicVehicle[];
}

export function buildWhatsAppLink(params: { model: string }) {
  const text = `Olá! vi a ${params.model} no catálogo e gostaria de saber o preço e condições de financiamento.`;
  const base =
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    "https://api.whatsapp.com/message/B33EE6VD6SMLA1?autoload=1&app_absent=0&utm_source=ig";
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}text=${encodeURIComponent(text)}`;
}

