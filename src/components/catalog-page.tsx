"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { fetchPublicVehicles } from "@/lib/api";
import type { PublicVehicle } from "@/lib/types";
import { VehicleCard } from "@/components/vehicle-card";
import { CatalogGridSkeleton } from "@/components/vehicle-card-skeleton";
import { cn } from "@/lib/utils";

const shellClass =
  "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; vehicles: PublicVehicle[] };

export function CatalogPage() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [brand, setBrand] = useState<string>("ALL");

  useEffect(() => {
    let cancelled = false;
    fetchPublicVehicles()
      .then((vehicles) => {
        if (cancelled) return;
        setState({ status: "ready", vehicles });
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

  const brands = useMemo(() => {
    if (state.status !== "ready") return [];
    return Array.from(new Set(state.vehicles.map((v) => v.brand)))
      .sort((a, b) => a.localeCompare(b));
  }, [state]);

  const filtered = useMemo(() => {
    if (state.status !== "ready") return [];
    return brand === "ALL"
      ? state.vehicles
      : state.vehicles.filter((v) => v.brand === brand);
  }, [state, brand]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/85 backdrop-blur-md dark:border-zinc-800/70 dark:bg-black/70">
        <div
          className={cn(
            shellClass,
            "flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-start sm:gap-8"
          )}
        >
          <div className="flex shrink-0 items-center justify-start">
            <Image
              src="/logo.png"
              alt="Al Motos"
              width={120}
              height={40}
              className="h-9 w-auto object-contain sm:h-10"
              priority
            />
          </div>
          <div className="flex w-full flex-col items-stretch sm:w-auto sm:items-start">
            <label className="sr-only" htmlFor="brand">
              Filtrar por marca
            </label>
            <select
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={cn(
                "h-11 w-full min-w-0 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm sm:min-w-[200px] sm:max-w-xs dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50",
                "focus:outline-none focus:ring-2 focus:ring-zinc-900/25 dark:focus:ring-zinc-50/25"
              )}
            >
              <option value="ALL">Todas as marcas</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className={cn(shellClass, "py-6 sm:py-8 lg:py-10")}>
        {state.status === "loading" && (
          <div className="space-y-4">
            <p className="text-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Carregando catálogo…
            </p>
            <CatalogGridSkeleton count={8} />
          </div>
        )}

        {state.status === "error" && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-700 dark:text-red-300">
            {state.message}
          </div>
        )}

        {state.status === "ready" && filtered.length === 0 && (
          <div className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Nenhuma moto encontrada.
          </div>
        )}

        {state.status === "ready" && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
            {filtered.map((v, idx) => (
              <VehicleCard
                key={`${v.brand}-${v.model}-${v.year}-${idx}`}
                vehicle={v}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

