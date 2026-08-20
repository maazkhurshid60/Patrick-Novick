import Navbar from "../components/Navbar";
import FindTheRightPeople from "../components/FindTheRightPeople";
import Footer from "../components/Footer";

export const metadata = {
  title: "Find the Right People — Patrick Novick",
  description:
    "A $185K seat posted for 60 days is still empty. The superintendent you really want isn't on a job board — here's why a real recruiting network reaches people a posting never will.",
};

export default function FindTheRightPeoplePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <FindTheRightPeople />
      </main>
      <Footer />
    </>
  );
}
