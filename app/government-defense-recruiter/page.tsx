import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import SpecialtySection from "../components/SpecialtySection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Government, Defense & Cleared Recruiter — Patrick Novick",
  description:
    "Patrick Novick recruits technical and intelligence professionals across government, defense, and commercial sectors — including cleared software engineers, DevOps professionals, and senior executives.",
  keywords: [
    "cleared recruiter",
    "government defense recruiter",
    "cleared software engineer recruiter",
    "security clearance recruiter",
    "defense staffing agency",
  ],
  alternates: { canonical: "/government-defense-recruiter" },
  openGraph: {
    title: "Government, Defense & Cleared Recruiter — Patrick Novick",
    description:
      "35+ years placing cleared technical talent across government, defense, and commercial sectors.",
    url: "https://patricknovick.com/government-defense-recruiter",
    type: "website",
  },
};

export default function GovernmentDefenseRecruiterPage() {
  return (
    <>
      <Navbar />
      <SpecialtySection
        eyebrow="Government & Defense"
        title="Government, Defense & Cleared Recruiter"
        intro={[
          "Beyond engineering, I recruit technical and intelligence professionals across government, defense, and commercial sectors — including cleared software engineers, DevOps professionals, systems engineers, and senior executives.",
          "Security clearance requirements mean the wrong hire costs you months, not weeks. I bring candidates whose clearance status and technical background are confirmed before you ever see a resume.",
        ]}
        rolesPlaced={[
          "Cleared Software Engineer",
          "DevOps Engineer",
          "Systems Engineer",
          "Intelligence Analyst",
          "Program Manager (Cleared)",
          "Cybersecurity Specialist",
        ]}
        whyPoints={[
          {
            title: "35+ Years of Placements",
            body: "Decades of experience navigating cleared and government hiring across defense and intelligence sectors.",
          },
          {
            title: "Fortune 100/500 Trust",
            body: "I recruit for Fortune 100 and Fortune 500 companies, so every candidate I bring you has already cleared a high bar.",
          },
          {
            title: "Clearance-Verified Vetting",
            body: "Clearance status and technical background are confirmed up front, so you never lose time to a disqualified candidate.",
          },
          {
            title: "No Fee Until You Hire",
            body: "You only pay when a placement works out — my incentive is finding the right fit, not the fastest one.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
