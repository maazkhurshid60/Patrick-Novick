import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email } = await req.json() as { email?: string };
    const cleanEmail = (email ?? "").trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    // Insert or update the contact to have status 'unsubscribed'.
    // Using ON CONFLICT ensures that even if they are not in the contacts database yet,
    // they are inserted as 'unsubscribed' so they will not be emailed in future campaigns.
    await db.execute({
      sql: `INSERT INTO contacts (email, status) 
            VALUES (?, 'unsubscribed') 
            ON CONFLICT(email) 
            DO UPDATE SET status = 'unsubscribed'`,
      args: [cleanEmail],
    });

    return NextResponse.json({ success: true, message: "Successfully unsubscribed" });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json({ error: "An error occurred while trying to unsubscribe. Please try again." }, { status: 500 });
  }
}
