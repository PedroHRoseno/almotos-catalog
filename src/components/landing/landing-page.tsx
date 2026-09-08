import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/landing/hero-section";
import { QuickLinks } from "@/components/landing/quick-links";
import { RecentArrivals } from "@/components/landing/recent-arrivals";
import { TrustSection } from "@/components/landing/trust-section";
import type { PublicVehicle } from "@/lib/types";

export function LandingPage({ recentVehicles }: { recentVehicles: PublicVehicle[] }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <HeroSection />
      <main className="flex-1">
        <QuickLinks />
        <RecentArrivals vehicles={recentVehicles} />
        <TrustSection />
      </main>
      <SiteFooter />
    </div>
  );
}
