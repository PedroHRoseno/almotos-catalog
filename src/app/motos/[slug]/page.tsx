import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { SiteHeader, shellClass } from "@/components/site-header";
import { VehicleGallery } from "@/components/vehicle-gallery";
import { Button } from "@/components/ui/button";
import { getCatalogVehicle, getCatalogVehicles } from "@/lib/catalog";
import { buildWhatsAppLink } from "@/lib/api";
import { describeColor, formatKm, vehicleImages, vehicleTitle } from "@/lib/vehicle";
import { cn } from "@/lib/utils";

type PageProps = { params: { slug: string } };

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const vehicles = await getCatalogVehicles();
    return vehicles.map((v) => ({ slug: v.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const vehicle = await getCatalogVehicle(params.slug);
  if (!vehicle) return { title: "Moto não encontrada | AL Motos" };
  const title = `${vehicleTitle(vehicle)} ${vehicle.year}`;
  const images = vehicleImages(vehicle);
  return {
    title: `${title} | AL Motos`,
    description:
      vehicle.description ||
      `${title} disponível na Al Motos em Caruaru. Consulte preço no WhatsApp.`,
    openGraph: {
      title,
      description: "Estoque real da Al Motos · Caruaru/PE",
      images: images[0] ? [{ url: images[0] }] : undefined,
    },
  };
}

export default async function MotoPage({ params }: PageProps) {
  const vehicle = await getCatalogVehicle(params.slug);
  if (!vehicle) notFound();

  const title = vehicleTitle(vehicle);
  const color = describeColor(vehicle.colorLabel || vehicle.color);
  const images = vehicleImages(vehicle);
  const wa = buildWhatsAppLink({ model: `${vehicle.brand} ${vehicle.model}` });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: title,
    brand: vehicle.brand,
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.kilometersDriven,
      unitCode: "KMT",
    },
    image: images,
    description: vehicle.description || undefined,
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={cn(shellClass, "flex-1 py-8 sm:py-12")}>
        <p className="text-sm text-ink-subtle">
          <Link href="/" className="hover:text-ink">
            Catálogo
          </Link>
          <span className="mx-2">/</span>
          {vehicle.brand}
        </p>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <VehicleGallery images={images} alt={title} />

          <div className="space-y-5">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {vehicle.brand}
            </p>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">
              {vehicle.model}
            </h1>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-ink-muted">
              <span className="tabular-nums">{vehicle.year}</span>
              <span aria-hidden>·</span>
              <span className="tabular-nums">{formatKm(vehicle.kilometersDriven)}</span>
              <span aria-hidden>·</span>
              <span>{color.label}</span>
            </div>
            {vehicle.description ? (
              <p className="text-base leading-relaxed text-ink-muted">
                {vehicle.description}
              </p>
            ) : (
              <p className="text-base leading-relaxed text-ink-muted">
                Moto selecionada pela Al Motos em Caruaru. Preço sob consulta —
                financiamento em até 48x e cartão em até 18x.
              </p>
            )}
            <Button asChild variant="whatsapp" className="w-full min-h-12">
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <MessageCircle />
                Consultar preço no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
