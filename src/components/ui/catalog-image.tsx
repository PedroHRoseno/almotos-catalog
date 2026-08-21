"use client";

import Image, { type ImageProps } from "next/image";

/**
 * Fotos do estoque já saem recortadas (JPEG ≤ 1200px). O otimizador da Vercel
 * (`/_next/image`) rejeita o hostname regional do S3 gerado pelo FastAPI
 * (`bucket.s3.{region}.amazonaws.com`) e a foto quebra — o admin usa <img>
 * direto e funciona. Remote http(s) segue o mesmo caminho do admin.
 */
export function CatalogImage({ src, alt, ...props }: ImageProps) {
  const remote = typeof src === "string" && /^https?:\/\//i.test(src);
  return <Image src={src} alt={alt} unoptimized={remote} {...props} />;
}
