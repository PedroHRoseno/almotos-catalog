"use client";

import { cn } from "@/lib/utils";

export const ALL_BRANDS = "ALL";

type BrandFilterProps = {
  brands: string[];
  value: string;
  onChange: (brand: string) => void;
};

export function BrandFilter({ brands, value, onChange }: BrandFilterProps) {
  const options = [ALL_BRANDS, ...brands];

  return (
    <div
      role="group"
      aria-label="Filtrar por marca"
      className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {options.map((brand) => {
        const active = brand === value;
        return (
          <button
            key={brand}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(brand)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium",
              "transition-[background-color,border-color,color,transform] duration-200 ease-out-expo",
              "active:scale-[0.97]",
              active
                ? "border-accent/40 bg-accent/15 text-accent"
                : "border-line bg-surface/60 text-ink-muted hover:border-ink-subtle hover:text-ink"
            )}
          >
            {brand === ALL_BRANDS ? "Todas" : brand}
          </button>
        );
      })}
    </div>
  );
}
