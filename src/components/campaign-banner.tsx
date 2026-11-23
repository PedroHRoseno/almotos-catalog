import Link from "next/link";
import { CATALOG_PATH } from "@/lib/routes";
import { campaignHeadline, formatDayMonth, isBlackNovember } from "@/lib/campaign";
import type { PublicCampaign } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Faixa fixa no topo de todas as páginas enquanto houver campanha ativa. */
export function CampaignBanner({ campaign }: { campaign: PublicCampaign }) {
  const black = isBlackNovember(campaign.theme);
  const count = campaign.vehicleCount;
  return (
    <Link
      href={CATALOG_PATH}
      className={cn(
        "relative z-50 block overflow-hidden",
        black ? "bn-carbon border-b border-[var(--bn-gold)]/40 text-white" : "bg-accent text-accent-ink"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-0.5 px-4 py-2 text-center sm:px-6 lg:px-8">
        <span
          className={cn(
            "font-display text-sm font-extrabold uppercase tracking-[0.1em] sm:text-base",
            black && "bn-gold-text"
          )}
        >
          {campaignHeadline(campaign)}
        </span>
        <span className="text-xs font-medium text-white/80 sm:text-sm">
          {count > 0
            ? `${count} ${count === 1 ? "moto" : "motos"} com preço especial · até ${formatDayMonth(campaign.endsOn)}`
            : `Até ${formatDayMonth(campaign.endsOn)}`}
        </span>
      </div>
      {black && <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-accent" />}
    </Link>
  );
}
