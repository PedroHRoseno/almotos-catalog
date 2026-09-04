"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, RotateCw, SearchX } from "lucide-react";
import { fetchPublicVehicles } from "@/lib/api";
import type { PublicVehicle } from "@/lib/types";
import { ALL_BRANDS, BrandFilter } from "@/components/brand-filter";
import { CatalogHero } from "@/components/catalog-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader, shellClass } from "@/components/site-header";
import { VehicleCard } from "@/components/vehicle-card";
import { CatalogGridSkeleton } from "@/components/vehicle-card-skeleton";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; vehicles: PublicVehicle[] };

export function CatalogPage({
  initialVehicles,
}: {
  initialVehicles?: PublicVehicle[];
}) {
  const [state, setState] = useState<LoadState>(
    initialVehicles
      ? { status: "ready", vehicles: initialVehicles }
      : { status: "loading" }
  );
  const [brand, setBrand] = useState<string>(ALL_BRANDS);

  const load = useCallback(() => {
    let cancelled = false;
    setState({ status: "loading" });

    fetchPublicVehicles()
      .then((vehicles) => {
        if (!cancelled) setState({ status: "ready", vehicles });
      })
      .catch((e) => {
        if (cancelled) return;
        setState({
          status: "error",
          message: e instanceof Error ? e.message : "Erro ao carregar catálogo",
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (initialVehicles !== undefined) return;
    return load();
  }, [initialVehicles, load]);

  const brands = useMemo(() => {
    if (state.status !== "ready") return [];
    return Array.from(new Set(state.vehicles.map((v) => v.brand))).sort((a, b) =>
      a.localeCompare(b, "pt-BR")
    );
  }, [state]);

  const filtered = useMemo(() => {
    if (state.status !== "ready") return [];
    return brand === ALL_BRANDS
      ? state.vehicles
      : state.vehicles.filter((v) => v.brand === brand);
  }, [state, brand]);

  const total = state.status === "ready" ? state.vehicles.length : null;

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <SiteHeader />
      <CatalogHero total={total} />

      <main className={cn(shellClass, "flex-1 py-8 sm:py-10 lg:py-12")}>
        {state.status === "ready" && brands.length > 1 && (
          <div className="mb-8 space-y-3">
            <BrandFilter brands={brands} value={brand} onChange={setBrand} />
            <p className="text-sm text-ink-subtle">
              Mostrando{" "}
              <span className="tabular-nums text-ink-muted">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "moto" : "motos"}
              {brand !== ALL_BRANDS && ` · ${brand}`}
            </p>
          </div>
        )}

        {state.status === "loading" && <CatalogGridSkeleton count={6} />}

        {state.status === "error" && (
          <div className="mx-auto max-w-md rounded-card border border-line bg-surface p-8 text-center">
            <AlertTriangle className="mx-auto size-8 text-accent" />
            <h2 className="mt-4 font-display text-lg font-bold text-ink">
              Não conseguimos carregar o catálogo
            </h2>
            <p className="mt-2 text-sm text-ink-muted">{state.message}</p>
            <Button variant="outline" className="mt-6" onClick={load}>
              <RotateCw />
              Tentar novamente
            </Button>
          </div>
        )}

        {state.status === "ready" && filtered.length === 0 && (
          <div className="mx-auto max-w-md rounded-card border border-line bg-surface p-8 text-center">
            <SearchX className="mx-auto size-8 text-ink-subtle" />
            <h2 className="mt-4 font-display text-lg font-bold text-ink">
              Nenhuma moto nessa marca
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Ajuste o filtro para ver todo o estoque disponível.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setBrand(ALL_BRANDS)}
            >
              Ver todas as motos
            </Button>
          </div>
        )}

        {state.status === "ready" && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {filtered.map((vehicle, idx) => (
              <BlurFade
                key={vehicle.slug || `${vehicle.brand}-${vehicle.model}-${idx}`}
                delay={Math.min(idx, 8) * 0.06}
                animateOnScroll={idx > 2}
              >
                <VehicleCard vehicle={vehicle} priority={idx < 3} />
              </BlurFade>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
