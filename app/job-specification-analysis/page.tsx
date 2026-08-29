import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import ServiceSection from "../components/ServiceSection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Job Specification Analysis — Patrick Novick",
  description:
    "Patrick Novick works directly with hiring managers to gather precise job specifications and translate them into actionable hiring insights — for faster, more accurate placements.",
  keywords: [
    "job specification analysis",
    "hiring manager consulting",
    "job description review recruiter",
    "hiring brief service",
    "recruiter needs analysis",
  ],
  alternates: { canonical: "/job-specification-analysis" },
  openGraph: {
    title: "Job Specification Analysis — Patrick Novick",
    description:
      "Precise job specifications translated into actionable hiring insights, gathered directly from your hiring managers.",
    url: "https://patricknovick.com/job-specification-analysis",
    type: "website",
  },
};

export default function JobSpecificationAnalysisPage() {
  return (
    <>
      <Navbar />
      <ServiceSection
        eyebrow="What I Do"
        title="Job Specification Analysis"
        intro={[
          "A job description written for a posting rarely captures what a hiring manager actually needs. I work directly with hiring managers to dig into the real requirements — the technical bar, the team dynamics, the constraints that never make it into the JD.",
          "That analysis becomes the brief I search against, which means fewer mismatched submissions and a shorter time-to-fill for you.",
        ]}
        includes={[
          "Direct conversation with the hiring manager, not just HR",
          "Technical and licensure requirements clarified up front",
          "Team fit and working-style factors identified",
          "A real hiring brief, not a rewritten job posting",
          "Realistic market feedback if the spec isn't matching the market",
          "Salary and comp benchmarking against current market rates",
        ]}
        whyPoints={[
          {
            title: "Fewer Mismatched Submissions",
            body: "A precise brief means every candidate I bring you is a real contender, not a guess.",
          },
          {
            title: "35+ Years of Placements",
            body: "Decades of experience translating what a role actually needs into a search that finds it.",
          },
          {
            title: "Faster Time-to-Fill",
            body: "Getting the spec right up front saves the weeks lost to back-and-forth on the wrong candidates.",
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
