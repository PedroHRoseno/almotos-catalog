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
};
