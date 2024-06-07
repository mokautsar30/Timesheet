import React, { useState } from "react";
import DataTable from "../table/ActivityTable";
import { FaPlusCircle } from "react-icons/fa";
import CreateActivity from "../table/CreateActivity";

const Activity = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="py-2 px-4 min-w-full min-h-screen bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center gap-5 mb-50">
          <h1 className=" font-nunito font-bold text-sm">Daftar Kegiatan</h1>
          <button
            className=" flex justify-center items-center font-nunito font-bold bg-blue-100 rounded-lg py-2 px-2 text-sm text-blue-500"
            onClick={handleOpen}
          >
            <FaPlusCircle />
            Tambah Kegiatan
          </button>
        </div>
        <DataTable />
        <div className=" flex flex-row justify-between px-4">
          <h2 className=" font-nunito text-blue-400 font-medium">
            Total Durasi
          </h2>
          <h2>8 jam 10 menit</h2>
        </div>
        <div className=" flex flex-row justify-between px-4">
          <h2 className=" font-nunito font-extrabold text-blue-400 text-xl">
            Total Pendapatan
          </h2>
          <h2>Rp.1.500.000</h2>
        </div>
      </div>
      {open && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={handleClose}>
              &times;
            </span>
            <h2 className="text-xl font-bold mb-4">Tambah Kegiatan</h2>
            <CreateActivity />
          </div>
        </div>
      )}
    </>
  );
};

export default Activity;
