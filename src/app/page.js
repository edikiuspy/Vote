import EmblaCarousel from '../components/embla_carousel/embla_carousel.jsx';


export default function Home() {
  return (
    <main className="">
      <EmblaCarousel slides={Array.from(Array(5).keys())} options={{ loop: true }} />
    </main>
  );
}
