import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// 1×1 transparent GIF
const PIXEL = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

// GET /api/track/open?cid=campaignId&eid=base64url_email
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const cid = searchParams.get("cid");
  const eid = searchParams.get("eid");

  if (cid && eid) {
    try {
      const email = Buffer.from(eid, "base64").toString("utf8");
      await db.execute({
        sql: "INSERT INTO email_opens (campaign_id, email) VALUES (?, ?)",
        args: [Number(cid), email.toLowerCase()],
      });
    } catch {
      // Never fail on tracking — non-blocking
    }
  }

  return new NextResponse(PIXEL, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache",
    },
  });
}
