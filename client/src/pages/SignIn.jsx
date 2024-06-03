import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [logdata,setLogdata]=useState({})
  const [load,setLoad]=useState(false)
  const [error,setError]=useState(null)
  const navigate=useNavigate()
  function handleChange(e){
    setLogdata({...logdata,
      [e.target.id]:e.target.value
    })
    console.log(logdata)
  }
async function handleSubmit(e){
    e.preventDefault()
    try{
      setLoad(true)
      const res=await fetch("/api/auth/signin",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(logdata)
        
      })
      const data=await res.json()
      console.log(data)
      if(data.success===false){
        setError(data.message)
        setLoad(false)
        return
      }
      setLoad(false)
      setError(null)
      navigate('/')
    }
    catch{(err)=>{
      // console.log(err)
      setLoad(false)
      setError(err.message)
    }

    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center uppercase text-xl my-3 font-semibold text-gray-800 ">
        Signin
      </h1>
      <form className=" flex gap-4 flex-col " onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          required
          className="bg-slate-100 p-3 rounded-lg outline-none border"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          required
          className="bg-slate-100 p-3 rounded-lg outline-none border"
          id="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="p-3 bg-green-900 hover:opacity-95 disabled:bg-gray-400 rounded-lg text-white"
          disabled={load}
        >
          {load ? "Loading.." : "login"}
          
        </button>
      </form>
      <p className="my-4">
        Don't have an account ?
        <Link className="text-blue-400 hover:cursor-pointer" to={"/signup"}>
          signup
        </Link>
      </p>
      {error && <p>{error}</p>}
    </div>
  )
}

export default SignIn
