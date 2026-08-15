import { CatalogPage } from "@/components/catalog-page";
import { getCatalogVehicles } from "@/lib/catalog";

export const revalidate = 60;

export default async function Home() {
  let initialVehicles: Awaited<ReturnType<typeof getCatalogVehicles>> | undefined;
  try {
    initialVehicles = await getCatalogVehicles();
  } catch {
    initialVehicles = undefined;
  }
  return <CatalogPage initialVehicles={initialVehicles} />;
}
