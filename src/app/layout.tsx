import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { AssistantWidget } from "@/components/assistant/assistant-widget";
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
  themeColor: "#08080a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${dmSans.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
        <AssistantWidget />
      </body>
    </html>
  );
}
