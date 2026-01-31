export const prerender = false;

type TrashRequest = {
  id: string;
  gid: string;
  reason?: string;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function pickEnv(name: string) {
  const v = (import.meta as any)?.env?.[name];
  return typeof v === "string" ? v.trim() : "";
}

export async function POST({ request }: { request: Request }) {
  try {
    const body = (await request.json()) as Partial<TrashRequest>;

    const id = String(body.id ?? "").trim();
    const gid = String(body.gid ?? "").trim();
    const reason = String(body.reason ?? "owner portal delete").trim();

    if (!id) return json({ ok: false, error: "Missing id" }, 400);
    if (!gid) return json({ ok: false, error: "Missing gid" }, 400);

    // Only allow the known gallery tabs (prevents abuse)
    if (gid !== "0" && gid !== "1337806420") {
      return json({ ok: false, error: "Invalid gid" }, 400);
    }

    // URL is public-prefixed in your env now (good)
    const scriptUrl = pickEnv("PUBLIC_GOOGLE_APPS_SCRIPT_URL") || pickEnv("GOOGLE_APPS_SCRIPT_URL");

    // Key is server-side; client never sees it
    const ownerKey = pickEnv("OWNER_API_KEY");

    if (!scriptUrl) return json({ ok: false, error: "Missing PUBLIC_GOOGLE_APPS_SCRIPT_URL" }, 500);
    if (!ownerKey) return json({ ok: false, error: "Missing OWNER_API_KEY" }, 500);

    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        action: "trashRow",
        gid,
        id,
        reason,
        actor: "Owner",
        key: ownerKey,
      }),
    });

    const text = await res.text();
    let data: any = null;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!res.ok || !data?.ok) {
      return json(
        { ok: false, error: data?.error || data?.message || `Trash failed (${res.status})` },
        500
      );
    }

    return json({ ok: true, id, gid });
  } catch (err: any) {
    return json({ ok: false, error: err?.message || "Unknown error" }, 500);
  }
}
