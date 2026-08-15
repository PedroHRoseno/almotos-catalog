"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { PublicVehicle } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildWhatsAppLink } from "@/lib/api";
import { describeColor, formatKm, vehicleImages } from "@/lib/vehicle";
import { cn } from "@/lib/utils";

type VehicleCardProps = {
  vehicle: PublicVehicle;
  /** Prioriza o carregamento das primeiras fotos visíveis (LCP). */
  priority?: boolean;
};

export function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  const images = vehicleImages(vehicle);
  const hasMultiple = images.length > 1;
  const color = describeColor(vehicle.color);

  const waLink = useMemo(
    () => buildWhatsAppLink({ model: vehicle.model }),
    [vehicle.model]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: hasMultiple });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<Record<number, boolean>>({});

  const markLoaded = useCallback((idx: number) => {
    setLoadedSlides((prev) => (prev[idx] ? prev : { ...prev, [idx]: true }));
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <Card
      className={cn(
        "group relative isolate aspect-[4/5] border-line-soft/80 bg-canvas-soft",
        "transition-[transform,border-color,box-shadow] duration-500 ease-out-expo",
        "hover:-translate-y-1 hover:border-line hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
      )}
    >
      <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
        <div className="flex h-full">
          {images.map((src, idx) => (
            <div
              className="relative h-full min-w-0 flex-[0_0_100%]"
              key={`${src}-${idx}`}
            >
              {!loadedSlides[idx] && (
                <div className="absolute inset-0 z-10 animate-pulse bg-surface" />
              )}
              <Image
                src={src}
                alt={`${vehicle.brand} ${vehicle.model} — foto ${idx + 1}`}
                fill
                className={cn(
                  "object-cover transition-transform duration-700 ease-out-expo",
                  "md:group-hover:scale-[1.06]"
                )}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={priority && idx === 0}
                onLoad={() => markLoaded(idx)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradiente garante leitura do texto sobre qualquer foto */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-95"
      />

      {hasMultiple && (
        <div className="absolute inset-x-0 top-0 z-20 flex gap-1 p-3">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ver foto ${i + 1} de ${images.length}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className="group/seg h-4 flex-1"
            >
              <span
                className={cn(
                  "block h-1 w-full rounded-full transition-colors duration-300",
                  i === selectedIndex
                    ? "bg-white"
                    : "bg-white/30 group-hover/seg:bg-white/60"
                )}
              />
            </button>
          ))}
        </div>
      )}

      {hasMultiple && (
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 hidden items-center justify-between px-2 md:flex">
          <Button
            variant="glass"
            size="icon"
            aria-label="Foto anterior"
            onClick={() => emblaApi?.scrollPrev()}
            className="pointer-events-auto size-9 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="glass"
            size="icon"
            aria-label="Próxima foto"
            onClick={() => emblaApi?.scrollNext()}
            className="pointer-events-auto size-9 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <ChevronRight />
          </Button>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-20 space-y-3 p-4 sm:p-5">
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          {vehicle.brand}
        </p>

        <h3 className="font-display text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl">
          <Link href={`/motos/${vehicle.slug}`} className="hover:underline">
            {vehicle.model}
          </Link>
        </h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-white/70">
          <span className="tabular-nums">{vehicle.year}</span>
          <span aria-hidden className="size-1 rounded-full bg-white/30" />
          <span className="tabular-nums">{formatKm(vehicle.kilometersDriven)}</span>
          <span aria-hidden className="size-1 rounded-full bg-white/30" />
          <span className="inline-flex items-center gap-1.5">
            {color.swatch && (
              <span
                aria-hidden
                className="size-3 rounded-full border border-white/30"
                style={{ backgroundColor: color.swatch }}
              />
            )}
            {color.label}
          </span>
        </div>

        <Button
          asChild
          variant="whatsapp"
          className="mt-1 w-full min-h-11 text-sm sm:text-base"
        >
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar preço da ${vehicle.brand} ${vehicle.model} no WhatsApp`}
          >
            <MessageCircle />
            Consultar preço
          </a>
        </Button>
      </div>
    </Card>
  );
}
