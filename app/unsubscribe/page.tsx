import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UnsubscribeForm from "./UnsubscribeForm";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Unsubscribe — Patrick Novick",
  description: "Unsubscribe from Patrick Novick's email campaigns and newsletters.",
};

export default function UnsubscribePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-gray-50/50">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 max-w-md w-full mx-auto min-h-[300px]">
              <Loader2 className="w-8 h-8 text-red-500 animate-spin mb-4" />
              <p className="text-sm text-gray-500 font-medium">Loading form...</p>
            </div>
          }
        >
          <UnsubscribeForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
