import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import ServiceSection from "../components/ServiceSection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Candidate Matching — Patrick Novick",
  description:
    "Patrick Novick bridges the gap between candidates and companies with tailored resume guidance, interview prep, and industry-specific positioning to maximize placement success.",
  keywords: [
    "candidate matching service",
    "recruiter candidate matching",
    "resume guidance recruiter",
    "interview prep recruiter",
    "career positioning",
  ],
  alternates: { canonical: "/candidate-matching" },
  openGraph: {
    title: "Candidate Matching — Patrick Novick",
    description:
      "Tailored resume guidance, interview prep, and industry-specific positioning to maximize placement success.",
    url: "https://patricknovick.com/candidate-matching",
    type: "website",
  },
};

export default function CandidateMatchingPage() {
  return (
    <>
      <Navbar />
      <ServiceSection
        eyebrow="What I Do"
        title="Candidate Matching"
        intro={[
          "Placing a candidate isn't just matching a resume to a job description — it's understanding what a hiring manager actually needs and what a candidate actually wants, then finding the real overlap.",
          "I work directly with candidates on resume positioning, interview preparation, and how to present their experience for the specific role and company, so they walk into every conversation with a real edge.",
        ]}
        includes={[
          "Resume review and positioning for the specific role",
          "Interview preparation tailored to the hiring team",
          "Industry-specific framing of your experience",
          "Direct introductions — not a blind job-board application",
          "Ongoing communication throughout the process",
          "Honest feedback on fit, before you commit time to a process",
        ]}
        whyPoints={[
          {
            title: "35+ Years of Placements",
            body: "Decades of experience reading what makes a candidate the right fit for a specific team, not just a job title.",
          },
          {
            title: "A Real Network, Not a Job Board",
            body: "Introductions come through relationships, not cold applications lost in an ATS queue.",
          },
          {
            title: "Fortune 100/500 Trust",
            body: "Companies I work with know candidates I bring forward have already been vetted for real fit.",
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
