"use client";
import EmblaCarousel from "../app/components/embla_carousel/embla_carousel";

export default function Home() {
  return (
    <main className="">
      <EmblaCarousel
        slides={Array.from(Array(5).keys())}
        options={{ loop: true }}
      />
    </main>
  );
}
