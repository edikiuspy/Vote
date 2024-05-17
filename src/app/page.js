
import EmblaCarousel from "../app/components/embla_carousel/embla_carousel";
import Game from "../app/components/game/game";
async function getGames() {
  const res = await fetch(`http://localhost:3000/api/game`);
  const data = await res.json();
  return data;
}

export default async function Home() {
  const games = await getGames();
  console.log(games)

  return (
    <main className="">
      <div>
      {games.map(game => <Game key={game.id} game={game} />)}
      </div>
      <EmblaCarousel
        slides={games.map(game => <Game key={game.id} game={game} />)}
        options={{ loop: true }}
      />
    </main>
  );
}
