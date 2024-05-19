"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CompanyLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  const handleRegisterClick = () => {
    router.push(`/api/account?email=${email}&password=${password}`); 
  };

  return (
    <div className="w-full h-full">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center h-full">
        <div className=" rounded-2xl bg-accent2 shadow-2xl flex flex-row w-2/3 max-w-4xl ">
          <div className="w-3/5 p-5">
            <h2 className="text-3xl font-bold mb-2 text-accent py-3 my-10">Welcome back!</h2>
            <div className="border-2 border-bg mb-4 w-12 inline-block"></div>
            <form action="#" className="flex py-13 flex-col items-center">
              <input type="email" placeholder="Email" className="w-3/4 bg-bg text-accent1 py-2 px-4 rounded-full mb-4 outline-none max-w-xl" />
              <input type="password" placeholder="Password" className="w-3/4 bg-bg text-accent1  py-2 px-4 rounded-full mb-4 outline-none" />
              <a href="#" className="text-accent1 text-sm mb-4">Forgot your password?</a>
              <button className="bg-bg text-accent1 py-2 px-4 rounded-full inline-block font-semibold hover:bg-accent hover:text-bg">Login</button>
            </form>
          </div>

          <div className="w-2/5 rounded-tr-2xl rounded-br-2xl bg-accent1 text-bg py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">New here?</h2>
            <div className="border-2 border-bg mb-4 w-12 inline-block"></div>
            <p className="text-lg text-bg">Want to add your company alongside with your game to take part in the voting? </p>
            <button className="mt-8 bg-bg text-accent1 py-2 px-4 rounded-full inline-block font-semibold hover:bg-accent hover:text-bg" onClick={handleRegisterClick}>
              Register
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyLogin;
