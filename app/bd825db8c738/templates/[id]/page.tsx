import Sidebar from "../../Sidebar";
import LogoutButton from "../../LogoutButton";
import TemplateEditor from "../TemplateEditor";

// /bd825db8c738/templates/[id] — full-page template editor.
// [id] = "new" to create, or a numeric template id to edit.
export default async function TemplateEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen" style={{ background: "#0d0f12" }}>
      <Sidebar active="templates" />
      <div className="lg:ml-56">
        <header className="sticky top-0 z-20 flex items-center justify-between pl-16 pr-4 lg:px-8 h-14"
          style={{ background: "#0d0f12", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
            {id === "new" ? "New Template" : "Edit Template"}
          </p>
          <LogoutButton />
        </header>
        <main className="px-4 sm:px-6 lg:px-8 py-7">
          <TemplateEditor id={id} />
        </main>
      </div>
    </div>
  );
}
