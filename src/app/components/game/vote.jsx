"use client";

import cookieCutter from "cookie-cutter";
import { useEffect, useState } from "react";

export default function Button(id) {
  async function sendVote(gameId) {
    const res = await fetch(`http://localhost:3000/api/vote?id=${gameId}`, {
      method: "POST",
      body: JSON.stringify({ gameId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (res.status === 200) {
      setVoteSent(true);
    }
    const data = await res.json();

    return data;
  }
  useEffect(() => {
    setToken(cookieCutter.get("token"));
  }, []);
  const [token, setToken] = useState();
  const [voteSent, setVoteSent] = useState(false);

  return (
    <button
      className={`mt-8 text-xl rounded-full inline-block w-1/5 h-10 ${
        voteSent ? "bg-green-600 text-bg" : "bg-bg text-accent1"
      } ${token ? "hover:bg-accent" : "bg-black text-accent1"}  hover:text-bg`}
      onClick={() => {
        token && sendVote(id.id);
      }}
      disabled={!token}
    >
      Vote
    </button>
  );
}
