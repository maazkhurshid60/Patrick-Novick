"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export default function ChatWidget() {
  const pathname = usePathname();

  // Do not load on the admin panel / dashboard routes
  if (pathname?.startsWith("/bd825db8c738")) {
    return null;
  }

  return (
    <Script
      id="nextivacx-code-snippet"
      src="https://d3po7etsbw5eiv.cloudfront.net/Simplify360Chat.js?key=NmEwNWU5OTE5NjFjZTYzZTcwOGFmZWU1fDQxNzIzNzA="
      strategy="afterInteractive"
    />
  );
}
