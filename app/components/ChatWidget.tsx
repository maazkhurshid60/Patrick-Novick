"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

const isAdminRoute = (p: string | null) => !!p?.startsWith("/bd825db8c738");

export default function ChatWidget() {
  const pathname = usePathname();
  const admin = isAdminRoute(pathname);

  // The Simplify360 widget injects its launcher directly into <body>, outside
  // React's tree. If a public page loaded it and the user then navigates to the
  // dashboard client-side, simply not rendering the <Script> won't remove the
  // already-injected icon. So on admin routes we also hide it with a style rule
  // that targets only the third-party widget's own elements (never ours).
  useEffect(() => {
    const STYLE_ID = "hide-chat-widget-admin";
    const existing = document.getElementById(STYLE_ID);
    if (admin) {
      if (!existing) {
        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = `
          [id*="simplify360" i],[class*="simplify360" i],
          [id*="nextivacx" i],[class*="nextivacx" i],
          [id*="nextiva" i],[class*="nextiva" i],
          [id*="s360chat" i],[class*="s360chat" i]{display:none !important;}
        `;
        document.head.appendChild(style);
      }
    } else {
      existing?.remove();
    }
  }, [admin]);

  // Do not load the chat script on the admin panel / dashboard routes
  if (admin) return null;

  return (
    <Script
      id="nextivacx-code-snippet"
      src="https://d3po7etsbw5eiv.cloudfront.net/Simplify360Chat.js?key=NmEwNWU5OTE5NjFjZTYzZTcwOGFmZWU1fDQxNzIzNzA="
      strategy="afterInteractive"
    />
  );
}
