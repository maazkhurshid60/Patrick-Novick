import Sidebar from "../Sidebar";
import LogoutButton from "../LogoutButton";
import ListsClient from "./ListsClient";

export default function ListsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0d0f12" }}>
      <Sidebar active="lists" />
      <div className="ml-56">
        <header className="sticky top-0 z-20 flex items-center justify-between px-8 h-14"
          style={{ background: "#0d0f12", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Contact Lists</p>
          <LogoutButton />
        </header>
        <main className="px-8 py-7">
          <ListsClient />
        </main>
      </div>
    </div>
  );
}
