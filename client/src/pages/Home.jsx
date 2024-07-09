import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import Listitem from '../components/Listitem'
const Home = () => {
  const [offerlisting,setofferlisting]=useState([])
  const [salelisting,setsalelisting]=useState([])
  const[rentlisting,setrentlisting]=useState([])
  SwiperCore.use([Navigation])
  // console.log(offerlisting)
  // console.log(salelisting)
  // console.log(rentlisting)
  useEffect(()=>{
    const fetchofferlisting=async()=>{
      try{
        const res=await fetch('/api/user/get?offer=true&limit=4')
        const data=await res.json()
        setofferlisting(data)
        fetchsalelisting()
      }
      catch(error){
        console.log(error)
      }
    }
    fetchofferlisting()
    const fetchsalelisting=async()=>{
      try {
        const res=await fetch('/api/user/get?type=sale&limit=4')
        const data=await res.json()
        setsalelisting(data)
        fetchrentlisting()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchrentlisting=async()=>{
      try {
        const res=await fetch('/api/user/get?type=rent&limit=4')
        const data=await res.json()
        setrentlisting(data)
      } catch (error) {
        console.log(error)
      }    }
  },[])
  return (
    <div className='' style={{background:'#f1f5f1'}}>
      {/* top section */}
      <div className=" flex max-w-6xl gap-6 px-3 mx-auto p-28 flex-col">
        <h1 className='text-3xl lg:text-6xl font-semibold text-slate-600'>Find your <span className='text-slate-800 '>perfect</span> <br /> place with ease ...</h1>
        <div className="">
        <p className='text-gray-600'>Estate is the best platform to live and trusted.</p>
          <Link to={'/search'} className='text-green-600 font-semibold'>Get started..</Link>
        </div>  
      </div>
      {/* swiper */}
      <Swiper navigation>
        {offerlisting &&
          offerlisting.length > 0 &&
          offerlisting.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrl[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listing */}
      <div className="max-w-7xl mx-auto p-2 flex flex-col gap-8 my-10">
        {offerlisting && offerlisting.length >0 &&
        (
            <div className="">
              <div className="">
                <h2 className='font-semibold text-2xl text-slate-800 lg:text-4xl'>Recent places with offers</h2>
                <Link to={'/search?offer=true'} className='text-sm text-gray-600 hover:underline'>show more</Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {offerlisting.map((list)=>(<Listitem listing={list} key={list._id}/>))}
              </div>
            </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10">
        {salelisting && salelisting.length >0 &&
        (
            <div className="">
              <div className="">
                <h2 className='font-semibold text-2xl lg:text-4xl text-slate-800'>Recent places for sales</h2>
                <Link to={'/search?type=sale'} className='text-sm text-gray-600 hover:underline'>show more</Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {salelisting.map((list)=>(<Listitem listing={list} key={list._id}/>))}
              </div>
            </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentlisting && rentlisting.length >0 &&
        (
            <div className="">
              <div className="">
                <h2 className='font-semibold text-2xl lg:text-4xl text-slate-800'>Recent places for rent</h2>
                <Link to={'/search?type=rent'} className='text-sm text-gray-600 hover:underline'>show more</Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {rentlisting.map((list)=>(<Listitem listing={list} key={list._id}/>))}
              </div>
            </div>
        )}
      </div>
      <footer className='w-full p-6 bg-slate-800 '>
        <p className='w-full text-center capitalize text-white'><span className='font-semibold'>&copy;</span> copyrights <span className='font-semibold'>Bala murugan L</span></p>
      </footer>
    </div>
  )
}

export default Home

