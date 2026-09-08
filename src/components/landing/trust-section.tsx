import { ArrowLeftRight, ShieldCheck, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { shellClass } from "@/components/site-header";

const BADGES = [
  {
    icon: Wrench,
    title: "Motos Revisadas",
    detail: "Checam motor, câmbio e itens de segurança antes de ir para a vitrine.",
  },
  {
    icon: ShieldCheck,
    title: "Garantia de Motor",
    detail: "Procedência conferida e garantia para você comprar com tranquilidade.",
  },
  {
    icon: ArrowLeftRight,
    title: "Aceitamos sua moto na troca",
    detail: "Use a sua moto como parte do pagamento da próxima.",
  },
];

export function TrustSection() {
  return (
    <section
      className={cn(shellClass, "pb-12 sm:pb-16")}
      aria-labelledby="trust-heading"
    >
      <h2 id="trust-heading" className="sr-only">
        Por que comprar na AL Motos
      </h2>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {BADGES.map(({ icon: Icon, title, detail }) => (
          <li
            key={title}
            className="flex gap-3 rounded-card border border-line-soft bg-surface px-4 py-4 sm:flex-col sm:items-center sm:px-5 sm:py-6 sm:text-center"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
              <Icon className="size-5" aria-hidden />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-ink sm:mt-3">
                {title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                {detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
