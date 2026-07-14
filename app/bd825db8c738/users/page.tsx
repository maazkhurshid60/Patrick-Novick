import Sidebar from "../Sidebar";
import LogoutButton from "../LogoutButton";
import UsersClient from "./UsersClient";

export default function UsersPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0d0f12" }}>
      <Sidebar active="users" />
      <div className="transition-all duration-200 flex-1 flex flex-col min-w-0 lg:ml-56">
        <header className="sticky top-0 z-20 flex items-center justify-between pr-4 h-14 pl-16 lg:px-8 shrink-0"
          style={{ background: "#0d0f12", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Users</p>
          <LogoutButton />
        </header>
        <main className="px-4 sm:px-6 lg:px-8 py-6 min-w-0 flex-1">
          <UsersClient />
        </main>
      </div>
    </div>
  );
}
