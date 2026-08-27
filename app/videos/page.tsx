import Navbar from "../components/Navbar";
import Videos, { type TikTokVideo } from "../components/Videos";
import Footer from "../components/Footer";

export const metadata = { title: "Videos — Patrick Novick" };

/* TikTok job-ad clips (@patricknovick225) — add new video IDs here as
   Patrick shares more. */
const VIDEO_IDS = [
  "7678660383099407647",
  "7678658540050943263",
  "7678040762646318367",
];

/* TikTok's oEmbed thumbnail URLs are CDN-signed and expire after a few days,
   so they're fetched fresh here (server-side, revalidated hourly) rather
   than hardcoded — a build-time snapshot would go stale and break. A failed
   fetch (video removed/private/rate-limited) just means that card falls
   back to a plain placeholder instead of breaking the page. */
async function getTikTokMeta(id: string): Promise<{ thumbnailUrl: string | null; title: string | null }> {
  const videoUrl = `https://www.tiktok.com/@patricknovick225/video/${id}`;
  try {
    const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { thumbnailUrl: null, title: null };
    const data = (await res.json()) as { thumbnail_url?: string; title?: string };
    return { thumbnailUrl: data.thumbnail_url ?? null, title: data.title ?? null };
  } catch {
    return { thumbnailUrl: null, title: null };
  }
}

export default async function VideosPage() {
  const videos: TikTokVideo[] = await Promise.all(
    VIDEO_IDS.map(async (id) => {
      const meta = await getTikTokMeta(id);
      return { id, url: `https://www.tiktok.com/@patricknovick225/video/${id}`, ...meta };
    }),
  );

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Videos videos={videos} />
      </main>
      <Footer />
    </>
  );
}
