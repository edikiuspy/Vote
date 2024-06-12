"use client";
import { useEffect, useState } from "react";
import EmblaCarousel from "../app/components/embla_carousel/embla_carousel";
import Game from "../app/components/game/game";

export default function Home() {
  const getGames = () => {
  return fetch('http://localhost:3000/api/game')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
};
  const [games, setGames] = useState([]);
  
  const fetchGames = () => {
    getGames()
      .then(fetchedGames => {
        setGames(fetchedGames);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const items = games.map((game) => <Game key={game.id} game={game} />);
  return (
    <main className="">
      <EmblaCarousel slides={items} options={{ loop: true }} />
    </main>
  );
}