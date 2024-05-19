"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddGame = () => {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push('/register'); 
  };

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  
  function handleAddGameClick() {
    fetch(`http://localhost:3000/api/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, genre, description }),
    });
  };

  function handleFileDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const formData = new FormData();
    formData.append("file", file);
    fetch(`http://localhost:3000/api/games`, {
      method: "POST",
      body: formData,
    });
  }

  return (
    <div className="w-full h-full">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center h-full">
        <div className="rounded-2xl justify-center bg-accent2 shadow-2xl flex flex-row w-2/3 max-w-4xl">
          <div className="w-3/5 py-20 p-5">
            <h2 className="text-3xl font-bold mb-2 text-accent py-3 my-10">Add a New Game</h2>
            <div className="border-2 border-bg mb-4 w-12 inline-block"></div>
            <form className="flex py-13 flex-col items-center">
              <input 
                type="text" 
                placeholder="Game Title" 
                className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none max-w-xl" 
                onChange={e => setTitle(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Genre" 
                className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none" 
                onChange={e => setGenre(e.target.value)} 
              />
              <input
                type="text"
                placeholder="release date"
                className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none"
                onChange={e => setDescription(e.target.value)}
              />
              <textarea 
                placeholder="Description" 
                className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none" 
                onChange={e => setDescription(e.target.value)} 
              />

              <div
                className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none border-dashed border-2 border-accent1"
                onDragOver={e => e.preventDefault()}
                onDrop={handleFileDrop}
              >
                Drag and drop files here
              </div>

              <button 
                type="button" 
                className="bg-bg text-accent1 py-2 px-4 rounded-full inline-block font-semibold hover:bg-accent hover:text-bg" 
                onClick={handleAddGameClick}
              >
                Add Game
              </button>
              
              

              
            </form>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AddGame;
