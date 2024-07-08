import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Listitem from "../components/Listitem";

const Search = () => {
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const[listing,setListing]=useState([])
    const [showmore,setShowmore]=useState(false)
    console.log(listing)
  const [searchval, setSearchval] = useState({
    searchkey: "",
    type: "all",
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });
  function handleChange(e) {
    if(e.target.id==='all' || e.target.id==='rent' || e.target.id==='sale' || e.target.id==='offers'){
        setSearchval({
            ...searchval,type:e.target.id
        })
    }
    if(e.target.id==='furnished' || e.target.id==='parking'){
        setSearchval({
            ...searchval,[e.target.id]:e.target.checked === true || e.target.checked ==='true' ? true :false
        })
    }
    if(e.target.id==='searchkey'){
        setSearchval({
            ...searchval,
            [e.target.id]:e.target.value
        })
    }
    if(e.target.id==='sort_order'){
        const sort=e.target.value.split('_')[0] || 'createdAt'
        const order=e.target.value.split('_')[1] || 'desc'

        setSearchval({
            ...searchval,
            sort,order
        })
    }
  }
  function handleSubmit(e){
    e.preventDefault()
    const urlparams=new URLSearchParams()
    urlparams.set('searchkey',searchval.searchkey)
    urlparams.set('furnished',searchval.furnished)
    urlparams.set('parking',searchval.parking)
    urlparams.set('type',searchval.type)
    urlparams.set('sort',searchval.sort)
    urlparams.set('order',searchval.order)
    const searchquery=urlparams.toString()
    navigate(`/search?${searchquery}`)
  }
  useEffect(()=>{
   
        const urlparams=new URLSearchParams(location.search)
        const searchfromurl=urlparams.get('searchkey')
        const sortfromurl=urlparams.get('sort')
        const orderfromurl=urlparams.get('order')
        const furnishedfromurl=urlparams.get('furnished')
        const parkingfromurl=urlparams.get('parking')
        const typefromurl=urlparams.get('type')
        const offerfromurl=urlparams.get('offers')
        if(
            searchfromurl ||
            orderfromurl ||
            sortfromurl ||
            offerfromurl  ||
            furnishedfromurl ||
            parkingfromurl ||
            typefromurl 
        ){
            setSearchval({
                searchkey:searchfromurl || '',
                offers:offerfromurl==='false' ?false :true,
                order:orderfromurl || 'desc',
                sort:sortfromurl || 'createdAt',
                furnished:furnishedfromurl ==='false' ?false :true,
                parking:parkingfromurl==='false' ?false :true,
                type:typefromurl || 'all'
            })
        }

        const fetchlisting=async()=>{
            setLoading(true)
            const searchquery=urlparams.toString()
            console.log(searchquery)

            const res=await fetch(`/api/user/get?${searchquery}`)

            const data=await res.json()
            console.log(data.length)
            if(data.length > 6 ){setShowmore(true)}
            setListing(data)
            setLoading(false)
        }
        fetchlisting()
    }
   
  ,[location.search])
//   console.log(searchval)
// if(listing.length >8){
//   setShowmore(true)
// }
async function  handleShowmore(){
  const numberoflisting=listing.length
  const params=new URLSearchParams(location.search)
  const startindex=numberoflisting
  params.set('startindex',startindex)
  const searchquery=params.toString()
  const res=await fetch(`/api/user/get?${searchquery}`)
  const data=await res.json()
  if(data.length <9){
    setShowmore(false)
  }else{
    setShowmore(true)
  }
  setListing([...listing,...data])
}
  return (
    <main className="flex flex-col md:flex-row">
      <div className="flex flex-col gap-5 p-5 border-b-2 md:border-r-2  md:min-h-screen">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 items-center">
            <label htmlFor="search" className="font-semibold">
              Search
            </label>
            <input
              type="text"
              id="searchkey"
              placeholder="type here..."
              className="bg-slate-100 w-full p-3 rounded-lg outline-none"
              value={searchval.searchkey}
              onChange={handleChange}
            />
          </div>
          <div className="flex mt-3 flex-wrap items-center gap-3">
            <label htmlFor="type" className="font-semibold">
              Type :
            </label>
            <div className="flex  gap-2">
              <input type="checkbox" className="w-4" name="" id="all" checked={searchval.type==='all'} onChange={handleChange}/>
              <span>Rent & sale</span>
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" checked={searchval.type==='rent'} onChange={handleChange} className="w-4" name="" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" className="w-4" checked={searchval.type==='sale'} onChange={handleChange} name="" id="sale" />
              <span>Sale</span>
            </div>
            <div className="flex  gap-2">
              <input type="checkbox"  checked={searchval.type==='offers'} onChange={handleChange} className="w-4" name="" id="offers" />
              <span>offers</span>
            </div>
          </div>
          <div className="flex mt-3 flex-wrap items-center gap-3">
            <label htmlFor="type" className="font-semibold">
              Amenaties :
            </label>
            <div className="flex  gap-2">
              <input type="checkbox" className="w-4" name="" checked={searchval.furnished} onChange={handleChange} id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" className="w-4" checked={searchval.parking} onChange={handleChange} name="" id="parking" />
              <span>Parking</span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <label htmlFor="sort_order" className="font-semibold">
              Sort :
            </label>
            <select
              name=""
              className="w-30 outline-none rounded-lg p-2 "
              id="sort_order"
              onChange={handleChange}
              defaultValue={'createdAt_desc'}
            >
              <option value="createdAt_asc">Latest</option>
              <option value="regularprice_asc">Price low to high</option>
              <option value="regularprice_desc">Price high to low</option>
              <option value="createdAt_desc">Oldest</option>
            </select>
          </div>
          <button className="rounded-lg p-3 hover:opacity-95 bg-blue-400 w-full mt-3 font-semibold text-white">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="font-semibold text-3xl border-b-2 uppercase p-3 w-full mt-2">
          Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
            {!loading && listing.length===0 &&  (<p className="text-2xl font-semibold text-center w-full">no listing found</p>)}
            {loading &&  (<p className="text-2xl font-semibold text-center w-full">loading...</p>)}
            {listing.length > 0 && listing.map((list)=><Listitem key={list._id} listing={list}/>)}

        </div>
{showmore &&        <button className=" text-green-700 w-full text-center hover:underline" onClick={()=>handleShowmore()}>show more</button>
}      </div>
    </main>
  );
};

export default Search;
