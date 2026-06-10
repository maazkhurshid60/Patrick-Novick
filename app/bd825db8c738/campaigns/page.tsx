import Sidebar from "../Sidebar";
import LogoutButton from "../LogoutButton";
import CampaignClient from "./CampaignClient";
import db from "@/lib/db";

export default async function CampaignsPage() {
  const [countResult, listsResult] = await Promise.all([
    db.execute("SELECT COUNT(*) as count FROM contacts WHERE status = 'active' OR status IS NULL"),
    db.execute(`
      SELECT cl.id, cl.name, COUNT(clm.contact_id) as member_count
      FROM contact_lists cl
      LEFT JOIN contact_list_members clm ON cl.id = clm.list_id
      GROUP BY cl.id
      ORDER BY cl.name ASC
    `),
  ]);

  const contactCount = Number(countResult.rows[0]?.count ?? 0);
  const lists = listsResult.rows.map((r) => ({
    id: Number(r.id),
    name: r.name as string,
    member_count: Number(r.member_count),
  }));

  return (
    <div className="min-h-screen" style={{ background: "#0d0f12" }}>
      <Sidebar active="campaigns" />
      <div className="ml-56">
        <header className="sticky top-0 z-20 flex items-center justify-between px-8 h-14"
          style={{ background: "#0d0f12", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Email Campaigns</p>
          <LogoutButton />
        </header>
        <main className="px-8 py-7">
          <CampaignClient contactCount={contactCount} lists={lists} />
        </main>
      </div>
    </div>
  );
}
