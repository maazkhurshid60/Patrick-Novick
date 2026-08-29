import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import SpecialtySection from "../components/SpecialtySection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Civil Engineering Recruiter — Patrick Novick",
  description:
    "Patrick Novick recruits civil engineers for transportation, infrastructure, and municipal projects nationwide — licensed PEs, project managers, and technical specialists, backed by 35+ years of placements.",
  keywords: [
    "civil engineering recruiter",
    "civil engineer headhunter",
    "infrastructure engineering recruiter",
    "civil engineering staffing",
    "PE recruiter",
  ],
  alternates: { canonical: "/civil-engineering-recruiter" },
  openGraph: {
    title: "Civil Engineering Recruiter — Patrick Novick",
    description:
      "35+ years placing licensed civil engineers, project managers, and technical specialists on transportation and infrastructure projects.",
    url: "https://patricknovick.com/civil-engineering-recruiter",
    type: "website",
  },
};

export default function CivilEngineeringRecruiterPage() {
  return (
    <>
      <Navbar />
      <SpecialtySection
        eyebrow="Civil Engineering"
        title="Civil Engineering Recruiter"
        intro={[
          "I recruit civil engineers for firms working on transportation, infrastructure, and municipal projects nationwide — from licensed Professional Engineers to project managers and technical specialists.",
          "Whether you need a single senior hire or a full project team, every candidate I bring you is already vetted for licensure, technical depth, and the regulatory fluency civil engineering work demands.",
        ]}
        rolesPlaced={[
          "Civil Project Manager (PE)",
          "Senior Transportation Engineer",
          "Structural/Bridge Engineer",
          "Water Resources Engineer",
          "Traffic/ITS Engineer",
          "Geotechnical Engineer",
          "Construction Manager",
        ]}
        whyPoints={[
          {
            title: "35+ Years of Placements",
            body: "Decades of experience matching civil engineering talent to the firms and public agencies that need them most.",
          },
          {
            title: "Fortune 100/500 Trust",
            body: "I recruit for Fortune 100 and Fortune 500 companies, so every candidate I bring you has already cleared a high bar.",
          },
          {
            title: "Licensure-First Vetting",
            body: "PE licensure, NCEES comity, and code fluency are confirmed before a candidate ever reaches your desk.",
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
