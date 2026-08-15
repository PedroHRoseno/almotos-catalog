import type { PublicVehicle } from "@/lib/types";

const HEX_REGEX = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i;

export function formatKm(km: number) {
  return `${new Intl.NumberFormat("pt-BR").format(km)} km`;
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function rgbToHsl({ r, g, b }: { r: number; g: number; b: number }) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const l = (max + min) / 2;

  if (delta === 0) return { h: 0, s: 0, l: l * 100 };

  const s = delta / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === rn) h = ((gn - bn) / delta) % 6;
  else if (max === gn) h = (bn - rn) / delta + 2;
  else h = (rn - gn) / delta + 4;

  return { h: (h * 60 + 360) % 360, s: s * 100, l: l * 100 };
}

function nameFromHex(hex: string) {
  const { h, s, l } = rgbToHsl(hexToRgb(hex));

  if (s < 12) {
    if (l < 14) return "Preto";
    if (l < 32) return "Grafite";
    if (l < 62) return "Cinza";
    if (l < 88) return "Prata";
    return "Branco";
  }

  if (l < 16) return "Preto";

  if (h < 16 || h >= 330) return "Vermelho";
  if (h < 42) return l < 40 ? "Marrom" : "Laranja";
  if (h < 66) return "Amarelo";
  if (h < 160) return "Verde";
  if (h < 200) return "Azul claro";
  if (h < 255) return "Azul";
  if (h < 290) return "Roxo";
  return "Rosa";
}

/**
 * A API pública devolve `color` ora como nome, ora como hexadecimal cru
 * (ex.: "#efe6e6"). Mostrar o hex para o cliente parece bug, então
 * traduzimos para um nome legível e guardamos a amostra da cor.
 */
export function describeColor(raw: string | null | undefined): {
  label: string;
  swatch: string | null;
} {
  const value = raw?.trim();
  if (!value) return { label: "Cor não informada", swatch: null };

  if (HEX_REGEX.test(value)) {
    const hex = value.startsWith("#") ? value : `#${value}`;
    return { label: nameFromHex(hex), swatch: hex };
  }

  return {
    label: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    swatch: null,
  };
}

export function vehicleImages(vehicle: PublicVehicle) {
  return vehicle.imageUrlList?.length ? vehicle.imageUrlList : ["/logo.png"];
}

export function vehicleTitle(vehicle: PublicVehicle) {
  return `${vehicle.brand} ${vehicle.model}`.replace(/\s+/g, " ").trim();
}
