"use client";


async function sendVote(gameId) {
    const res = await fetch(`http://localhost:3000/api/vote?id=${gameId}`, {
        method: "POST",
        body: JSON.stringify({ gameId }),
        headers: {
            "Content-Type": "application/json",
            "Authorization":localStorage.getItem("token") || "",
        },
    });
    const data = await res.json();
    return data;
}
export default function Button(id) {
    return (
        <button className="button" onClick={()=>{sendVote(id.id)}}>Vote</button>
    );
}