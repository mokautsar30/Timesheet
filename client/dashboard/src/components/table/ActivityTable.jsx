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
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { transformData } from "../../helpers/dataTransform";
import { columns } from "../table/ColumnConfig";
import Swal from "sweetalert2";

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
    const transformedData = transformData(
      activities,
      projects,
      searchText,
      projectFilter
    );
    setFilteredRows(transformedData);
  }, [searchText, projectFilter, activities, projects, deleteActivity]);

  const deleteRow = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteActivity(id);
          setFilteredRows(filteredRows.filter((row) => row.id !== id));
          Swal.fire("Deleted!", "Your activity has been deleted.", "success");
        } catch (error) {
          console.error(`Error deleting activity with ID ${id}:`, error);
          Swal.fire(
            "Error!",
            "There was an error deleting your activity.",
            "error"
          );
        }
      }
    });
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

  const displayColumns = [
    { field: "displayId", headerName: "ID", width: 90 },
    ...columns.map((column) => ({
      ...column,
      renderCell: (params) => {
        if (column.field === "action") {
          return (
            <div className="justify-center items-center text-center">
              <button
                className="font-extrabold px-2 text-green-600"
                onClick={() => handleEditClick(params.row)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-600 font-extrabold px-2"
                onClick={() => deleteRow(params.row.id)}
              >
                <MdDelete />
              </button>
            </div>
          );
        }
        return <div>{params.value}</div>;
      },
    })),
  ];

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
        columns={displayColumns}
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
