export type PublicVehicle = {
  slug: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  colorLabel?: string;
  kilometersDriven: number;
  imageUrlList: string[];
  description?: string | null;
  catalogUrl?: string;
};
