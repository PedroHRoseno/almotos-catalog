import type { PublicPromotion } from "@/lib/types";
import { formatBRL } from "@/lib/vehicle";
import { isBlackNovember, promotionDeadline } from "@/lib/campaign";
import { cn } from "@/lib/utils";

type PromoBadgeProps = {
  promotion: PublicPromotion;
  className?: string;
};

/** Selo da campanha ("SALDÃO") sobre a foto ou ao lado do título. */
export function PromoBadge({ promotion, className }: PromoBadgeProps) {
  const black = isBlackNovember(promotion.theme);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-extrabold uppercase tracking-[0.08em] shadow-md",
        black
          ? "border border-[var(--bn-gold)]/70 bg-[#09090b] text-[var(--bn-gold)]"
          : "bg-accent text-accent-ink",
        className
      )}
    >
      {black && <span aria-hidden className="size-1.5 rounded-full bg-[var(--bn-gold)]" />}
      {promotion.label}
    </span>
  );
}

type PromoPriceProps = {
  price: number;
  promotion: PublicPromotion;
  /** "card": texto branco sobre a foto. "page": cores do tema da página. */
  tone?: "card" | "page";
  className?: string;
};

/**
 * Preço promocional. O "de R$ X" só aparece quando a loja comprovou que esse preço
 * ficou anunciado por 30 dias ou mais (vem pronto da API; nada é calculado aqui).
 */
export function PromoPrice({ price, promotion, tone = "card", className }: PromoPriceProps) {
  const black = isBlackNovember(promotion.theme);
  const previous = promotion.previousPrice;
  const muted = tone === "card" ? "text-white/65" : "text-ink-subtle";
  return (
    <div className={cn("space-y-0.5", className)}>
      {previous != null && previous > price ? (
        <p className={cn("text-sm tabular-nums", muted)}>
          de{" "}
          <span className="line-through decoration-accent decoration-2">{formatBRL(previous)}</span>{" "}
          por
        </p>
      ) : (
        <p className={cn("text-xs font-semibold uppercase tracking-[0.12em]", muted)}>
          Preço {promotion.label}
        </p>
      )}
      <p
        className={cn(
          "font-sans font-extrabold tabular-nums leading-none",
          tone === "card" ? "text-2xl sm:text-[1.7rem]" : "text-4xl",
          black ? "bn-gold-text" : tone === "card" ? "text-white" : "text-ink"
        )}
      >
        {formatBRL(price)}
      </p>
      <p className={cn("text-[0.7rem] font-semibold uppercase tracking-[0.08em]", muted)}>
        À vista · {promotionDeadline(promotion)}
      </p>
    </div>
  );
}
