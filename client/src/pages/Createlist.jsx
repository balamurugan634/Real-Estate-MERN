import React from "react";

const Createlist = () => {
  return (
    <main className="max-w-6xl p-2 mx-auto">
      <h1 className="text-center font-semibold text-3xl my-5 uppercase">
        Create List
      </h1>
      <form action="" className="flex gap-4 flex-col sm:flex-row">
        <div className="flex flex-col p-2 gap-2 flex-1">
          <input
            type="text"
            className="p-3 rounded-lg bg-slate-50"
            required
            maxLength="60"
            minLength="10"
            placeholder="name"
            id="name"
          />
          <textarea
            className="p-3 rounded-lg bg-slate-50"
            required
            placeholder="description"
            id="discription"
          />
          <input
            type="text"
            className="p-3 rounded-lg bg-slate-50"
            required
            maxLength="120"
            minLength="10"
            placeholder="address"
            id="address"
          />
          <div className="flex flex-wrap gap-6 p-2">
          <div className="flex gap-2">
            <input
              type="checkbox"
              className="ronded-lg border-gray-100 w-5"
              name=""
              id="sale"
            />
            <span>Sell</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              className="ronded-lg border-gray-100 w-5"
              name=""
              id="rent"
            />
            <span>Rent</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              className="ronded-lg border-gray-100 w-5"
              name=""
              id="parking"
            />
            <span>Parking spot</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              className="ronded-lg border-gray-100 w-5"
              name=""
              id="furnished"
            />
            <span>Furnished</span>
          </div>

          <div className="flex gap-2">
            <input
              type="checkbox"
              className="ronded-lg border-gray-100 w-5"
              name=""
              id="offer"
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
              max="10"
            />
            <div className="flex flex-col items-center">
              <p>Regular price</p>
              <span className="text-sm">($/month)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name=""
              className="p-3 rounded-lg border border-gray-300"
              id="discountprice"
              min="1"
              max="10"
            />
            <div className="flex flex-col items-center">
              <p>Discount price</p>
              <span className="text-sm">($/month)</span>
            </div>
          </div>
        </div>
        </div>
        <div className="flex flex-col p-2 gap-2 flex-1">
            <p className="font-semibold">Images : <span className="font-normal text-gray-600 "> first image will be the cover (max 6)</span></p>
            <div className="flex flex-col sm:flex-row justify-between  p-3 items-center gap-4">
                <input type="file" name=""  accept='image/*' id="images" multiple />
                <button className="p-3 rounded-lg disabled:bg-gray-300 border-green-600 text-green-600 uppercase border">upload</button>
            </div>
            <button className=" font-semibold text-white hover:opacity-95 p-3 rounded-lg uppercase bg-blue-600">create</button>

        </div>
      </form>
    </main>
  );
};

export default Createlist;
