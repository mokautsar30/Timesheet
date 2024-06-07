import React from "react";

const UserSetting = () => {
  return (
    <>
      <div className="p-56">
        <form>
          <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto bg-white">
            <div className="mx-auto mb-2 space-y-3">
              <h1 className=" text-3xl font-bold text-gray-700">Setting</h1>
            </div>
            <div>
              <div className="relative mt-2 w-full">
                <input
                  type="text"
                  id="name"
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
                  Nama Karyawan
                </label>
              </div>
            </div>

            <div>
              <div className="relative mt-2 w-full">
                <input
                  type="text"
                  id="rate"
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
                  {" "}
                  rate
                </label>
              </div>
            </div>
            <div className=" flex gap-x-4">
              <button className="relative flex w-56 items-center justify-center rounded-lg bg-gray-50 px-4 py-3 font-medium text-blue-500">
                Batalkan
              </button>
              <button
                type="submit"
                className="relative flex w-56 items-center justify-center rounded-lg bg-blue-500 px-4 py-3 font-medium text-white"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserSetting;
