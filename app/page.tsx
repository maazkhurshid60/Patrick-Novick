import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Specialties from "./components/Specialties";
import Stats from "./components/Stats";
import Metro from "./components/Metro";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Patrick Novick",
  jobTitle: "Professional Recruiter",
  description:
    "Elite professional recruiter with 35+ years of experience placing talent at Fortune 100/500 companies across government, defense, and commercial sectors.",
  url: "https://patricknovick.com",
  telephone: "(312) 500-1878",
  email: "patrick@patricknovick.com",
  worksFor: {
    "@type": "Organization",
    name: "Metro Associates",
    url: "https://www.metroassoc.com",
  },
  knowsAbout: [
    "Executive Recruiting",
    "Talent Acquisition",
    "Engineering Recruitment",
    "DOT and Transportation",
    "MEP Engineering",
    "Government and Defense Staffing",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Specialties />
        <Stats />
        <Metro />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
