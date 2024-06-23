import React, { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate, useParams} from 'react-router-dom'
// import { set } from "mongoose";
import { useSelector } from "react-redux";
const Createlist = () => {
  const navigate=useNavigate()
  const { currentUser } = useSelector((state) => state.user);
  const [files, Setfiles] = useState([]);
  console.log(files);
  const [formdata, setformdata] = useState({
    imageUrl: [],
    name: "",
    description: "",
    address: "",
    regularprice: 4,
    discountprice: 3,
    bathrooms: 2,
    bedrooms: 2,
    furnished: false,
    parking: false,
    offers: true,
    type: "rent",
  });
  const [uploadprog, setuploadprog] = useState(false);
  const [uperror, setuperror] = useState(false);
  const [subload, setsubload] = useState(false);
  const [suberror, setsuberror] = useState(false);
  const params=useParams()
  // console.log(formdata);

  useEffect(()=>{
    const initialfetch =async()=>{
        const fetchid=params.id
        try{
        const res=await fetch(`/api/user/getlist/${fetchid}`)
        const data=await res.json()
        if(data.success === false){
            console.log(data.message)
        }
        setformdata(data)}
        catch(error){
            console.log(error.message)
        }

    }
    initialfetch()
  },[])
  function handleUpload(e) {
    if (files.length > 0 && files.length + formdata.imageUrl.length < 7) {
      setuploadprog(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setformdata({
            ...formdata,
            imageUrl: formdata.imageUrl.concat(urls),
          });
          setuperror(false);
          setuploadprog(false);
        })
        .catch((err) => {
          setuperror("max of 3mb");
          setuploadprog(false);
        });
    } else {
      setuperror("max 6 images only");
      setuploadprog(false);
    }
  }
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageref = ref(storage, filename);
      const uploadtask = uploadBytesResumable(storageref, file);
      uploadtask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadtask.snapshot.ref).then((downloadurl) => {
            resolve(downloadurl);
          });
        }
      );
    });
  };
  function handleDel(index) {
    setformdata({
      ...formdata,
      imageUrl: formdata.imageUrl.filter((_, i) => i !== index),
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (formdata.imageUrl.length < 1)
        return setsuberror("upload atleast 1 image ");
      if (+formdata.regularprice < +formdata.discountprice)
        return setsuberror("discount price must be less than regular prize");
      setsuberror(false);
      setsubload(true);
      const res = await fetch(`/api/user/updatelist/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formdata, userRef: currentUser._id }),
      });
      const data =await res.json();
      console.log(data);
      if (data.success === "false") {
        setsuberror(data.message);
        setsubload(false);
      }
      setsuberror(false);
      setsubload(false);
      console.log(data)
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setsuberror(error.message);
      setsubload(false);
    }
  }
  function handleChange(e) {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setformdata({ ...formdata, type: e.target.id });
    }
    if (
      e.target.id === "furnished" ||
      e.target.id === "parking" ||
      e.target.id === "offers"
    ) {
      setformdata({ ...formdata, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "text" ||
      e.target.type === "number" ||
      e.target.type === "textarea"
    ) {
      setformdata({ ...formdata, [e.target.id]: e.target.value });
    }
  }

  return (
    <main className="max-w-6xl p-2 mx-auto">
      <h1 className="text-center font-semibold text-3xl my-5 uppercase">
        Update List
      </h1>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex gap-4 flex-col sm:flex-row"
      >
        <div className="flex flex-col p-2 gap-2 flex-1">
          <input
            type="text"
            className="p-3 rounded-lg bg-slate-50"
            required
            maxLength="60"
            minLength="10"
            placeholder="name"
            id="name"
            onChange={handleChange}
            value={formdata.name}
          />
          <textarea
            className="p-3 rounded-lg bg-slate-50"
            required
            placeholder="description"
            id="description"
            onChange={handleChange}
            value={formdata.description}
          />
          <input
            type="text"
            className="p-3 rounded-lg bg-slate-50"
            required
            maxLength="120"
            minLength="10"
            placeholder="address"
            id="address"
            onChange={handleChange}
            value={formdata.address}
          />
          <div className="flex flex-wrap gap-6 p-2">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="ronded-lg border-gray-100 w-5"
                name=""
                id="sale"
                onChange={handleChange}
                checked={formdata.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="ronded-lg border-gray-100 w-5"
                name=""
                id="rent"
                onChange={handleChange}
                checked={formdata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="ronded-lg border-gray-100 w-5"
                name=""
                id="parking"
                onChange={handleChange}
                checked={formdata.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="ronded-lg border-gray-100 w-5"
                name=""
                id="furnished"
                onChange={handleChange}
                checked={formdata.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                className="ronded-lg border-gray-100 w-5"
                name=""
                id="offers"
                onChange={handleChange}
                checked={formdata.offers}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                name=""
                className="p-3 border rounded-lg border-gray-300"
                id="bedrooms"
                min="1"
                max="10"
                onChange={handleChange}
                value={formdata.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name=""
                className="p-3 rounded-lg border border-gray-300"
                id="bathrooms"
                min="1"
                max="10"
                onChange={handleChange}
                value={formdata.bathrooms}
              />
              <p>Bath</p>
            </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    required
                    name=""
                    className="p-3 rounded-lg border border-gray-300"
                    id="regularprice"
                    min="1"
                    max="10000000"
                    onChange={handleChange}
                    value={formdata.regularprice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Regular price</p>
                    <span className="text-sm">($/month)</span>
                  </div>
                </div>
                {formdata.offers && <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name=""
                    className="p-3 rounded-lg border border-gray-300"
                    id="discountprice"
                    min="1"
                    max="10000000"
                    onChange={handleChange}
                    value={formdata.discountprice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Discount price</p>
                    <span className="text-sm">($/month)</span>
                  </div>
                </div>}
              
          </div>
        </div>
        <div className="flex flex-col p-2 gap-2 flex-1">
          <p className="font-semibold">
            Images :
            <span className="font-normal text-gray-600 ">
              first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex flex-col sm:flex-row justify-between  p-3 items-center gap-4">
            <input
              type="file"
              name=""
              onChange={(e) => Setfiles(e.target.files)}
              accept="image/*"
              id="images"
              multiple
            />
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploadprog}
              className="p-3 rounded-lg  border-green-600 text-green-600 uppercase border   "
            >
              {uploadprog ? "loading..." : "upload"}
            </button>
          </div>

          <p className="text-red-600 text-center">{uperror && uperror}</p>
          {formdata.imageUrl.length > 0 &&
            formdata.imageUrl.map((url, index) => (
              // console.log(url)
              <div className="flex justify-between gap-2" key={url}>
                <img
                  src={url}
                  alt="listimg"
                  className="object-contain w-20 h-20 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleDel(index)}
                  className="text-red-700 uppercase"
                >
                  delete
                </button>
              </div>
            ))}
          <button
            type="submit"
            disabled={subload || uploadprog}
            className=" font-semibold text-white hover:opacity-95 p-3 rounded-lg uppercase bg-blue-600 disabled:bg-gray-400"
          >
            {subload ? "loading..." : "update"}
          </button>
          <p className="text-red-600 text-center">{suberror && suberror}</p>
        </div>
      </form>
    </main>
  );
};

export default Createlist;
