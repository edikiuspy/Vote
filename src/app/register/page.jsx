"use client";

import { useRouter } from 'next/navigation'; 
import { useState } from 'react';

const Register = () => {
  const router = useRouter(); 

  const handleLoginClick = () => {
    router.push('/login'); 
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  function handleRegisterClick() {
    fetch(`http://localhost:3000/api/company?email=${email}&password=${password}&name=${name}&surname=${surname}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <div className="w-full h-full">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center h-full">
        <div className="rounded-2xl bg-accent2 shadow-2xl flex flex-row w-2/3 max-w-4xl">
          <div className="w-2/5 rounded-tl-2xl rounded-bl-2xl bg-accent1 text-bg py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Been here before?</h2>
            <div className="border-2 border-bg mb-4 w-12 inline-block"></div>
            <p className="text-lg text-bg">Click the button below and join us back up!</p>
            <button className="mt-8 bg-bg text-accent1 py-2 px-4 rounded-full inline-block font-semibold hover:bg-accent hover:text-bg" onClick={handleLoginClick}>
              Login
            </button>
          </div>

          <div className="w-3/5 p-5">
            <h2 className="text-3xl font-bold mb-2 text-accent py-3 my-10">Sign Up</h2>
            <div className="border-2 border-bg mb-4 w-12 inline-block"></div>
            <form action="#" className="flex py-13 flex-col items-center">
              <input type="text" placeholder="Name" className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none" onChange={e=>setName(e.target.value)}/>
              <input type="text" placeholder="Surname" className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none" onChange={e=>setSurname(e.target.value)}/>
              <input type="email" placeholder="Email" className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none" onChange={e=>setEmail(e.target.value)}/>
              <input type="password" placeholder="Password" className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none" onChange={e=>setPassword(e.target.value)}/>
              <button className="bg-bg text-accent1 py-2 px-4 rounded-full inline-block font-semibold hover:bg-accent hover:text-bg" onClick={handleRegisterClick}>Register</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
