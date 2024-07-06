import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setlandlord] = useState(null);
  console.log(listing.userRef);
  const [message, setMessage] = useState("");
  // console.log(landlord.name)
  useEffect(() => {
    const getlandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setlandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    getlandlord();
  }, [listing.userRef]);

  return (
    <div className="flex flex-col gap-5">
      {landlord && (
        <p>
          {" "}
          contact{" "}
          <span className="font-semibold">
            {landlord.name.toUpperCase()}
          </span>{" "}
          for {listing.name.toLowerCase()}
        </p>
      )}
      <textarea
        name="message"
        id="message"
        value={message}
        rows="2"
        onChange={(e) => setMessage(e.target.value)}
        className="w-full outline-none border border-slate-2"
        placeholder="enter your message ...."
      ></textarea>
      {message.length !== 0 && (
        <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className="rounded-lg p-3 text-white bg-green-700 text-center font-semibold text-[15px] uppercase hover:opacity-95">
          send
        </Link>
      )}{" "}
    </div>
  );
};

export default Contact;
