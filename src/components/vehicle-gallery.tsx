"use client";

import { CatalogImage } from "@/components/ui/catalog-image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function VehicleGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const hasMultiple = images.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: hasMultiple });
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
    <div className="relative overflow-hidden rounded-card border border-line-soft bg-canvas-soft">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {images.map((src, idx) => (
            <div
              className="relative aspect-[4/5] min-w-0 flex-[0_0_100%] sm:aspect-[16/10]"
              key={`${src}-${idx}`}
            >
              <CatalogImage
                src={src}
                alt={`${alt} — foto ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      </div>
      {hasMultiple && (
        <>
          <div className="absolute inset-x-0 top-0 z-10 flex gap-1 p-3">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ver foto ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className="h-4 flex-1"
              >
                <span
                  className={cn(
                    "block h-1 w-full rounded-full",
                    i === selectedIndex ? "bg-white" : "bg-white/30"
                  )}
                />
              </button>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 hidden items-center justify-between px-2 md:flex">
            <Button
              variant="glass"
              size="icon"
              aria-label="Foto anterior"
              onClick={() => emblaApi?.scrollPrev()}
              className="pointer-events-auto"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="glass"
              size="icon"
              aria-label="Próxima foto"
              onClick={() => emblaApi?.scrollNext()}
              className="pointer-events-auto"
            >
              <ChevronRight />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
