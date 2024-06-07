import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileProgress, setFileProgress] = useState(null);
  const [file_error, setfile_error] = useState(false);
  const [formdata, setformdata] = useState({});
  console.log(fileProgress);
  console.log(formdata);

  useEffect(() => {
    if (file) {
      handleFile(file);
    }
  }, [file]);
  function handleFile(file) {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageref = ref(storage, filename);
    console.log(filename);
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

  return (
    <div className="p-5 max-w-lg  mx-auto">
      <h1 className="text-center text-3xl sm:text-4xl font-semibold uppercase">
        Profile
      </h1>
      <form action="" className="flex flex-col p-3 gap-3 ">
        <input
          type="file"
          name=""
          id=""
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
            <span className={fileProgress < 50 ?"text-slate-500":"text-green-700"}>uploading...{fileProgress} %</span>
          ) : fileProgress === 100 ? (
            <span className="text-green-700 font-semibold">uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="bg-slate-200 p-2 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="usermail"
          className="bg-slate-200 p-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="password"
          id="userpass"
          className="bg-slate-200 p-2 rounded-lg"
        />
        <button className="bg-green-900 shadow-lg capitalize font-semibold cursor-pointer p-3 rounded-lg text-white hover:opacity-95 disabled:bg-slate-400">
          update
        </button>
      </form>
      <div className="flex justify-between p-3">
        <span className="text-red-500">Delete account</span>
        <span className="text-red-500">Sign out</span>
      </div>
    </div>
    // allow read;
    // allow write:if
    // request.resource.size < 2*1024*1024 &&
    // request.resource.contentType.matches('image/.*')
  );
};

export default Profile;
