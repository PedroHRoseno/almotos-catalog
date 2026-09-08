import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CATALOG_PATH } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { shellClass } from "@/components/site-header";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="ambient-glow pointer-events-none absolute inset-x-0 -top-16 h-64"
      />

      <div className={cn(shellClass, "relative flex justify-end pt-4 sm:pt-5")}>
        <ThemeToggle />
      </div>

      <div className={cn(shellClass, "relative flex flex-col items-center pb-8 pt-4 text-center sm:pb-10 sm:pt-6")}>
        <Image
          src="/logo.png"
          alt="AL Motos"
          width={180}
          height={60}
          priority
          className="h-14 w-auto object-contain sm:h-16"
        />

        <h1 className="mt-6 max-w-[20ch] font-display text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-ink sm:mt-8 sm:text-4xl">
          A sua próxima moto com procedência e garantia está aqui.
        </h1>

        <Button asChild variant="accent" size="lg" className="mt-7 min-h-12 w-full max-w-sm text-base">
          <Link href={CATALOG_PATH}>Ver Estoque Completo</Link>
        </Button>

        <form
          action={CATALOG_PATH}
          method="get"
          className="mt-5 flex w-full max-w-sm flex-col gap-2 sm:flex-row"
        >
          <label htmlFor="landing-search" className="sr-only">
            Buscar modelo
          </label>
          <input
            id="landing-search"
            type="search"
            name="q"
            placeholder="Ex.: Bros 160"
            autoComplete="off"
            enterKeyHint="search"
            className={cn(
              "h-12 w-full min-w-0 flex-1 rounded-full border border-line bg-surface px-4 text-base text-ink",
              "placeholder:text-ink-subtle",
              "focus-visible:outline-none"
            )}
          />
          <Button type="submit" size="lg" className="min-h-12 w-full sm:w-auto">
            <Search />
            Buscar
          </Button>
        </form>
      </div>
    </section>
  );
}
