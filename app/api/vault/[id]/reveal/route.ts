import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";
import { getSessionUserFromToken, type SessionUser } from "@/lib/users";
import { revealVaultSecret } from "@/lib/vault";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function requireAdmin(req: NextRequest): Promise<SessionUser | NextResponse> {
  const me = await getSessionUserFromToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (me.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  return me;
}

// GET /api/vault/[id]/reveal — the one endpoint that decrypts a stored secret.
// Kept separate from the list/detail response so a secret is never sent to
// the browser until the admin explicitly asks to see this specific one.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const me = await requireAdmin(req);
  if (me instanceof NextResponse) return me;

  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const secret = await revealVaultSecret(id);
  if (secret === null) return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  return NextResponse.json({ secret });
}
