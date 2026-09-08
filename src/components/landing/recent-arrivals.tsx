import Link from "next/link";
import { VehicleCard } from "@/components/vehicle-card";
import { Button } from "@/components/ui/button";
import { CATALOG_PATH } from "@/lib/routes";
import type { PublicVehicle } from "@/lib/types";
import { cn } from "@/lib/utils";
import { shellClass } from "@/components/site-header";

export function RecentArrivals({ vehicles }: { vehicles: PublicVehicle[] }) {
  return (
    <section className={cn(shellClass, "pb-12 sm:pb-16")} aria-labelledby="recent-heading">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Vitrine
          </p>
          <h2
            id="recent-heading"
            className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
          >
            Chegaram Recentemente
          </h2>
        </div>
        {vehicles.length > 0 && (
          <Button asChild variant="ghost" size="sm" className="shrink-0">
            <Link href={CATALOG_PATH}>Ver todas</Link>
          </Button>
        )}
      </div>

      {vehicles.length === 0 ? (
        <p className="rounded-card border border-line bg-surface px-5 py-8 text-center text-sm text-ink-muted">
          Novas motos entram toda semana. Fale no WhatsApp para saber o que está chegando.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </div>
      )}
    </section>
  );
}
