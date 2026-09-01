"use client";

import Link from "next/link";
import { CatalogImage } from "@/components/ui/catalog-image";
import { describeColor, formatBRL, formatKm } from "@/lib/vehicle";

type MiniVehicle = {
  slug: string;
  brand: string;
  model: string;
  year: number;
  colorLabel?: string;
  kilometersDriven: number;
  imageUrl?: string | null;
  suggestedPrice?: number | null;
  tags?: string[];
};

export function VehicleMiniGrid({ vehicles }: { vehicles: MiniVehicle[] }) {
  if (!vehicles.length) {
    return (
      <p className="text-sm text-ink-muted">
        Nenhuma moto encontrada com esses filtros.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {vehicles.map((v) => {
        const color = describeColor(v.colorLabel);
        return (
          <Link
            key={v.slug}
            href={`/motos/${v.slug}`}
            className="flex gap-3 overflow-hidden rounded-2xl border border-line-soft bg-surface p-2 transition-colors hover:border-line"
          >
            <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-canvas-soft">
              {v.imageUrl ? (
                <CatalogImage
                  src={v.imageUrl}
                  alt={`${v.brand} ${v.model}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : null}
            </div>
            <div className="min-w-0 py-0.5">
              <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-accent">
                {v.brand}
              </p>
              <p className="truncate font-sans text-sm font-bold text-ink">
                {v.model}
              </p>
              <p className="text-xs text-ink-subtle">
                {v.year} · {formatKm(v.kilometersDriven)}
                {color.label ? ` · ${color.label}` : ""}
                {v.suggestedPrice != null ? ` · ${formatBRL(v.suggestedPrice)}` : ""}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function PhotoStrip({
  title,
  photos,
}: {
  title?: string;
  photos: string[];
}) {
  if (!photos.length) return null;
  return (
    <div className="space-y-2">
      {title ? (
        <p className="text-xs font-medium text-ink-muted">{title}</p>
      ) : null}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {photos.map((src) => (
          <div
            key={src}
            className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-line-soft"
          >
            <CatalogImage src={src} alt="" fill className="object-cover" sizes="128px" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HandoffCard({
  message,
}: {
  message?: string;
  links?: { label: string; url: string }[];
}) {
  return (
    <div className="space-y-2 rounded-2xl border border-line-soft bg-surface p-3">
      <p className="text-sm text-ink-muted">
        {message ||
          "Um especialista da AL Motos vai continuar exatamente nesta conversa."}
      </p>
    </div>
  );
}
