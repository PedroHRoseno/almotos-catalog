import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function VehicleCardSkeleton({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-zinc-200/80 dark:border-zinc-800/80",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-200/80 dark:bg-zinc-800/80">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800" />
      </div>
      <CardHeader className="space-y-3 pb-2">
        <div className="h-5 w-[72%] rounded-md bg-zinc-200/90 dark:bg-zinc-800/90" />
        <div className="flex gap-2">
          <div className="h-6 w-14 rounded-md bg-zinc-200/80 dark:bg-zinc-800/80" />
          <div className="h-6 w-24 rounded-md bg-zinc-200/80 dark:bg-zinc-800/80" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-11 w-full rounded-md bg-zinc-200/80 dark:bg-zinc-800/80" />
      </CardContent>
    </Card>
  );
}

export function CatalogGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4"
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => (
        <VehicleCardSkeleton key={i} />
      ))}
    </div>
  );
}
