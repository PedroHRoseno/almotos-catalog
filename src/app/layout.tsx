import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { AssistantWidget } from "@/components/assistant/assistant-widget";
import { ThemeProvider } from "@/components/theme-provider";
import { THEME_BOOTSTRAP } from "@/lib/theme";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AL Motos",
  description:
    "Motos selecionadas, prontas para rodar. Confira o estoque da Al Motos em Caruaru e fale direto com a nossa equipe pelo WhatsApp.",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  openGraph: {
    title: "AL Motos",
    description:
      "Motos selecionadas, prontas para rodar. Confira o estoque da Al Motos em Caruaru.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#08080a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${dmSans.variable} ${syne.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        <ThemeProvider>
          {children}
          <AssistantWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
