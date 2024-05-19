import Button from "./vote.jsx";
const Game = (game) => {
    console.log(game.game.id)
  return (
    <div>
      <p>{game.game.name}</p>
      <p>{game.game.description}</p>
      <p>{game.game.type}</p>
      <p>{game.game.release_date}</p>
      <img src={game.game.image} alt={game.game.name+' image'} />
      <p>{game.game.votes}</p>
      <Button id={game.game.id} />
    </div>
  );
};
export default Game;
