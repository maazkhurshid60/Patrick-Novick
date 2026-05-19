import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Patrick Novick — Professional Recruiter",
  description:
    "Patrick Novick is an elite professional recruiter with 20+ years of experience placing talent at Fortune 100/500 companies across government, defense, and commercial sectors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="antialiased">
        {children}
        <Script
          id="nextivacx-code-snippet"
          src="https://d3po7etsbw5eiv.cloudfront.net/Simplify360Chat.js?key=NmEwNWU5OTE5NjFjZTYzZTcwOGFmZWU1fDQxNzIzNzA="
          strategy="afterInteractive"
        />
        <Script id="hide-greeting" src="/hide-greeting.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
