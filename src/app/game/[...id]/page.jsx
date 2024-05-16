async function getGame(gameId) {
  const res = await fetch(`http://localhost:3000/api/game?id=${gameId}`);
  const data = await res.json();
  return data;
}
export default async function gamePage({ params }) {
  const game = await getGame(params.id);
  return (
    <p>
      {game.name}
    </p>
  );
}
