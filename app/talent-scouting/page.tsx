import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import ServiceSection from "../components/ServiceSection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Talent Scouting — Patrick Novick",
  description:
    "Patrick Novick maintains a comprehensive candidate network built over 35+ years, matching the right people with the right opportunities — a long-term career partner, not a one-time transaction.",
  keywords: [
    "talent scouting service",
    "executive talent scout",
    "passive candidate sourcing",
    "career partner recruiter",
    "long-term recruiting relationship",
  ],
  alternates: { canonical: "/talent-scouting" },
  openGraph: {
    title: "Talent Scouting — Patrick Novick",
    description:
      "A comprehensive candidate network built over 35+ years, matching the right people with the right opportunities.",
    url: "https://patricknovick.com/talent-scouting",
    type: "website",
  },
};

export default function TalentScoutingPage() {
  return (
    <>
      <Navbar />
      <ServiceSection
        eyebrow="What I Do"
        title="Talent Scouting"
        intro={[
          "The best candidates for a role aren't usually the ones actively applying — they're already working, doing well, and not browsing job boards. Reaching them takes a real network, not a posting.",
          "I maintain relationships with engineers, technical specialists, and executives over years, not just for the role in front of me today but for the one that opens six months from now. That's what makes this a scouting practice, not a transaction.",
        ]}
        includes={[
          "Direct outreach to passive, non-applying candidates",
          "A maintained network built over 35+ years, not a rented database",
          "Long-term relationship — I follow up when the right role opens",
          "Confidential searches for sensitive or executive-level roles",
          "Candidates matched on fit and trajectory, not just keywords",
          "A single point of contact throughout your search"
        ]}
        whyPoints={[
          {
            title: "35+ Years Building the Network",
            body: "Relationships built over decades reach candidates a job posting never will.",
          },
          {
            title: "500+ Placements",
            body: "A track record across engineering, government, defense, and commercial sectors.",
          },
          {
            title: "A Long-Term Partner",
            body: "I stay in touch after a placement — for your next hire and the candidate's next move.",
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
