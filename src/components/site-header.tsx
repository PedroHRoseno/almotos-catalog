import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/api";
import { cn } from "@/lib/utils";

export const shellClass = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft/80 bg-canvas/70 backdrop-blur-xl">
      <div
        className={cn(
          shellClass,
          "flex h-16 items-center justify-between gap-4 sm:h-18"
        )}
      >
        <Image
          src="/logo.png"
          alt="Al Motos"
          width={132}
          height={44}
          className="h-8 w-auto object-contain sm:h-9"
          priority
        />

        <Button asChild variant="outline" size="sm" className="shrink-0">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle />
            <span className="hidden sm:inline">Falar com a loja</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </Button>
      </div>
    </header>
  );
}
