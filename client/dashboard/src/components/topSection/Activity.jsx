import React from "react";
import DataTable from "../table/ActivityTable";

const Activity = () => {
  return (
    <>
      <div className="py-2 px-4 min-w-full min-h-screen bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center gap-5 mb-50">
          <h1 className=" font-nunito font-bold text-sm">Daftar Kegiatan</h1>
          <button className=" font-nunito font-bold bg-blue-300 rounded-lg py-1 px-1 text-sm">
            Tambah Kegiatan
          </button>
        </div>
        <DataTable />
        <div className=" flex flex-row justify-between px-4">
          <h2 className=" font-nunito text-blue-400 font-medium">Total Durasi</h2>
          <h2>8 jam 10 menit</h2>
        </div>
        <div className=" flex flex-row justify-between px-4">
          <h2 className=" font-nunito font-extrabold text-blue-400 text-xl">Total Pendapatan</h2>
          <h2>Rp.1.500.000</h2>
        </div>
      </div>
    </>
  );
};

export default Activity;
