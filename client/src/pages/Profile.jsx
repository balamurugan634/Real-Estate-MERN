import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  Updatefailure,
  Updatestart,
  Updatesuccess,
  DeleteUserfailure,
  DeleteUserstart,
  DeleteUsersuccess,
  SignoutUserfailure,
  SignoutUserstart,
  SignoutUsersuccess,
} from "../redux/user/userSlice.js";
import { app } from "../firebase.js";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { load, error } = useSelector((state) => state.user);

  const fileref = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileProgress, setFileProgress] = useState(null);
  const [file_error, setfile_error] = useState(false);
  const [formdata, setformdata] = useState({});
  const [updatestatus, setUpdatestatus] = useState(false);
  // console.log(load)
  const dispatch = useDispatch();
  const [shlisterror,setshlisterror]=useState(false)
  const [userlisting,setuserlisting]=useState([])
  const [showlist,setshowlist]=useState(false)
  // console.log(fileProgress);
  // console.log(formdata);
  // console.log(currentUser)

  useEffect(() => {
    if (file) {
      handleFile(file);
    }
  }, [file]);
  function handleChange(e) {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
    // console.log(formdata)
  }
  function handleFile(file) {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageref = ref(storage, filename);
    // console.log(filename);
    const uploadtask = uploadBytesResumable(storageref, file);

    uploadtask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileProgress(Math.round(progress));
      },
      (error) => {
        setfile_error(true);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) =>
          setformdata({ ...formdata, pic: downloadURL })
        );
      }
    );
  }
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      dispatch(Updatestart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(Updatefailure(data.message));
        return;
      }
      dispatch(Updatesuccess(data));
      setUpdatestatus(true);
    } catch (error) {
      dispatch(Updatefailure(error.message));
    }
  }
  async function handleDelete() {
    try {
      dispatch(DeleteUserstart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(DeleteUserfailure(data.message));
        return;
      }
      dispatch(DeleteUsersuccess(data));
    } catch (error) {
      dispatch(DeleteUserfailure(data.message));
    }
  }
  async function handleSignout() {
    try {
      dispatch(SignoutUserstart());
      const res = await fetch("/api/user/signout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(SignoutUserfailure(data.message));
        return;
      }
      dispatch(SignoutUsersuccess(data));
    } catch (error) {
      dispatch(SignoutUserfailure(data.message));
    }
  }

  async function handleShowlisting(){
    try {
      setshowlist(!showlist)
      setshlisterror(false)
      const res=await fetch(`/api/user/listing/${currentUser._id}`,{
        method:'GET'
      })
      const data=await res.json()
      if(data.success===false){
        setshlisterror(data.message)
        return
      }
      setuserlisting(data)


    } catch (error) {
      setshlisterror("error in fetching")
    }
  }

  async function handlelistdelete(listid){
    try {
      const res=await fetch(`/api/user/deletelisting/${listid}`,{
        method:'DELETE',
      })
      const data=await res.json()
      if(data.success ===false){
        console.log(data.message)
        return
      }
      setuserlisting((prev)=>userlisting.filter((listing)=>listing._id !== listid))
    } catch (error) {
      console.log(error.message)
    }

  }
  return (
    <div className="p-5 max-w-lg  mx-auto ">
      <h1 className="text-center text-3xl sm:text-4xl font-semibold uppercase">
        Profile
      </h1>
      <form onSubmit={handleUpdate} className="flex flex-col p-3 gap-3 ">
        <input
          type="file"
          name=""
          id="pic"
          ref={fileref}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          accept="image/*"
        />
        <img
          src={formdata.pic || currentUser.pic}
          onClick={() => fileref.current.click()}
          className="self-center w-24 h-24 object-cover rounded-full cursor-pointer"
          alt=""
        />
        <p className="text-sm self-center">
          {file_error ? (
            <span className="text-red-500">Error in image upload</span>
          ) : fileProgress > 0 && fileProgress < 100 ? (
            <span
              className={
                fileProgress < 50 ? "text-slate-500" : "text-green-700"
              }
            >
              uploading...{fileProgress} %
            </span>
          ) : fileProgress === 100 ? (
            <span className="text-green-700 font-semibold">
              uploaded successfully
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="name"
          defaultValue={currentUser.name}
          className="bg-slate-200 p-2 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="bg-slate-200 p-2 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          defaultValue={currentUser.password}
          onChange={handleChange}
          className="bg-slate-200 p-2 rounded-lg"
        />
        <button
          disabled={load}
          className="bg-green-900 shadow-lg capitalize font-semibold cursor-pointer p-3 rounded-lg text-white hover:opacity-95 disabled:bg-slate-400"
        >
          {load ? "Loading...." : "update"}
        </button>
        <Link
          to={"/createlist"}
          className="bg-blue-600 p-3 text-center rounded-lg text-white font-semibold hover:opacity-95"
        >
          Create listing
        </Link>
      </form>
      <div className="flex justify-between p-3">
        <span
          className="text-red-500 hover:cursor-pointer"
          onClick={handleDelete}
        >
          Delete account
        </span>
        <span
          className="text-red-500 hover:cursor-pointer"
          onClick={handleSignout}
        >
          Sign out
        </span>
      </div>
      <p className="text-red-900 text-center">{error ? error : ""}</p>
      <p className="text-green-900 text-center">
        {updatestatus ? "user updated successfully" : ""}
      </p>
      <button type="button" className="text-green-800 text-center mx-auto flex" onClick={handleShowlisting}>Show listings </button>
      {showlist && userlisting.length >0 && userlisting.map((list)=>
        <div className="flex justify-between items-center gap-3 my-2" key={list._id}>
          <Link to={`/listing/${list._id}`}><img src={list.imageUrl[0]} className='w-20 h-20 object-contain' alt="listimage" srcset="" /></Link>
          <p className="font-semibold">{list.name}</p>
          <div className="flex flex-col">
              <button type="button" onClick={()=>handlelistdelete(list._id)} className="text-red-700">DELETE</button>
              <Link to={`/updatelist/${list._id}`} className="text-green-700">EDIT</Link>

          </div>
        </div>
      ) }
      {/* <p>{DeleteUserfailure  ? 'user updated successfully' :''}</p> */}
    </div>
    // allow read;
    // allow write:if
    // request.resource.size < 2*1024*1024 &&
    // request.resource.contentType.matches('image/.*')
  );
};

export default Profile;
