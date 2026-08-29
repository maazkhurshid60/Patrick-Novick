import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import SpecialtySection from "../components/SpecialtySection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Construction Inspection (CEI) Recruiter — Patrick Novick",
  description:
    "Patrick Novick is a specialized CEI and construction inspection recruiter, placing certified inspectors, resident engineers, and QA/QC specialists on materials testing, bridge, and roadway programs.",
  keywords: [
    "CEI recruiter",
    "construction inspection recruiter",
    "construction inspector headhunter",
    "bridge inspector recruiter",
    "resident engineer recruiter",
  ],
  alternates: { canonical: "/construction-inspection-recruiter" },
  openGraph: {
    title: "Construction Inspection (CEI) Recruiter — Patrick Novick",
    description:
      "35+ years placing certified construction inspectors, resident engineers, and QA/QC specialists nationwide.",
    url: "https://patricknovick.com/construction-inspection-recruiter",
    type: "website",
  },
};

export default function ConstructionInspectionRecruiterPage() {
  return (
    <>
      <Navbar />
      <SpecialtySection
        eyebrow="Construction Inspection"
        title="Construction Inspection (CEI) Recruiter"
        intro={[
          "I place certified construction inspectors, resident engineers, and QA/QC specialists on materials testing, bridge, and roadway inspection programs for DOT agencies and infrastructure contractors.",
          "Every inspector I represent has their NICET, ACI materials-testing, and NBIS bridge-inspection credentials verified before they ever reach your desk — no surprises after the offer.",
        ]}
        rolesPlaced={[
          "CEI Inspector",
          "Senior Construction Inspector",
          "Resident Engineer",
          "Materials Testing Technician / QA Manager",
          "Bridge Inspector",
          "CEI Project Manager",
        ]}
        whyPoints={[
          {
            title: "Certification-Verified Candidates",
            body: "NICET, ACI, and NBIS credentials are confirmed up front, so you're never vetting a candidate twice.",
          },
          {
            title: "35+ Years of Placements",
            body: "Decades placing inspection talent through multiple infrastructure funding cycles.",
          },
          {
            title: "A Real Network, Not a Job Board",
            body: "The inspectors you need aren't actively browsing postings. I reach them directly, through relationships built over decades.",
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
