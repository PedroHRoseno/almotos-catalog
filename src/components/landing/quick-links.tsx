import { Calculator, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_LINKS } from "@/lib/company";
import { buildWhatsAppLink } from "@/lib/api";
import { cn } from "@/lib/utils";
import { shellClass } from "@/components/site-header";

const LINKS = [
  {
    href: buildWhatsAppLink(),
    label: "Fale com um Consultor (WhatsApp)",
    icon: MessageCircle,
    variant: "whatsapp" as const,
  },
  {
    href: buildWhatsAppLink({
      text: "Olá! Gostaria de simular o financiamento de uma moto na Al Motos.",
    }),
    label: "Simular Financiamento",
    icon: Calculator,
    variant: "outline" as const,
  },
  {
    href: COMPANY_LINKS.maps,
    label: "Como Chegar (Google Maps)",
    icon: MapPin,
    variant: "outline" as const,
  },
];

export function QuickLinks() {
  return (
    <section className={cn(shellClass, "pb-10 sm:pb-12")} aria-label="Atalhos">
      <ul className="mx-auto flex max-w-sm flex-col gap-3">
        {LINKS.map(({ href, label, icon: Icon, variant }) => (
          <li key={label}>
            <Button
              asChild
              variant={variant}
              size="lg"
              className="h-auto min-h-14 w-full whitespace-normal px-4 py-3 text-left text-[0.95rem] leading-snug"
            >
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="size-5" />
                {label}
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
