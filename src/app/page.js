
import EmblaCarousel from "../app/components/embla_carousel/embla_carousel";
import Game from "../app/components/game/game";

async function getGames() {
  const res = await fetch(`http://localhost:3000/api/game`);
  const data = await res.json();
  return data;
}

export default async function Home() {
  const games = await getGames();

  const items = games.map((game) => <Game key={game.id} game={game} />)

  return (
    <main className="">
        {items}
      <EmblaCarousel
        slides= {items}
        options={{ loop: true }}
      /> 
    </main>
  );
}
