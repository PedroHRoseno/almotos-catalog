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
    <Card className="overflow-hidden">
      <div className="relative bg-zinc-100 dark:bg-zinc-900">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((src, idx) => (
              <div className="min-w-0 flex-[0_0_100%]" key={`${src}-${idx}`}>
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={src}
                    alt={`${vehicle.model} foto ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority={idx === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir para imagem ${i + 1}`}
                className={cn(
                  "h-1.5 w-1.5 rounded-full bg-white/60",
                  i === selectedIndex && "bg-white"
                )}
                onClick={() => emblaApi?.scrollTo(i)}
              />
            ))}
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="flex items-start justify-between gap-3">
          <span className="leading-snug">{vehicle.model}</span>
          <Badge className="shrink-0 bg-black text-white">Consulte condições especiais</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          <span className="font-medium text-zinc-900 dark:text-zinc-50">{vehicle.year}</span>
          <span className="mx-2">•</span>
          <span>{formatKm(vehicle.kilometersDriven)} km</span>
        </div>

        <a href={waLink} target="_blank" rel="noopener noreferrer" className="block">
          <Button variant="whatsapp" size="lg" className="w-full">
            Consultar Preço no WhatsApp
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}

