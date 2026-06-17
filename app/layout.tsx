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
  metadataBase: new URL("https://patricknovick.com"),
  title: "Patrick Novick — Professional Recruiter",
  description:
    "Patrick Novick is an elite professional recruiter with 35+ years of experience placing talent at Fortune 100/500 companies across government, defense, and commercial sectors.",
  keywords: [
    "recruiter",
    "professional recruiter",
    "executive recruiter",
    "talent acquisition",
    "Fortune 500 recruiting",
    "engineering recruiter",
    "Patrick Novick",
    "Metro Associates",
  ],
  authors: [{ name: "Patrick Novick" }],
  openGraph: {
    type: "website",
    url: "https://patricknovick.com",
    title: "Patrick Novick — Professional Recruiter",
    description:
      "35+ years placing top talent at Fortune 100/500 companies across government, defense, and commercial sectors.",
    siteName: "Patrick Novick",
    images: [{ url: "/cropped-ChatGPT-Image-Mar-14-2026-12_48_02-PM.webp", width: 1200, height: 630, alt: "Patrick Novick" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Novick — Professional Recruiter",
    description:
      "35+ years placing top talent at Fortune 100/500 companies across government, defense, and commercial sectors.",
  },
  alternates: {
    canonical: "https://patricknovick.com",
  },
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
      </body>
    </html>
  );
}
