export async function POST(req: Request) {
  const ai = process.env.ALMOTOS_AI_URL?.replace(/\/+$/, "");
  if (!ai) {
    return Response.json(
      { error: "ALMOTOS_AI_URL não configurada" },
      { status: 503 }
    );
  }

  const body = await req.json();
  const res = await fetch(`${ai}/v1/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({ ...body, channel: "web", stream: true }),
  });

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "");
    return Response.json(
      { error: text || `Agent runtime HTTP ${res.status}` },
      { status: res.status || 502 }
    );
  }

  return new Response(res.body, {
    headers: {
      "Content-Type":
        res.headers.get("Content-Type") || "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
