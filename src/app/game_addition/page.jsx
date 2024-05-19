"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
const Cookies = require("cookie-cutter");

const AddGame = () => {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/register");
  };

  const [name, setTitle] = useState(""); 
  const [type, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [site, setwebSite] = useState("");
  const [image, setFile] = useState("");
  const [release_date, setReleaseDate] = useState("");
  const [fileEnter, setFileEnter] = useState(false);
  function handleAddGameClick() {
    const token = Cookies.get("token") || "";
    fetch(`http://localhost:3000/api/game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name, type, description, image, site,release_date }),
    });
  }

  return (
    <div className="w-full h-full">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center h-full">
        <div className="rounded-2xl justify-center bg-accent2 shadow-2xl flex flex-row w-2/3 max-w-4xl">
          <div className="w-3/5 py-20 p-5">
            <h2 className="text-3xl font-bold mb-2 text-accent py-3 my-10">
              Add a New Game
            </h2>
            <div className="border-2 border-bg mb-4 w-12 inline-block"></div>
            <form className="flex py-13 flex-col items-center">
              <input
                type="text"
                placeholder="Game Title"
                className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none max-w-xl"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Genre"
                className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none"
                onChange={(e) => setGenre(e.target.value)}
              />
              <input
                type="date"
                placeholder="release date"
                className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none"
                onChange={(e) => setReleaseDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="Website"
                className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none"
                onChange={(e) => setwebSite(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none"
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="">
                {!image ? (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setFileEnter(true);
                    }}
                    onDragLeave={(e) => {
                      setFileEnter(false);
                    }}
                    onDragEnd={(e) => {
                      e.preventDefault();
                      setFileEnter(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setFileEnter(false);
                      if (e.dataTransfer.items) {
                        [...e.dataTransfer.items].forEach((item, i) => {
                          if (item.kind === "file") {
                            const file = item.getAsFile();
                            if (file) {
                              var reader = new FileReader();
                              reader.readAsDataURL(file);
                              reader.onloadend = function () {
                                var base64data = reader.result;
                                console.log(base64data);
                                setFile(base64data);
                              };
                            }
                            console.log(
                              `items file[${i}].name = ${file?.name}`
                            );
                          }
                        });
                      } else {
                        [...e.dataTransfer.files].forEach((file, i) => {
                          console.log(`… file[${i}].name = ${file.name}`);
                        });
                      }
                    }}
                    className="w-full bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none border-dashed border-2 border-accent1"
                  >
                    <label
                      htmlFor="file"
                      className="h-full flex flex-col justify-center text-center"
                    >
                      Select or Drag and drop image here
                    </label>
                    <input
                      id="file"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        console.log(e.target.files);
                        let files = e.target.files;
                        if (files && files[0]) {
                          var reader = new FileReader();
                          reader.readAsDataURL(files[0]);
                          reader.onloadend = function () {
                            var base64data = reader.result;
                            console.log(base64data);
                            setFile(base64data);
                          };
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <object
                      className="rounded-md w-full max-w-xs h-72"
                      data={image}
                      type="image/png"
                    />
                    <button
                      onClick={() => setFile("")}
                      className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
                    >
                      Reset
                    </button>
                  </div>
                )}
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
