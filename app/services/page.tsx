import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Footer from "../components/Footer";

export const metadata = { title: "Services — Patrick Novick" };

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Services />
      </main>
      <Footer />
    </>
  );
}
