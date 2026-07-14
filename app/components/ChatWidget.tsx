"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

// Routes that must never show the third-party chat widget: the admin dashboard
// and the admin login page.
const noChatRoute = (p: string | null) =>
  !!p && (p.startsWith("/bd825db8c738") || p === "/feb58da15ece");

// The Simplify360 widget injects elements whose ids are prefixed "s360-"
// (e.g. #s360-chat-iframe-container, the visible launcher) plus an iframe
// named "s360chatiframe". Match those precisely so nothing of ours is touched.
const WIDGET_SELECTOR = '[id^="s360-"], iframe[name^="s360"]';

export default function ChatWidget() {
  const pathname = usePathname();
  const hide = noChatRoute(pathname);

  useEffect(() => {
    const STYLE_ID = "hide-chat-widget";
    const existingStyle = document.getElementById(STYLE_ID);

    if (!hide) {
      existingStyle?.remove();
      return;
    }

    // CSS backstop — hides the widget even if it is injected after this runs.
    if (!existingStyle) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = `${WIDGET_SELECTOR}{display:none !important;}`;
      document.head.appendChild(style);
    }

    // The launcher is appended to <body> by the script (outside React), so it
    // persists across client-side navigation from a public/login page. Actively
    // remove it, and keep watching in case it injects a moment later.
    const sweep = () => document.querySelectorAll(WIDGET_SELECTOR).forEach((el) => el.remove());
    sweep();
    const observer = new MutationObserver(sweep);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [hide]);

  // Do not load the chat script on admin routes at all.
  if (hide) return null;

  return (
    <Script
      id="nextivacx-code-snippet"
      src="https://d3po7etsbw5eiv.cloudfront.net/Simplify360Chat.js?key=NmEwNWU5OTE5NjFjZTYzZTcwOGFmZWU1fDQxNzIzNzA="
      strategy="afterInteractive"
    />
  );
}
