import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import SpecialtySection from "../components/SpecialtySection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "DOT & Transportation Engineering Recruiter — Patrick Novick",
  description:
    "Patrick Novick is a specialized DOT and transportation engineering recruiter with 35+ years placing licensed engineers, program managers, and technical specialists at Fortune 100/500 companies.",
  keywords: [
    "DOT recruiter",
    "transportation engineer recruiter",
    "DOT staffing",
    "infrastructure recruiter",
    "transportation engineering headhunter",
  ],
  alternates: { canonical: "/dot-transportation-recruiter" },
  openGraph: {
    title: "DOT & Transportation Engineering Recruiter — Patrick Novick",
    description:
      "35+ years placing licensed transportation engineers and program leaders for DOT agencies and infrastructure firms.",
    url: "https://patricknovick.com/dot-transportation-recruiter",
    type: "website",
  },
};

export default function DotTransportationRecruiterPage() {
  return (
    <>
      <Navbar />
      <SpecialtySection
        eyebrow="DOT & Transportation"
        title="DOT & Transportation Engineering Recruiter"
        intro={[
          "For over 35 years, I've connected Departments of Transportation, engineering consultancies, and infrastructure contractors with the licensed engineers and program leaders who keep transportation projects moving.",
          "My network spans transportation engineers, program managers, and technical specialists who understand FHWA standards, state DOT procurement, and the realities of publicly funded capital programs — not just resumes that look right on paper.",
        ]}
        rolesPlaced={[
          "Transportation Engineer (PE)",
          "Bridge & Structural Designer",
          "Roadway & Traffic Engineer",
          "Construction Manager",
          "Resident Engineer",
          "Project Controls Specialist",
          "Environmental Coordinator",
          "Program Manager",
        ]}
        whyPoints={[
          {
            title: "35+ Years in DOT Recruiting",
            body: "I've placed transportation talent through multiple infrastructure funding cycles and understand how DOT hiring actually works.",
          },
          {
            title: "Fortune 100/500 Trust",
            body: "I recruit for Fortune 100 and Fortune 500 companies, so every candidate I bring you has already cleared a high bar.",
          },
          {
            title: "A Real Network, Not a Job Board",
            body: "The engineers you need aren't actively browsing postings. I reach them directly, through relationships built over decades.",
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
