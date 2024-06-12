"use client";

import { useRouter } from "next/navigation";
import cookieCutter from "cookie-cutter";
import { useEffect, useState } from "react";
const Navbar = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleCompanyRegisterClick = () => {
    router.push("/company_register");
  };

  const handleCompanyLoginClick = () => {
    router.push("/company_login");
  };
  const handleLogoutClick = () => {
    cookieCutter.set("token", "");
    location.reload();
    };
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(cookieCutter.get("token"));

  }, []);
  return (
    <nav className="flex flex-row bg-accent2 rounded-br-full rounded-bl-full justify-center gap-8 py-3 ">
      {!token && (
        <>
          <button
            className="mt-8 bg-bg text-accent1 py-2 px-4 rounded-full inline-block font-semibold hover:bg-accent hover:text-bg"
            onClick={handleHomeClick}
          >
            Home
          </button>
          <button
            className="mt-8 bg-bg text-accent1 py-2 px-4 rounded-full inline-block font-semibold hover:bg-accent hover:text-bg"
            onClick={handleRegisterClick}
          >
            Register
          </button>
          <button
            className="mt-8 bg-bg text-accent1 py-2 px-4 rounded-full inline-block font-semibold hover:bg-accent hover:text-bg"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className="mt-8 bg-bg text-accent1 py-2 px-4 rounded-full inline-block font-semibold hover:bg-accent hover:text-bg"
            onClick={handleCompanyRegisterClick}
          >
            Company Register
          </button>
          <button
            className="mt-8 bg-bg text-accent1 py-2 px-4 rounded-full inline-block font-semibold hover:bg-accent hover:text-bg"
            onClick={handleCompanyLoginClick}
          >
            Company Login
          </button>
        </>
      )}
      {token && (
        <>
          <button
            className="mt-8 bg-bg text-accent1 py-2 px-4 rounded-full inline-block font-semibold hover:bg-accent hover:text-bg"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
};
export default Navbar;
