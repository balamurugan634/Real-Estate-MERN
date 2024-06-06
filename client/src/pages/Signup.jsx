import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";

const SignUp = () => {
  const [formData, setformData] = useState({});
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const navigate = new useNavigate();
  function handleChange(e) {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoad(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoad(false);
        return;
      }
      setLoad(false);
      navigate("/signin");
    } catch {
      (err) => {
        setLoad(false);
        setError(err.message);
      };
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center uppercase text-xl my-3 font-semibold text-gray-800 ">
        Signup
      </h1>
      <form className=" flex gap-4 flex-col " onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="bg-slate-100 p-3 rounded-lg outline-none border"
          id="name"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="bg-slate-100 p-3 rounded-lg outline-none border"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="bg-slate-100 p-3 rounded-lg outline-none border"
          id="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="p-3 bg-green-900 hover:opacity-95 disabled:bg-gray-400 rounded-lg text-white"
          disabled={load}
        >
          {load ? "Loading.." : "Register"}
        </button>
        <GoogleAuth />
      </form>
      <p className="my-4">
        already have an account ?{" "}
        <Link className="text-blue-400 hover:cursor-pointer" to={"/signin"}>
          Login
        </Link>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
