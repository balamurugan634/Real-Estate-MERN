import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
const Listing = () => {
  SwiperCore.use([Navigation])
  const [listing, setlisting] = useState(null);
  const params = useParams();
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const initialfetch = async () => {
      const fetchid = params.id;
      try {
        setloading(true)
        const res = await fetch(`/api/user/getlist/${fetchid}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          seterror(data.message)
          setloading(false)
          return
        }
        setlisting(data);
        setloading(false)
        seterror(false)
        console.log(data);
        // console.log(listing)
      } catch (error) {
        seterror(true);
        setloading(false)
      }
    };
    initialfetch();
  }, [params.id]);

  return <main>
    {/* <p>{listing.name}</p> */}
    {loading && <p className="text-center text-2xl font-semibold">Please wait Loading...</p>}
    {error && <p className="text-center text-2xl font-semibold text-red-700">error occured</p>}
    {!loading && !error && listing && <>
    <Swiper navigation>
        {listing.imageUrl.map((url)=>(
                    <SwiperSlide key={url}>
                        <div className="h-[550px]" style={{background:`url(${url}) center no-repeat`,backgroundSize:'cover'}}></div>
                    </SwiperSlide>
        ))}
    </Swiper>
    </>
    }
  </main>;
};

export default Listing;
