export type PublicVehicle = {
  slug: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  colorLabel?: string;
  kilometersDriven: number;
  suggestedPrice?: number | null;
  fipeValue?: number | null;
  fipeDiscountPercentage?: number | null;
  isBelowFipe?: boolean;
  fipeSavingsAmount?: number | null;
  imageUrlList: string[];
  description?: string | null;
  catalogUrl?: string;
  tags?: string[];
  /** Campanha ativa. `suggestedPrice` já é o preço promocional. */
  promotion?: PublicPromotion | null;
};

export type PublicPromotion = {
  label: string;
  theme: string;
  campaignName: string;
  /** Último dia da campanha (AAAA-MM-DD, horário da loja). */
  endsOn: string;
  endsAt: string;
  /** "De R$ X": só vem quando a loja comprovou 30+ dias do preço anterior. */
  previousPrice?: number | null;
};

export type PublicCampaign = {
  name: string;
  label: string;
  theme: string;
  startsOn: string;
  endsOn: string;
  endsAt: string;
  vehicleCount: number;
};
