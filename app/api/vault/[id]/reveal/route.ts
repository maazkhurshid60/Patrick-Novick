import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";
import {
  getSessionUserFromToken, verifyUserPassword,
  checkLoginLockout, recordFailedLogin, clearLoginAttempts,
  type SessionUser,
} from "@/lib/users";
import { revealVaultSecret, revealsRemaining, logReveal } from "@/lib/vault";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function requireAdmin(req: NextRequest): Promise<SessionUser | NextResponse> {
  const me = await getSessionUserFromToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (me.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  return me;
}

// POST /api/vault/[id]/reveal — the one endpoint that decrypts a stored secret.
// POST (not GET) because it requires the admin's own password in the body —
// step-up auth, so a hijacked session cookie alone can't read a secret out.
// Wrong-password attempts share the same lockout as the login route (5 in a
// row locks the username for 15 minutes); correct attempts are still capped
// (lib/vault.ts) so a working session can't be used to dump every entry at once.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const me = await requireAdmin(req);
  if (me instanceof NextResponse) return me;

  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  let password = "";
  try {
    const body = await req.json();
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const lockedFor = await checkLoginLockout(me.username);
  if (lockedFor !== null) {
    const minutes = Math.ceil(lockedFor / 60);
    return NextResponse.json(
      { error: `Too many failed attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.` },
      { status: 429 }
    );
  }

  if (!(await verifyUserPassword(me, password))) {
    await recordFailedLogin(me.username);
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }
  await clearLoginAttempts(me.username);

  if ((await revealsRemaining(me.username)) <= 0) {
    return NextResponse.json({ error: "Too many secrets revealed recently — please wait a few minutes." }, { status: 429 });
  }

  const result = await revealVaultSecret(id);
  if (result === null) return NextResponse.json({ error: "Entry not found" }, { status: 404 });

  await logReveal(id, result.label, me.username);
  return NextResponse.json({ secret: result.secret });
}
