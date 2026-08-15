import { getCatalogVehicles } from "@/lib/catalog";
import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
  try {
    const vehicles = await getCatalogVehicles();
    return NextResponse.json(vehicles);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro ao carregar catálogo";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
