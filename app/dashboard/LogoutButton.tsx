"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/feb58da15ece");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-xs font-medium transition-colors duration-200 hover:text-red-500"
      style={{ color: "var(--color-gray)" }}
    >
      Sign out
    </button>
  );
}
