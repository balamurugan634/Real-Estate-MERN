import React from "react";

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center uppercase text-xl my-3 font-semibold text-gray-800 ">
        Signup
      </h1>
      <form className=" flex gap-4 flex-col ">
        <input
          type="text"
          placeholder="username"
          required
          className="bg-slate-100 p-3 rounded-lg outline-none border"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          required
          className="bg-slate-100 p-3 rounded-lg outline-none border"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          required
          className="bg-slate-100 p-3 rounded-lg outline-none border"
          id="password"
        />
        <button
          type="submit"
          className="p-3 bg-green-900 hover:opacity-95 disabled:bg-gray-400 rounded-lg text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
