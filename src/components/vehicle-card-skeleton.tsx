import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function VehicleCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("relative aspect-[4/5] bg-canvas-soft", className)}>
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="absolute inset-x-0 bottom-0 space-y-3 p-4 sm:p-5">
        <Skeleton className="h-3 w-16 rounded-full" />
        <Skeleton className="h-6 w-2/3 rounded-full" />
        <Skeleton className="h-4 w-1/2 rounded-full" />
        <Skeleton className="h-11 w-full rounded-full" />
      </div>
    </Card>
  );
}

export function CatalogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => (
        <VehicleCardSkeleton key={i} />
      ))}
    </div>
  );
}
