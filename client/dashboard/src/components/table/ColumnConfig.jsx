import React from "react";

const renderCell = ({ row, handleEditClick, deleteRow }) => (
  <div>
    <button
      className="font-extrabold px-2"
      onClick={() => handleEditClick(row)}
    >
      edit
    </button>
    <button onClick={() => deleteRow(row.id)}>delete</button>
  </div>
);

export const columns = [
  { field: "activity", headerName: "Judul Kegiatan", width: 330 },
  { field: "project", headerName: "Nama Proyek", width: 130 },
  {
    field: "startDate",
    headerName: "Tanggal Mulai",
    width: 130,
  },
  {
    field: "endDate",
    headerName: "Tanggal Berakhir",
    width: 130,
  },
  {
    field: "startTime",
    headerName: "Waktu Mulai",
    width: 130,
  },
  {
    field: "endTime",
    headerName: "Waktu Berakhir",
    width: 130,
  },
  {
    field: "duration",
    headerName: "Durasi",
    width: 150,
  },
  {
    field: "action",
    headerName: "Aksi",
    width: 100,
    renderCell: renderCell,
    headerAlign: "center",
  },
];
