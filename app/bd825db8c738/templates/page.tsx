import Sidebar from "../Sidebar";
import LogoutButton from "../LogoutButton";
import TemplatesClient from "./TemplatesClient";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0d0f12" }}>
      <Sidebar active="templates" />
      <div className="lg:ml-56">
        <header className="sticky top-0 z-20 flex items-center justify-between pl-16 pr-4 lg:px-8 h-14"
          style={{ background: "#0d0f12", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Email Templates</p>
          <LogoutButton />
        </header>
        <main className="px-4 sm:px-6 lg:px-8 py-7">
          <TemplatesClient />
        </main>
      </div>
    </div>
  );
}
