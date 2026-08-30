import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Dishes } from "@/components/site/Dishes";
import { MenuPreview } from "@/components/site/MenuPreview";
import { Story } from "@/components/site/Story";
import { VideoSection } from "@/components/site/VideoSection";
import { Reservation } from "@/components/site/Reservation";
import { Footer } from "@/components/site/Footer";

const title = "Brasa · Cocina urbana a fuego vivo en Madrid";
const description =
  "Brasa es cocina urbana de fuego vivo en Madrid: platos con carácter, producto de mercado y reservas online. Saborea la revolución.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-ink">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Dishes />
        <MenuPreview />
        <Story />
        <VideoSection />
        <Reservation />
      </main>
      <Footer />
    </div>
  );
}
