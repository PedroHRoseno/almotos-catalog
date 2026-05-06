"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { fetchPublicVehicles } from "@/lib/api";
import type { PublicVehicle } from "@/lib/types";
import { VehicleCard } from "@/components/vehicle-card";
import { cn } from "@/lib/utils";

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
      <header className="sticky top-0 z-20 backdrop-blur">
        <div className="mx-auto flex w-full max-w-md items-center gap-3 px-4 py-3 bg-white/80 dark:bg-black/60 border-b border-zinc-200/60 dark:border-zinc-800/60">
          <Image
            src="/logo.png"
            alt="Al Motos"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
          <div className="ml-auto">
            <label className="sr-only" htmlFor="brand">
              Filtrar por marca
            </label>
            <select
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={cn(
                "h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm dark:border-zinc-800 dark:bg-zinc-950",
                "focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-zinc-50/20"
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

      <main className="mx-auto w-full max-w-md px-4 py-4">
        {state.status === "loading" && (
          <div className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Carregando catálogo…
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
          <div className="space-y-4">
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

