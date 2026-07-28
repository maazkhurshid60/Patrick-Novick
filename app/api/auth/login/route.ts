import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/session";
import { findUserForLogin, usernameExists } from "@/lib/users";

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

  // DB-backed accounts first. The env bootstrap admin is only a fallback and
  // ONLY works while no DB account exists for that username — so once the admin
  // changes their password (which migrates them into the DB), the old env
  // password is retired automatically.
  let userId: string | null = null;
  const dbId = await findUserForLogin(username, password);
  if (dbId !== null) {
    userId = String(dbId);
  } else if (verifyPassword(username, password) && !(await usernameExists(username))) {
    userId = "env";
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
