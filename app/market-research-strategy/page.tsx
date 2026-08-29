import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import ServiceSection from "../components/ServiceSection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Market Research & Strategy — Patrick Novick",
  description:
    "Patrick Novick conducts job market research and competitive salary analysis, and advises on training and networking opportunities to accelerate hiring and career growth.",
  keywords: [
    "recruiting market research",
    "salary benchmarking service",
    "competitive salary analysis",
    "hiring strategy consulting",
    "compensation research recruiter",
  ],
  alternates: { canonical: "/market-research-strategy" },
  openGraph: {
    title: "Market Research & Strategy — Patrick Novick",
    description:
      "Job market research and competitive salary analysis to inform smarter hiring and career decisions.",
    url: "https://patricknovick.com/market-research-strategy",
    type: "website",
  },
};

export default function MarketResearchStrategyPage() {
  return (
    <>
      <Navbar />
      <ServiceSection
        eyebrow="What I Do"
        title="Market Research & Strategy"
        intro={[
          "A hiring plan built on outdated salary data or a misread market loses candidates before the first interview. I bring current market intelligence into every search — what roles are actually paying, where the talent pool is tight, and what it takes to win a candidate against competing offers.",
          "For candidates, that same research means honest guidance on where the market actually stands, not just encouragement to take the next offer.",
        ]}
        includes={[
          "Competitive salary and total-comp benchmarking",
          "Current market read on talent availability by role and region",
          "Guidance on what it takes to win a candidate against competing offers",
          "Recommendations on training or certifications that move the needle",
          "Industry networking opportunities worth your time",
          "Honest counsel when a hiring plan isn't matching the market",
        ]}
        whyPoints={[
          {
            title: "Current Market Intelligence",
            body: "Compensation and availability data pulled from active searches, not stale reports.",
          },
          {
            title: "35+ Years of Placements",
            body: "Decades of pattern-matching across engineering, government, defense, and commercial hiring cycles.",
          },
          {
            title: "Fewer Lost Candidates",
            body: "A hiring plan grounded in the real market closes faster and loses fewer candidates to competing offers.",
          },
          {
            title: "No Fee Until You Hire",
            body: "My incentive is a placement that works out long-term, not a fast close.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
