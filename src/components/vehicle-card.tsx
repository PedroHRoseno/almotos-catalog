"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { PublicVehicle } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildWhatsAppLink } from "@/lib/api";
import { cn } from "@/lib/utils";

function formatKm(km: number) {
  return new Intl.NumberFormat("pt-BR").format(km);
}

export function VehicleCard({ vehicle }: { vehicle: PublicVehicle }) {
  const waLink = useMemo(
    () => buildWhatsAppLink({ model: vehicle.model }),
    [vehicle.model]
  );

  const images = vehicle.imageUrlList?.length
    ? vehicle.imageUrlList
    : ["/logo.png"];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesLoaded, setSlidesLoaded] = useState<Record<number, boolean>>({});

  const markSlideLoaded = useCallback((idx: number) => {
    setSlidesLoaded((prev) => (prev[idx] ? prev : { ...prev, [idx]: true }));
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
        "group overflow-hidden transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
        "dark:hover:shadow-black/40"
      )}
    >
      <div className="relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((src, idx) => (
              <div className="min-w-0 flex-[0_0_100%]" key={`${src}-${idx}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {idx === selectedIndex && !slidesLoaded[idx] && (
                    <div
                      className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-200/90 dark:bg-zinc-800/90"
                      aria-hidden
                    >
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-400 border-t-transparent dark:border-zinc-500 dark:border-t-transparent" />
                    </div>
                  )}
                  <Image
                    src={src}
                    alt={`${vehicle.model} foto ${idx + 1}`}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-500 ease-out",
                      "md:group-hover:scale-[1.04]"
                    )}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    priority={idx === 0}
                    onLoad={() => markSlideLoaded(idx)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para imagem ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full bg-white/50 transition-all",
                  i === selectedIndex ? "w-4 bg-white" : "w-1.5"
                )}
                onClick={() => emblaApi?.scrollTo(i)}
              />
            ))}
          </div>
        )}
      </div>

      <CardHeader className="space-y-3 pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <CardTitle className="text-lg font-bold leading-snug tracking-tight text-zinc-950 dark:text-zinc-50">
            {vehicle.model}
          </CardTitle>
          <Badge className="shrink-0 self-start border border-zinc-200/80 bg-zinc-900 px-2 py-1 text-[10px] font-semibold uppercase leading-tight tracking-wide text-white sm:text-xs dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-900">
            Condições especiais
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-md border border-zinc-200/90 bg-zinc-100/90 px-2 py-1 text-xs font-medium tabular-nums text-zinc-700",
              "dark:border-zinc-700/90 dark:bg-zinc-800/80 dark:text-zinc-300"
            )}
          >
            {vehicle.year}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-md border border-zinc-200/90 bg-zinc-100/90 px-2 py-1 text-xs font-medium tabular-nums text-zinc-700",
              "dark:border-zinc-700/90 dark:bg-zinc-800/80 dark:text-zinc-300"
            )}
          >
            {formatKm(vehicle.kilometersDriven)} km
          </span>
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full lg:flex lg:justify-center"
        >
          <Button
            variant="whatsapp"
            size="lg"
            className={cn(
              "w-full min-h-[44px] px-4 text-sm sm:text-base",
              "lg:max-w-[min(100%,17rem)] lg:shrink-0"
            )}
          >
            Consultar preço no WhatsApp
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}
