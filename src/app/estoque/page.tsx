import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog-page";
import { getCatalogVehicles } from "@/lib/catalog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Estoque | AL Motos",
  description:
    "Confira o estoque completo de motos seminovas da Al Motos em Caruaru e fale direto com a equipe pelo WhatsApp.",
};

type PageProps = {
  searchParams: { q?: string | string[] };
};

function firstQuery(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function EstoquePage({ searchParams }: PageProps) {
  let initialVehicles: Awaited<ReturnType<typeof getCatalogVehicles>> | undefined;
  try {
    initialVehicles = await getCatalogVehicles();
  } catch {
    initialVehicles = undefined;
  }

  return (
    <CatalogPage
      initialVehicles={initialVehicles}
      initialQuery={firstQuery(searchParams.q)}
    />
  );
}
