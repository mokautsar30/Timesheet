import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
      <header className="relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center">
        <h2 className=" max-w-lg font-nunito font-extrabold tracking-tight text-customRed sm:text-2xl sm:leading-snug">
          Timesheet
          <span className="inline-block text-customRed">Management</span>
        </h2>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-5 right-5 cursor-pointer lg:hidden"
          htmlFor="navbar-open"
        >
          <svg
            className="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <nav className="peer-checked:pt-2 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row">
          <div className="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0">
            <button onClick={() => {
              navigate('/login')
              localStorage.removeItem("access_token");
              localStorage.removeItem("id");
            }} className="whitespace-nowrap rounded-full bg-blue-400 px-5 py-2 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-600">
              Log Out
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
