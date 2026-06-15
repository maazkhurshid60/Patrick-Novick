import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(): Promise<NextResponse> {
  const result = await db.execute(
    "SELECT COUNT(*) as count FROM contacts WHERE status = 'active' OR status IS NULL"
  );
  return NextResponse.json({ count: Number(result.rows[0]?.count ?? 0) });
}
