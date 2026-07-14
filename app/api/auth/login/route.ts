import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/session";
import { findUserForLogin } from "@/lib/users";

export async function POST(req: NextRequest): Promise<NextResponse> {
  let username = "";
  let password = "";

  try {
    const body = await req.json();
    username = String(body.username ?? "");
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Bootstrap admin (env) first, then DB-backed accounts.
  let userId: string | null = null;
  if (verifyPassword(username, password)) {
    userId = "env";
  } else {
    const dbId = await findUserForLogin(username, password);
    if (dbId !== null) userId = String(dbId);
  }

  if (!userId) {
    // Fixed delay to slow brute-force attempts
    await new Promise((r) => setTimeout(r, 500));
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createSessionToken(userId);
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  return response;
}
