import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { getCatalogVehicles } from "@/lib/catalog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "AL Motos | Motos seminovas em Caruaru",
  description:
    "A sua próxima moto com procedência e garantia está aqui. Motos revisadas, garantia de motor e câmbio e aceitamos sua moto na troca.",
};

export default async function Home() {
  let recentVehicles: Awaited<ReturnType<typeof getCatalogVehicles>> = [];
  try {
    const vehicles = await getCatalogVehicles();
    recentVehicles = vehicles.slice(0, 3);
  } catch {
    recentVehicles = [];
  }

  return <LandingPage recentVehicles={recentVehicles} />;
}
