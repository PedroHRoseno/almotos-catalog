import type { PublicCampaign, PublicPromotion } from "@/lib/types";

export const BLACK_NOVEMBER = "BLACK_NOVEMBER";

export function isBlackNovember(theme: string | null | undefined) {
  return theme === BLACK_NOVEMBER;
}

/** "2026-11-30" → "30/11". */
export function formatDayMonth(isoDate: string) {
  const [, month, day] = isoDate.slice(0, 10).split("-");
  return day && month ? `${day}/${month}` : isoDate;
}

export function promotionDeadline(promotion: Pick<PublicPromotion, "endsOn">) {
  return `até ${formatDayMonth(promotion.endsOn)}`;
}

export function campaignHeadline(campaign: PublicCampaign) {
  return isBlackNovember(campaign.theme)
    ? `Black November · ${campaign.label} AL Motos`
    : `${campaign.label} AL Motos`;
}
