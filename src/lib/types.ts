export type PublicVehicle = {
  slug: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  colorLabel?: string;
  kilometersDriven: number;
  suggestedPrice?: number | null;
  imageUrlList: string[];
  description?: string | null;
  catalogUrl?: string;
  tags?: string[];
};
