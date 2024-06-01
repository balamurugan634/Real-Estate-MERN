import React from "react";
import { FaSearch } from "react-icons/fa";
const Header = () => {
  return (
    <header className="bg-slate-200 text-sm sm:text-md shadow-md">
      <div className="flex justify-between items-center max-w-6xl p-3 mx-auto flex-wrap">
        <h1>
          <span className="text-slate-900 sm:text-xl">MR </span>
          <span className="text-slate-600 sm:text-xl">Estate</span>
        </h1>
        <form className="flex p-2 bg-slate-300 items-center rounded ">
          <input
            type="text"
            className=" bg-transparent focus:outline-none hover:cursor-pointer"
            name=""
            id=""
            placeholder="search"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <ul className="flex gap-4 items-center">
          <li className="capitalize hidden sm:inline hover:underline cursor-pointer">Home</li>
          <li className="capitalize hidden sm:inline hover:underline cursor-pointer">Profile</li>
          <li className="capitalize  hover:underline cursor-pointer"> Signin</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
