import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import SpecialtySection from "../components/SpecialtySection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "MEP Engineering Recruiter — Patrick Novick",
  description:
    "Patrick Novick is a specialized MEP engineering recruiter placing mechanical, electrical, and plumbing engineers across data centers, healthcare, life sciences, and commercial buildings.",
  keywords: [
    "MEP recruiter",
    "MEP engineering headhunter",
    "mechanical electrical plumbing recruiter",
    "HVAC engineer recruiter",
    "data center MEP staffing",
  ],
  alternates: { canonical: "/mep-recruiter" },
  openGraph: {
    title: "MEP Engineering Recruiter — Patrick Novick",
    description:
      "35+ years placing mechanical, electrical, and plumbing engineers on data center, healthcare, and commercial building projects.",
    url: "https://patricknovick.com/mep-recruiter",
    type: "website",
  },
};

export default function MepRecruiterPage() {
  return (
    <>
      <Navbar />
      <SpecialtySection
        eyebrow="MEP Engineering"
        title="MEP Engineering Recruiter"
        intro={[
          "I recruit mechanical, electrical, and plumbing engineers for firms working on data centers, healthcare facilities, life-science buildings, and complex commercial projects.",
          "From licensed MEP project managers to commissioning specialists, every candidate is screened for the design software, licensure, and code fluency — ASHRAE, NEC, NFPA — the role actually demands.",
        ]}
        rolesPlaced={[
          "MEP Project Manager (PE)",
          "Senior Mechanical/HVAC Engineer",
          "Electrical Engineer",
          "Plumbing & Fire Protection Engineer",
          "Building Automation/Controls Engineer",
          "Commissioning Agent",
        ]}
        whyPoints={[
          {
            title: "35+ Years of Placements",
            body: "Decades of experience matching MEP talent to firms building the most technically demanding projects.",
          },
          {
            title: "Fortune 100/500 Trust",
            body: "I recruit for Fortune 100 and Fortune 500 companies, so every candidate I bring you has already cleared a high bar.",
          },
          {
            title: "Code-Fluent Vetting",
            body: "ASHRAE, NEC, and NFPA fluency is confirmed before a candidate ever reaches your desk.",
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
