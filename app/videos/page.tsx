import Navbar from "../components/Navbar";
import Videos from "../components/Videos";
import Footer from "../components/Footer";

export const metadata = { title: "Videos — Patrick Novick" };

export default function VideosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Videos />
      </main>
      <Footer />
    </>
  );
}
