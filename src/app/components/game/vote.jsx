"use client";

import cookieCutter from 'cookie-cutter'
async function sendVote(gameId) {
  const token = cookieCutter.get("token")|| "";
    const res = await fetch(`http://localhost:3000/api/vote?id=${gameId}`, {
        method: "POST",
        body: JSON.stringify({ gameId }),
        headers: {
            "Content-Type": "application/json",
            "Authorization":token,
        },
    });
    const data = await res.json();
    return data;
}
export default function Button(id) {

    return (
        <button className="mt-8 bg-bg text-xl text-accent1 rounded-full inline-block  w-1/5 h-10  hover:bg-accent hover:text-bg" onClick={()=>{sendVote(id.id)}}>Vote</button>
    );
}