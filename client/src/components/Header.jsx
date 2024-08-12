import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";

function Header() {
  return (
    <nav
      className="h-20 sm:h-14 flex flex-col items-center text-center content-center sm:flex-row sm:text-left
   sm:justify-between py-2 px-12 bg-white shadow sm:items-baseline w-full"
    >
      <div className=" flex flex-row items-center">
        <div className="h-10 w-10 self-center mr-2">
          <img className="h-10 w-10 self-center" src={logo} />
        </div>
        <Link
          to="/"
          className="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold"
        >
          LogoText
        </Link>
      </div>

      <div className="sm:mb-0 self-center">
        <Link
          to="/"
          className="text-md font-semibold no-underline text-black hover:text-blue-dark ml-2 px-1"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="text-md font-semibold no-underline text-black hover:text-blue-dark ml-2 px-1"
        >
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default Header;
