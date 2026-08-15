import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { shellClass } from "@/components/site-header";
import { cn } from "@/lib/utils";

export function CatalogHero({ total }: { total: number | null }) {
  return (
    <section className="relative overflow-hidden border-b border-line-soft/60">
      <div
        aria-hidden
        className="ambient-glow pointer-events-none absolute inset-x-0 -top-24 h-72"
      />

      <div className={cn(shellClass, "relative py-12 sm:py-16 lg:py-20")}>
        <Badge variant="accent">
          <MapPin />
          Caruaru · PE
        </Badge>

        <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Motos selecionadas,
          <span className="block text-ink-muted">prontas para rodar.</span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
          Estoque real, atualizado direto pela loja. Escolha a sua e fale com a
          nossa equipe pelo WhatsApp — financiamos em até 48x.
        </p>

        {total !== null && (
          <p className="mt-6 text-sm text-ink-subtle">
            <span className="font-semibold tabular-nums text-ink">{total}</span>{" "}
            {total === 1 ? "moto disponível" : "motos disponíveis"} agora
          </p>
        )}
      </div>
    </section>
  );
}
