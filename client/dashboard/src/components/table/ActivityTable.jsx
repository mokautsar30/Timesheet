import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "activity", headerName: "Judul Kegiatan", width: 330 },
  { field: "project", headerName: "Nama Proyek", width: 130 },
  {
    field: "startDate",
    headerName: "Tanggal mulai",
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
    width: 130,
  },
  {
    field: "action",
    headerName: "Aksi",
    type: "time",
    width: 90,
  },
];

const rows = [
  {
    id: 1,
    activity: "menghias",
    project: "ui ux",
    startDate: new Date().toLocaleDateString(),
    endDate: new Date().toLocaleDateString(),
    startTime: new Date().toLocaleTimeString(),
    endTime: new Date().toLocaleTimeString(),
    duration: 8,
  },
  {
    id: 2,
    activity: "meeting",
    project: "dev",
    startDate: new Date().toLocaleDateString(),
    endDate: new Date().toLocaleDateString(),
    startTime: new Date().toLocaleTimeString(),
    endTime: new Date().toLocaleTimeString(),
    duration: 2,
  },
  {
    id: 3,
    activity: "design",
    project: "marketing",
    startDate: new Date().toLocaleDateString(),
    endDate: new Date().toLocaleDateString(),
    startTime: new Date().toLocaleTimeString(),
    endTime: new Date().toLocaleTimeString(),
    duration: 5,
  },
  {
    id: 4,
    activity: "review",
    project: "qa",
    startDate: new Date().toLocaleDateString(),
    endDate: new Date().toLocaleDateString(),
    startTime: new Date().toLocaleTimeString(),
    endTime: new Date().toLocaleTimeString(),
    duration: 3,
  },
];

export default function DataTable() {
  const [searchText, setSearchText] = React.useState("");
  const [projectFilter, setProjectFilter] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState(rows);

  React.useEffect(() => {
    setFilteredRows(
      rows.filter(
        (row) =>
          (row.activity.toLowerCase().includes(searchText.toLowerCase()) ||
            row.project.toLowerCase().includes(searchText.toLowerCase())) &&
          (projectFilter === "" || row.project === projectFilter)
      )
    );
  }, [searchText, projectFilter]);

  const deleteRow = (id) => {
    console.log(`Deleting row with ID ${id}`);
  };

  const actionColumn = {
    field: "action",
    headerName: "Aksi",
    width: 200,
    renderCell: ({ row }) => {
      return (
        <div>
          <button className=" font-extrabold px-2" onClick={() => deleteRow(row.id)}>Edit</button>
          <button onClick={() => deleteRow(row.id)}>Delete</button>
        </div>
      );
    }
  };

  return (
    <div style={{ height: 350, width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
          gap: 8,
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <FormControl variant="outlined">
          <InputLabel>Filter by Project</InputLabel>
          <Select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            label="Filter by Project"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="ui ux">UI UX</MenuItem>
            <MenuItem value="dev">Dev</MenuItem>
            <MenuItem value="marketing">Marketing</MenuItem>
            <MenuItem value="qa">QA</MenuItem>
          </Select>
        </FormControl>
      </div>
      <DataGrid
        rows={filteredRows}
        columns={[...columns, actionColumn]}
        hideFooter
        pageSizeOptions={[5, 10]}
        disableCheckboxSelection
        disableRowSelectionOnClick
        disableColumnSelector
      />
    </div>
  );
}
