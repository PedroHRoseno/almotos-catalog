import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { shellClass } from "@/components/site-header";

export const COMPANY = {
  tradeName: "AL Motos",
  legalName: "ROSENO E SILVA COMERCIO DE VEICULOS LTDA",
  cnpj: "68.967.245/0001-26",
  street: "R Visconde de Inhauma, 725",
  neighborhood: "Mauricio de Nassau",
  city: "Caruaru - PE",
  cep: "55.012-010",
  email: "ALMOTOSCARUARU@GMAIL.COM",
  phone: "(81) 8114-6588",
} as const;

export const COMPANY_LINKS = {
  email: `mailto:${COMPANY.email.toLowerCase()}`,
  phone: "tel:+558181146588",
  maps:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      `${COMPANY.street}, ${COMPANY.neighborhood}, ${COMPANY.city}, CEP ${COMPANY.cep}`
    ),
} as const;

export function SiteFooter() {
  const address = `${COMPANY.street}, ${COMPANY.neighborhood}, ${COMPANY.city}, CEP ${COMPANY.cep}`;

  return (
    <footer className="mt-auto border-t border-line-soft/80 bg-canvas-soft">
      <div
        className={cn(
          shellClass,
          "grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr] lg:gap-12"
        )}
      >
        <div className="space-y-3">
          <p className="font-display text-sm font-bold tracking-tight text-ink">
            {COMPANY.tradeName}
          </p>
          <p className="text-sm leading-relaxed text-ink-muted">
            {COMPANY.legalName}
          </p>
          <p className="text-sm tabular-nums text-ink-subtle">
            CNPJ {COMPANY.cnpj}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-medium text-ink">Contato</p>
          <a
            href={COMPANY_LINKS.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 text-ink-muted transition-colors hover:text-ink"
          >
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <span>{address}</span>
          </a>
          <a
            href={COMPANY_LINKS.email}
            className="flex items-center gap-2 text-ink-muted transition-colors hover:text-ink"
          >
            <Mail className="size-4 shrink-0" />
            <span className="break-all">{COMPANY.email.toLowerCase()}</span>
          </a>
          <a
            href={COMPANY_LINKS.phone}
            className="flex items-center gap-2 text-ink-muted transition-colors hover:text-ink"
          >
            <Phone className="size-4 shrink-0" />
            <span className="tabular-nums">{COMPANY.phone}</span>
          </a>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-medium text-ink">Informações</p>
          <p className="text-ink-subtle">
            Financiamento em até 48x · Cartão em até 18x
          </p>
          <Link
            href="/privacidade"
            className="inline-block text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
