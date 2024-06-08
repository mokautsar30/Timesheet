import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { IoFilter } from "react-icons/io5";
import { getProjects, deleteActivity } from "../../services/api";
import EditActivity from "./EditActivity";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
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
    width: 130,
  },
  {
    field: "action",
    headerName: "Aksi",
    width: 200,
    renderCell: ({ row }) => (
      <div>
        <button
          className="font-extrabold px-2"
          onClick={() => handleEditClick(row)}
        >
          Edit
        </button>
        <button onClick={() => deleteRow(row.id)}>Delete</button>
      </div>
    ),
    headerAlign: "center",
  },
];

const initialRows = [
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
];

export default function DataTable({ activities }) {
  const [searchText, setSearchText] = React.useState("");
  const [projectFilter, setProjectFilter] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState(initialRows);
  const [projects, setProjects] = React.useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [currentActivity, setCurrentActivity] = React.useState(null);
  const handleClose = () => setIsEditModalOpen(false);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjects();
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  React.useEffect(() => {
    const projectMap = projects.reduce((map, project) => {
      map[project.id] = project.projectName;
      return map;
    }, {});

    const updatedRows = activities.map((activity) => ({
      id: activity.id,
      activity: activity.activityName || "",
      project: projectMap[activity.projectId] || "",
      startDate: new Date(activity.dateStart).toLocaleDateString(),
      endDate: new Date(activity.dateEnd).toLocaleDateString(),
      startTime: activity.timeStart,
      endTime: activity.timeEnd,
      duration: (
        (new Date(`${activity.dateEnd}T${activity.timeEnd}`) -
          new Date(`${activity.dateStart}T${activity.timeStart}`)) /
        (1000 * 60 * 60)
      ).toFixed(2),
    }));

    setFilteredRows(
      updatedRows.filter(
        (row) =>
          (row.activity.toLowerCase().includes(searchText.toLowerCase()) ||
            row.project.toLowerCase().includes(searchText.toLowerCase())) &&
          (projectFilter === "" || row.project === projectFilter)
      )
    );
  }, [searchText, projectFilter, activities, projects, deleteActivity]);

  const deleteRow = async (id) => {
    try {
      await deleteActivity(id);
      setFilteredRows(filteredRows.filter((row) => row.id !== id));
      console.log(`Activity with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting activity with ID ${id}:`, error);
    }
  };

  const handleEditClick = (activity) => {
    console.log("Edit button clicked");
    const formattedStartDate = new Date(activity.startDate)
      .toISOString()
      .split("T")[0];
    const formattedEndDate = new Date(activity.endDate)
      .toISOString()
      .split("T")[0];

    setCurrentActivity({
      ...activity,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setCurrentActivity(null);
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
          style={{ width: 400 }}
        />
        <FormControl variant="outlined">
          <InputLabel>
            <IoFilter />
          </InputLabel>
          <Select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            label="Filter by Project"
          >
            <MenuItem value="">All</MenuItem>
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.projectName}>
                {project.projectName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <DataGrid
        rows={filteredRows}
        columns={columns.map((column) => ({
          ...column,
          renderCell: (params) => {
            if (column.field === "action") {
              return (
                <div>
                  <button
                    className="font-extrabold px-2"
                    onClick={() => handleEditClick(params.row)}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteRow(params.row.id)}>
                    Delete
                  </button>
                </div>
              );
            }
            return <div>{params.value}</div>;
          },
        }))}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        pageSize={10}
        disableCheckboxSelection
        disableRowSelectionOnClick
        disableColumnSelector
        disableColumnResize
        disableColumnReorder
      />
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={handleClose}>
              &times;
            </span>
            <h2 className="text-xl font-bold mb-4">Edit Kegiatan</h2>
            <EditActivity activity={currentActivity} onClose={handleClose} />
          </div>
        </div>
      )}
    </div>
  );
}
