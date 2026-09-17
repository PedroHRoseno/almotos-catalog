import type { PublicVehicle } from "@/lib/types";
import { formatBRL } from "@/lib/vehicle";
import { COMPANY_LINKS } from "@/lib/company";

export async function fetchPublicVehicles(): Promise<PublicVehicle[]> {
  const res = await fetch("/api/catalog/vehicles", { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Falha ao carregar catálogo (HTTP ${res.status})`);
  }
  return (await res.json()) as PublicVehicle[];
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

/**
 * Links únicos `api.whatsapp.com/message/CODE` (clique do Instagram) 404/400
 * se ganharem `text=` extra — e o código em si também pode expirar.
 * Extraímos o telefone de wa.me /send e caímos no número da loja.
 */
function whatsappPhone() {
  const configured = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim();
  if (configured) {
    try {
      const url = new URL(configured);
      const fromQuery = url.searchParams.get("phone");
      if (fromQuery && digitsOnly(fromQuery).length >= 10) {
        return digitsOnly(fromQuery);
      }
      if (!url.pathname.includes("/message/")) {
        const fromPath = url.pathname.match(/(\d{10,15})/);
        if (fromPath) return fromPath[1];
      }
    } catch {
      const raw = digitsOnly(configured);
      if (raw.length >= 10 && raw.length <= 15) return raw;
    }
  }
  return digitsOnly(COMPANY_LINKS.phone);
}

export function buildWhatsAppLink(params: {
  model?: string;
  suggestedPrice?: number | null;
  text?: string;
} = {}) {
  // Evitar "vendedor"/"atendente"/"financiamento": o bot do Chatwoot faz handoff
  // imediato nessas palavras. A abertura precisa deixar a IA buscar o estoque.
  let text =
    params.text ??
    "Olá! Vi o catálogo da Al Motos e gostaria de ver as motos disponíveis.";
  if (!params.text && params.model && params.suggestedPrice != null) {
    text = `Olá! Vi a ${params.model} no catálogo da Al Motos por ${formatBRL(params.suggestedPrice)} e gostaria de saber se ainda está disponível.`;
  } else if (!params.text && params.model) {
    text = `Olá! Vi a ${params.model} no catálogo da Al Motos e gostaria de saber se ainda está disponível e qual o valor.`;
  }
  return `https://wa.me/${whatsappPhone()}?text=${encodeURIComponent(text)}`;
}
