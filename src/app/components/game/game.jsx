import Button from "./vote.jsx";
const Game = (game) => {
  console.log(game.game.id);
  return (
    <div className="flex  flex-col flex-wrap gap-4 bg-accent2 rounded-lg shadow-md p-4 w-3/5 h-4/5">
      <div className="flex flex-col gap-1 space-y-2 align-center">
        <h2 className="text-5xl font-bold text-bg">{game.game.name}</h2>
        <img src={game.game.image} className="h-3/5 w-3/5" alt={game.game.name+"image"}/>
        <p className=" text-lg text-bg"> {game.game.release_date}</p>
        <p className=" text-lg text-bg">{game.game.type}</p>
        <p className="text-xl w-2/5 ">{game.game.description}</p>
        
        <Button className=" w-2/5 py-20" id={game.game.id} />
      <p className=" w-2/5  text-bg text-lg">Votes: {game.game.votes}</p>
      
      </div>
      
      
    </div>

  );
};

export default Game;
