import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const {currentUser}=useSelector((state)=>state.user)
  const [searchkey,setSearchkey]=useState('')
  const navigate=useNavigate()
  console.log(searchkey)
  function handlesubmit(e){
    e.preventDefault()
    const urlparams=new URLSearchParams(window.location.search)
    urlparams.set('searchkey',searchkey)
    const searchquery=urlparams.toString()
    navigate(`/search?${searchquery}`)
  }
  useEffect(()=>{
    const urlparams=new URLSearchParams(window.location.search)
    const searchkeyfromurl=urlparams.get('searchkey')
    if(searchkeyfromurl){
      setSearchkey(searchkeyfromurl)
    }
  },[location.search])
  return (
    <header className="bg-slate-800 text-white text-sm sm:text-md shadow-md">
      <div className="flex justify-between items-center max-w-6xl p-2 sm:p-3 mx-auto flex-wrap">
        <h1>
          <span className=" sm:text-2xl">MR </span>
          <span className="sm:text-2xl">Estate</span>
        </h1>
        <form onSubmit={handlesubmit} className="flex p-1 sm:p-2 max-w-xs sm:max-w-lg bg-slate-300 items-center rounded ">
          <input
            type="text"
            className=" text-black bg-transparent focus:outline-none hover:cursor-pointer"
            name=""
            id=""

            value={searchkey}
            onChange={(e)=>setSearchkey(e.target.value)}
            placeholder="search"
          />
          <button>
          <FaSearch className="text-slate-500" />
          </button>
        </form>
        <ul className="flex  sm:gap-4 items-center">
          <Link to={"/"}>
            <li className="capitalize hidden sm:inline hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="capitalize hidden sm:inline hover:underline cursor-pointer">
              about
            </li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? <img src={currentUser.pic} alt="profile pic" className="w-7 h-7 object-cover rounded-full" /> :<li className="capitalize  hover:underline cursor-pointer ">
              Signin
            </li>}
            
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
