import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { APEX_HOSTS, CATALOG_HOSTS, CATALOG_PATH } from "@/lib/routes";

function requestHostname(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-host");
  const raw = forwarded?.split(",")[0]?.trim() || request.headers.get("host") || "";
  return raw.split(":")[0]?.toLowerCase() ?? "";
}

export function middleware(request: NextRequest) {
  const hostname = requestHostname(request);

  if (CATALOG_HOSTS.has(hostname)) {
    const url = request.nextUrl.clone();
    url.pathname = CATALOG_PATH;
    return NextResponse.rewrite(url);
  }

  if (APEX_HOSTS.has(hostname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
