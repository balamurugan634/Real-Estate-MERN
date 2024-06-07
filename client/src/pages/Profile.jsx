import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className='p-5 max-w-lg  mx-auto'>
      <h1 className='text-center text-3xl sm:text-4xl font-semibold uppercase'>Profile</h1>
      <form action="" className='flex flex-col p-3 gap-3 '>
      <img src={currentUser.pic} className='self-center w-24 h-24 object-cover rounded-full cursor-pointer' alt="" />
        <input type="text" placeholder='username' id='username' className='bg-slate-200 p-2 rounded-lg'/>
        <input type="email" placeholder='email'id='usermail' className='bg-slate-200 p-2 rounded-lg'/>
        <input type="text" placeholder='password' id='userpass' className='bg-slate-200 p-2 rounded-lg'/>
        <button className='bg-green-900 shadow-lg capitalize font-semibold cursor-pointer p-3 rounded-lg text-white hover:opacity-95 disabled:bg-slate-400' >update</button>
      </form>
      <div className='flex justify-between p-3'>
        <span className='text-red-500'>Delete account</span>
        <span className='text-red-500'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile
