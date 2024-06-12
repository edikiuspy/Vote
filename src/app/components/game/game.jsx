import Button from "./vote.jsx";
import "./game.scss";
import { format } from "date-fns";
const Game = ( {game,fetchGames} ) => {
  console.log(typeof fetchGames);
  return (
    <div className="flex  flex-col flex-wrap gap-4 bg-accent2 rounded-lg shadow-md p-4 w-3/5">
      <div className="flex flex-col gap-1 space-y-2">
        <h2 className="text-5xl font-bold text-bg">{game.name}</h2>
        <div className="w-2/5 h-2/5 flex ">
          <img
            src={game.image}
            className="w-96 h-56 object-cover rounded-lg shadow-md flex justify-center"
            alt={game.name + " image"}
          />
        </div>
        <p className=" text-lg text-bg">
          Release date: {format(new Date(game.release_date), "dd.MM.yyyy")}
        </p>
        <p className=" text-lg text-bg">Type: {game.type}</p>
        <p className="text-xl w-f ">Description: {game.description}</p>

        <Button className=" w-2/5 py-20" id={game.id} fetchGames={fetchGames} />
        <p className=" w-2/5  text-bg text-lg">
          Votes amount: {game.votes}
        </p>
      </div>
    </div>
  );
};

export default Game;
