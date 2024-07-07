import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";
const Listing = () => {
  const [copied, setcopied] = useState(false);
  SwiperCore.use([Navigation]);
  const [listing, setlisting] = useState(null);
  const params = useParams();
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  const [contact,setContact]=useState(false)
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const initialfetch = async () => {
      const fetchid = params.id;
      try {
        setloading(true);
        const res = await fetch(`/api/user/getlist/${fetchid}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          seterror(data.message);
          setloading(false);
          return;
        }
        setlisting(data);
        setloading(false);
        seterror(false);
        console.log(data);
        // console.log(listing)
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };
    initialfetch();
  }, [params.id]);

  return (
    <main>
      {/* <p>{listing.name}</p> */}
      {loading && (
        <p className="text-center text-2xl font-semibold">
          Please wait Loading...
        </p>
      )}
      {error && (
        <p className="text-center text-2xl font-semibold text-red-700">
          error occured
        </p>
      )}
      {!loading && !error && listing && (
        <div>
          <Swiper navigation>
            {listing.imageUrl.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full  w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointe">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setcopied(true);
                setTimeout(() => {
                  setcopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 bg-slate-100 p-2">
              Link copied !
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-3 gap-3">
            <p className="text-2xl font-semibold">
              {listing.name}- $
              {listing.offer
                ? listing.discountprice.toLocaleString("en-US")
                : listing.regularprice.toLocaleString("en-US")}
              {listing.type === "rent" && "/month"}
            </p>
            <p className="flex items-center  gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex items-center gap-4">
              <p className="bg-red-900 rounded-md w-full max-w-[200px] text-white text-center p-1">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offers && (
                <p className="bg-green-900 rounded-md w-full max-w-[200px] text-white text-center p-1">
                  ${+listing.regularprice - +listing.discountprice} discountprice
                </p>
              )}
            </div>
            <p className="text-slate-600">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="flex items-center text-green-900 font-semibold gap-4 sm:gap-6 text-sm flex-wrap">
              <li className="flex  items-center gap-2 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex  items-center gap-2 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex  items-center gap-2 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? `available` : `not available`}
              </li>
              <li className="flex  items-center gap-2 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? `furnished` : `not furnished`}
              </li>
            </ul>
            {listing.userRef !== currentUser._id && !contact && (
              <button onClick={setContact(true)} className="rounded-lg p-3 text-white bg-slate-700 font-semibold hover:opacity-95">
                {" "}
                contact landlord
              </button>
            )}
            {contact && <Contact listing={listing}/>}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
