import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="p-56">
        <form>
          <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
            <div className="mx-auto mb-2 space-y-3">
              <h1 className=" text-3xl font-bold text-gray-700">
                Log into Timesheet
              </h1>
              <p className="text-gray-500">Login to access your account</p>
            </div>
            <div>
              <div className="relative mt-2 w-full">
                <input
                  type="text"
                  id="email"
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
                  Enter Your Email
                </label>
              </div>
            </div>

            <div>
              <div className="relative mt-2 w-full">
                <input
                  type="text"
                  id="password"
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
                  {" "}
                  Enter Your Password
                </label>
              </div>
            </div>

            <button
              onClick={() => {
                navigate("/");
              }}
              className="rounded-lg bg-blue-600 py-3 font-bold text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
