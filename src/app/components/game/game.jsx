const Game = (game) => {
  return (
    <div>
      <p>{game.game.name}</p>
      <p>{game.game.description}</p>
    </div>
  );
};
export default Game;
