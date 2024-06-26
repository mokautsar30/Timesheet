import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ColorTabs from "../../components/topTabs/ColorTabs";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col">
        <h1 className=" text-3xl text-black font-bold px-4 py-4 font-nunito">
          HH Timesheet
        </h1>
      </div>
      <div className=" py-2 px-4 min-w-full bg-slate-100 min-h-screen">
        <ColorTabs />
      </div>
    </>
  );
};

export default Homepage;
