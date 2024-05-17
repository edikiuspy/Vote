import Button from "./vote.jsx";
const Game = (game) => {
  return (
    <div>
      <p>{game.game.name}</p>
      <p>{game.game.description}</p>
      <p>{game.game.votes}</p>
      <Button />
    </div>
  );
};
export default Game;
