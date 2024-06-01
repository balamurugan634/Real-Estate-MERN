import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-slate-200 text-sm sm:text-md shadow-md">
      <div className="flex justify-between items-center max-w-6xl p-2 sm:p-3 mx-auto flex-wrap">
        <h1>
          <span className="text-slate-900 sm:text-xl">MR </span>
          <span className="text-slate-600 sm:text-xl">Estate</span>
        </h1>
        <form className="flex p-1 sm:p-2 max-w-xs sm:max-w-lg bg-slate-300 items-center rounded ">
          <input
            type="text"
            className=" bg-transparent focus:outline-none hover:cursor-pointer"
            name=""
            id=""
            placeholder="search"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <ul className="flex gap-1 sm:gap-4 items-center">
          <Link to={"/"}>
            <li className="capitalize hidden sm:inline hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to={"/profile"}>
            <li className="capitalize hidden sm:inline hover:underline cursor-pointer">
              Profile
            </li>
          </Link>
          <Link to={"/signup"}>
            <li className="capitalize  hover:underline cursor-pointer ">
              Signin
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
